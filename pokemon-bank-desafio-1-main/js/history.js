//history.js
document.addEventListener("DOMContentLoaded", () => {
  const transactionList = document.getElementById("transaction-list");
  const paginator = document.getElementById("paginator");

  // Cargar footer y navbar
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;

      document.getElementById("history-navbar-button").classList.add("active");
    })
    .catch(error => console.log('Error', error));

  fetch('footer.html')
    .then(response => response.text())
    .then(data => { document.getElementById('footer-placeholder').innerHTML = data; });

  // Limpiar elementos previos
  transactionList.innerHTML = "";
  paginator.innerHTML = "";

  const transactions = getAllTransactions();
  const transactionToDraw = transactions.slice(0, 5);

  // Mostrar mensaje si no hay transacciones
  if (transactions.length === 0) {
    const labelContainer = document.createElement("div");
    labelContainer.classList.add("w-100", "py-4", "text-center", "h5", "bg-light");
    labelContainer.textContent = "No se han realizado transacciones";
    transactionList.appendChild(labelContainer);
    return;
  }

  // Dibujar las primeras 5 transacciones
  drawItems(transactionToDraw);

  // Configurar paginador si hay más de 5 transacciones
  if (transactions.length > 5) {
    const totalPages = Math.ceil(transactions.length / 5);

    for (let index = 0; index < totalPages; index++) {
      const itemLi = document.createElement("li");
      itemLi.classList.add("page-item", "cursor-pointer");
      itemLi.id = `page-button-${index}`;
      itemLi.onclick = () => movePage(index, transactions);

      const numberLabel = document.createElement("a");
      numberLabel.classList.add("page-link", "text-dark");
      numberLabel.textContent = index + 1;

      itemLi.appendChild(numberLabel);
      paginator.appendChild(itemLi);
    }
    // Seleccionar la primera página por defecto
    document.getElementById("page-button-0").classList.add("selected-page");
  }

});

const movePage = (pageNumber) => {
  const transaction = getAllTransactions();

  const startNumber = pageNumber * 5;
  const endNumber = (pageNumber + 1) * 5;
  const transactionToDraw = transaction.slice(startNumber, endNumber);
  drawItems(transactionToDraw);

  const pageButtons = document.querySelectorAll(".selected-page");
  pageButtons.forEach((_button, index) => {
    pageButtons[index].classList.remove("selected-page");
  });

  // Nueva pagina seleccionada
  document.getElementById(`page-button-${pageNumber}`).classList.add("selected-page");
};

const drawItems = (transactions) => {
  const transactionList = document.getElementById("transaction-list");
  transactionList.style.height = `${transactions.length * 130}px`;
  transactionList.innerHTML = ""; // Limpiar lista

  transactions.forEach((item, index) => {
    setTimeout(() => {
      const itemContainer = document.createElement("div");
      itemContainer.classList.add("w-100", "container", "bg-light", "d-flex", "justify-content-center", "align-items-center", "py-3", "mb-3", "rounded", "animate-slide-in");

      // Número de transacción
      const itemNumber = document.createElement("div");
      itemNumber.classList.add("number-column", "fw-normal", "h6", "mt-2", "p-2");
      itemNumber.textContent = item.number;

      // Tipo de transacción
      const itemTransactionTypeContainer = document.createElement("div");
      itemTransactionTypeContainer.classList.add("transaction-column", "mt-2", "p-2", "d-flex", "align-items-center");

      const transactionColor = iconColor(item.tipo); // Get class for color icon
      const transactionIconClass = iconClass(item.tipo);

      const transactionIconContainer = document.createElement("div");
      transactionIconContainer.classList.add(transactionColor, "p-3", "icon", "d-flex", "me-2", "justify-content-center", "align-items-center", "rounded-circle");

      const transactionIcon = document.createElement("span");
      transactionIcon.classList.add("mdi", transactionIconClass, "h4", "mb-0");

      const transactionLabel = document.createElement("span");
      transactionLabel.classList.add("fw-bold");
      transactionLabel.textContent = capitalizeText(item.tipo);

      transactionIconContainer.appendChild(transactionIcon);
      itemTransactionTypeContainer.appendChild(transactionIconContainer);
      itemTransactionTypeContainer.appendChild(transactionLabel);

      // Monto
      const amountContainer = document.createElement("div");
      amountContainer.classList.add("amount-column", "fw-normal", "mt-2", "p-2", "d-flex", "flex-column");

      const currencySymbol = document.createElement("span");
      currencySymbol.classList.add("h6");
      currencySymbol.textContent = "USD";

      const amountLabel = document.createElement("span");
      amountLabel.classList.add("fw-bolder", "h6");
      amountLabel.textContent = `$${item.amount || 0}`;

      amountContainer.appendChild(currencySymbol);
      amountContainer.appendChild(amountLabel);

      // Categoría
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("category-column", "fw-normal", "h6", "mt-2", "p-2", "d-flex", "align-items-center");

      const categoryLabel = document.createElement("span");
      categoryLabel.classList.add("fw-bold");
      categoryLabel.textContent = capitalizeText(item.category || "");

      const categoryIconClass = iconClass(item.category);
      const categoryColor = iconColor(item.category);

      const categoryIconContainer = document.createElement("div");
      categoryIconContainer.classList.add("p-3", categoryColor, "icon", "d-flex", "me-2", "justify-content-center", "align-items-center", "rounded-circle");

      const categoryIcon = document.createElement("span");
      categoryIcon.classList.add("mdi", categoryIconClass, "h4", "mb-0");

      categoryIconContainer.appendChild(categoryIcon);
      categoryContainer.appendChild(categoryIconContainer);
      categoryContainer.appendChild(categoryLabel);

      // Fecha y hora
      const datetimeContainer = document.createElement("div");
      datetimeContainer.classList.add("date-column", "fw-normal", "h6", "mt-2", "p-2");
      datetimeContainer.textContent = item?.date ? dayjs(item.date).format("DD-MM-YYYY [a las] HH:mm:ss a") : "Fecha no disponible";

      // Añadir elementos al contenedor
      itemContainer.appendChild(itemNumber);
      itemContainer.appendChild(itemTransactionTypeContainer);
      itemContainer.appendChild(amountContainer);
      itemContainer.appendChild(categoryContainer);
      itemContainer.appendChild(datetimeContainer);

      transactionList.appendChild(itemContainer);
    }, index * 100);
  });
};

const getAllTransactions = () => {
  const expenses = getExpenses();
  const incomes = getIncomes();

  const transactions = expenses.concat(incomes);

  // Ordena las transacciones de la más antigua a la más reciente
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  transactions.forEach((transaction, index) => {
    transaction.number = index + 1;
  });

  return transactions;
};

const capitalizeText = (text) => {
  if (!text) return "";
  const firstLetter = text.charAt(0);
  const rest = text.slice(1);
  return firstLetter.toUpperCase() + rest;
};


const iconColor = (value) => {
  const tag = value.toLowerCase();
  const color = colors[tag];
  if (!color) {
    return "unknow-icon";
  }
  return color;
}

const iconClass = (value) => {
  const tag = value.toLowerCase();
  const icon = icons[tag];
  if (!icon) {
    return "mdi-help-circle-outline"
  }
  return icon;
}

const colors = {
  "sueldo": "salary-icon",
  "transferencia": "bank-transfer-icon",
  "ahorros": "savings-icon",
  "otros": "other-icon",
  "supermercado": "groceries-icon",
  "educacion": "education-icon",
  "entretenimiento": "entertainment-icon",
  "salud": "health-icon",
  "servicios": "utilities-icon",
  "depósito": "deposit-icon",
  "retiro": "withdraw-icon",
  "pago de servicio": "service-icon",
  "energia": "energy-icon",
  "internet": "internet-icon",
  "telefonia": "phone-icon",
  "agua": "water-icon"
};

const icons = {
  "sueldo": "mdi-cash",
  "transferencia": "mdi-bank-transfer",
  "ahorros": "mdi-piggy-bank",
  "otros": "mdi-dots-horizontal",
  "supermercado": "mdi-cart",
  "educacion": "mdi-school",
  "entretenimiento": "mdi-movie",
  "salud": "mdi-hospital",
  "servicios": "mdi-face-agent",
  "depósito": "mdi-cash-multiple",
  "retiro": "mdi-cash-multiple",
  "pago de servicio": "mdi-account-credit-card-outline",
  "energia": "mdi-lightning-bolt",
  "internet": "mdi-web-box",
  "telefonia": "mdi-phone-classic",
  "agua": "mdi-water-circle"
};
