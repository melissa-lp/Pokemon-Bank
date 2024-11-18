//initialData.js
const users = {
    username: "usuario",
    phone: "22455896",
    password: "12345678",
    totalBalance: 0,
    accountNumber: "12345678901234567890",
    incomes: [],
    expenses: []
};

document.addEventListener("DOMContentLoaded", () => {

    // Verificar si existen los datos
    const currentData = JSON.parse(localStorage.getItem("storage"));
    if (currentData) {
        // Ver si el usuario ya esta en la lista
        const included = currentData.find((user) => user.username === users.username);

        if (!included) {
            currentData.push(users);
        }

        localStorage.setItem("storage", JSON.stringify(currentData));
    } else {
        localStorage.setItem("storage", JSON.stringify([users]));
    }
});