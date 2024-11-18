//graphics.js
/**
 * Data
 */
const depositList = [];
const withdraw = [];
const catGastos = {
  supermercado: "Supermercado",
  educacion: "Educación",
  entretenimiento: "Entretenimiento",
  salud: "Salud",
  servicios: "Servicios Públicos",
  energia: "Energía Eléctrica",
  internet: "Internet",
  telefonia: "Telefonía",
  agua: "Agua Potable"
};

const colorExpenses = {
  supermercado: "rgb(255, 99, 132)",
  educacion: "rgb(54, 162, 235)",
  entretenimiento: "rgb(255, 206, 86)",
  salud: "rgb(75, 192, 192)",
  servicios: "rgb(153, 102, 255)",
  energia: "rgb(255, 159, 64)",
  internet: "rgb(100, 255, 86)",
  telefonia: "rgb(255, 0, 255)",
  agua: "rgb(54, 255, 164)"
};

const catIngresos = {
  sueldo: "Sueldo",
  transferencia: "Transferencia Bancaria",
  ahorros: "Ahorros",
  otros: "Otros"
};

const colorIncomes = {
  sueldo: "rgb(243, 190, 53)",
  transferencia: "rgba(75, 192, 192)",
  ahorros: "rgb(255, 0, 255)",
  otros: "rgb(225, 132, 12)"
};

let expenseData = [];
let incomeData = [];

/**
 * Methods
 */

// Función para crear el gráfico de líneas
const createGraphic = () => {
  const ctx = document.getElementById('graphics-chart').getContext('2d');

  const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Depósitos',
          data: depositList,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Retiros',
          data: withdraw,
          borderColor: 'rgba(120, 130, 250, 1)',
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true // Asegura que el eje Y comience desde cero
        }
      },
    }
  });
}

// Función para crear gráfico de pastel para gastos
const createPieChart0 = () => {
  const ctxPie1 = document.getElementById('pie-chart-1').getContext('2d');

  const pieChart1 = new Chart(ctxPie1, {
    type: 'pie',
    data: {
      labels: Object.values(catGastos),
      datasets: [{
        label: 'Gastos',
        data: expenseData, // Se usa expenseData para las categorías de gastos
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',   // Rojo
          'rgba(54, 162, 235, 0.7)',   // Azul
          'rgba(255, 206, 86, 0.7)',   // Amarillo
          'rgba(75, 192, 192, 0.7)',   // Verde agua
          'rgba(153, 102, 255, 0.7)',  // Morado
          'rgba(255, 159, 64, 0.7)',   // Naranja
          'rgba(100, 255, 86, 0.7)',   // Verde claro
          'rgba(255, 0, 255, 0.7)',    // Fucsia
          'rgba(54, 255, 164, 0.7)'    // Verde menta
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(100, 255, 86, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(54, 255, 164, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Ocultar leyenda
        }
      }
    }
  });
}

// Función para crear gráfico de pastel para ingresos
const createPieChart1 = () => {
  const ctxPie2 = document.getElementById('pie-chart-2').getContext('2d');

  const pieChart2 = new Chart(ctxPie2, {
    type: 'pie',
    data: {
      labels: Object.values(catIngresos),
      datasets: [{
        label: 'Ingresos',
        data: incomeData, // Se usa incomeData para las categorías de ingresos
        backgroundColor: [
          'rgba(243, 190, 53, 0.7)', // Amarillo
          'rgba(75, 192, 192, 0.7)',  // Verde agua
          'rgba(255, 0, 255, 0.7)',    // Fucsia
          'rgba(225, 132, 12, 0.7)'
        ],
        borderColor: [
          'rgba(243, 190, 53, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(225, 132, 12, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Ocultar leyenda
        }
      }
    }
  });
}

/**
 * Events
 */
// Función para cargar datos reales de ingresos y gastos
function loadTransactionData() {
  const incomes = getIncomes();
  const expenses = getExpenses();

  // Set or hide empty label
  if (incomes.length === 0) {
    document.getElementById("pie-chart-2").classList.add("d-none");
  } else {
    document.getElementById("empty-pie-chart-2").classList.add("d-none");
  }

  if (expenses.length === 0) {
    document.getElementById("pie-chart-1").classList.add("d-none");
  } else {
    document.getElementById("empty-pie-chart-1").classList.add("d-none");
  }

  // Agrupa por mes para el gráfico de líneas
  const months = Array(12).fill(0);  // Inicializa 12 posiciones para los meses
  incomes.forEach(income => {
    const month = new Date(income.date).getMonth();
    months[month] += income.amount;
  });
  depositList.push(...months);  // Añade a la lista de depósitos mensual

  const expensesByMonth = Array(12).fill(0);
  expenses.forEach(expense => {
    const month = new Date(expense.date).getMonth();
    expensesByMonth[month] += expense.amount;
  });
  withdraw.push(...expensesByMonth);

  // Agrupa por categorías para los gráficos de pastel
  expenseData = Object.keys(catGastos).map(cat =>
    expenses.filter(expense => expense.category === cat)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  // Registrar nuevas categorias
  const incomeCategory = {};
  const expenseCategory = {};

  /**
   * Agrupa cantidades por categoría
   */
  incomes.forEach((income) => {
    if (!incomeCategory[income.category]) {
      // Donde la categoría no ha sido registrada
      incomeCategory[income.category] = income.amount;
    } else {
      // Agrega cantidad en categoría actual
      incomeCategory[income.category] = incomeCategory[income.category] + income.amount;
    }
  });

  expenses.forEach((income) => {
    if (!expenseCategory[income.category]) {
      // Donde la categoría no ha sido registrada
      expenseCategory[income.category] = income.amount;
    } else {
      // Agrega cantidad en categoría actual
      expenseCategory[income.category] = expenseCategory[income.category] + income.amount;
    }
  });

  /**
   * Crear estructura para chart.js
   */

  incomeData = Object.keys(catIngresos).map((categoryName) => {
    const categoryKey = Object.keys(incomeCategory).find((key) => key == categoryName);
    return {
      label: categoryKey,
      value: incomeCategory[categoryKey] ?? 0
    }
  });

  expenseData = Object.keys(catGastos).map((categoryName) => {
    const categoryKey = Object.keys(expenseCategory).find((key) => key == categoryName);
    return {
      label: categoryKey,
      value: expenseCategory[categoryKey] ?? 0
    }
  });
}

// Función para crear una lista de categorías de gastos debajo del gráfico
const createGastosList = () => {
  let gastosListContainer = document.getElementById('gastos-list');
  let listHTML = '<ul class="list-inline">';

  // Sum all category value
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  Object.keys(catGastos).forEach((cat) => {
    const categoryFounded = expenseData.find((item) => item.label == cat.toLocaleLowerCase());
    const value = categoryFounded?.value ?? 0;

    const percentage = ((value / totalExpenses) * 100);

    listHTML += `
    <li>
      <span class="mdi mdi-square-rounded me-2" style="color: ${colorExpenses[cat]}"></span>
      ${catGastos[cat]}: ${!isNaN(percentage) ? percentage.toFixed(2) : '0.00'}%
    </li>`;
  });
  listHTML += '</ul>';
  gastosListContainer.innerHTML = listHTML;
}

// Función para crear una lista de categorías de ingresos debajo del gráfico
const createIngresosList = () => {
  let ingresosListContainer = document.getElementById('ingresos-list');
  let listHTML = '<ul class="list-inline">';

  // Sum all category value
  const totalIncomes = incomeData.reduce((sum, item) => sum + item.value, 0);

  Object.keys(catIngresos).forEach((cat, index) => {
    const categoryFounded = incomeData.find((item) => item.label == cat.toLocaleLowerCase());
    const value = categoryFounded?.value ?? 0;

    const percentage = ((value / totalIncomes) * 100);


    listHTML += `
    <li>
      <span class="mdi mdi-square-rounded me-2" style="color: ${colorIncomes[cat]}"></span>
      ${catIngresos[cat]}: ${!isNaN(percentage) ? percentage.toFixed(2) : '0.00'}%
    </li>`;
  });

  listHTML += '</ul>';
  ingresosListContainer.innerHTML = listHTML;
}

// Llama a la función al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  loadTransactionData(); // Cargar datos reales
  createGraphic(); // Llama al gráfico de línea
  createPieChart0(); // Llama al primer gráfico de pastel (gastos)
  createPieChart1();  // Llama al segundo gráfico de pastel (ingresos)
  createGastosList(); // Lista de categorías de gastos
  createIngresosList(); // Lista de categorías de ingresos

  // Cargar navbar y footer
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;

      document.getElementById("graphics-navbar-button").classList.add("active");
    })
    .catch(error => console.log('Error'.error));

  fetch('footer.html')
    .then(response => response.text())
    .then(data => { document.getElementById('footer-placeholder').innerHTML = data; });
});