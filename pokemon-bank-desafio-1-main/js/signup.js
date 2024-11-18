//signup.js
document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("username-input");
    const phone = document.getElementById("phone-input");

    const password = document.getElementById("password-input");
    const confirmPassword = document.getElementById("confirm-password-input");

    // Validaciones
    if (!username.value) {
        username.classList.add("red-border");
    } else {
        username.classList.remove("red-border");
    }

    if (!phone.value) {
        phone.classList.add("red-border");
    } else {
        phone.classList.remove("red-border");
    }

    if (!password.value) {
        password.classList.add("red-border");
    } else {
        password.classList.remove("red-border");
    }

    if (!confirmPassword.value) {
        confirmPassword.classList.add("red-border");
    } else {
        confirmPassword.classList.remove("red-border");
    }

    if (!username.value) {
        showAlert("El nombre de usuario es requerido", "warning");
        return;
    }

    if (!phone.value) {
        showAlert("El número de teléfono es requerido", "warning");
        return;
    }
    if (!password.value) {
        showAlert("La contraseña es requerida", "warning");
        return;
    }

    if (password.value != confirmPassword.value) {
        showAlert("Las contraseñas no son iguales", "warning");
        return;
    }

    const payload = {
        username: username.value,
        phone: phone.value,
        password: password.value
    };

    registerUser(payload);

    localStorage.setItem("active-session", payload.username);
    showAlert("Usuario creado correctamente", "success");
    location.href = "../views/home.html";
});

document.getElementById("show-password").addEventListener("click", () => {
    document.getElementById("hide-password").classList.remove("d-none");
    document.getElementById("show-password").classList.add("d-none");
    // Cambiar input type
    document.getElementById("password-input").type = "text";
});

document.getElementById("hide-password").addEventListener("click", () => {
    document.getElementById("hide-password").classList.add("d-none");
    document.getElementById("show-password").classList.remove("d-none");
    // Cambiar input type
    document.getElementById("password-input").type = "password";
});

document.getElementById("show-confirm-password").addEventListener("click", () => {
    document.getElementById("hide-confirm-password").classList.remove("d-none");
    document.getElementById("show-confirm-password").classList.add("d-none");
    // Cambiar input type
    document.getElementById("confirm-password-input").type = "text";
});

document.getElementById("hide-confirm-password").addEventListener("click", () => {
    document.getElementById("hide-confirm-password").classList.add("d-none");
    document.getElementById("show-confirm-password").classList.remove("d-none");
    // Cambiar input type
    document.getElementById("confirm-password-input").type = "password";
});

/**
 * Indicador de seguridad de contraseña
 */
document.getElementById("password-input").addEventListener("keyup", () => {
    let score = 4;
    let color = "#ff6b6b";
    const password = document.getElementById("password-input").value;

    if (password.length > 0) {
        const lengthScore = Math.min(password.length / 8, 1) * 20;
        score += lengthScore;
    }

    if (password.length >= 8) {
        document.getElementById("8-letter-success").classList.remove("d-none");
        document.getElementById("8-letter-wrong").classList.add("d-none");
    } else {
        document.getElementById("8-letter-success").classList.add("d-none");
        document.getElementById("8-letter-wrong").classList.remove("d-none");
    }

    if (/[a-z]/.test(password)) {
        score += 19;
        document.getElementById("minus-success").classList.remove("d-none");
        document.getElementById("minus-wrong").classList.add("d-none");
    } else {
        document.getElementById("minus-success").classList.add("d-none");
        document.getElementById("minus-wrong").classList.remove("d-none");
    }

    if (/[A-Z]/.test(password)) {
        score += 19;
        document.getElementById("mayus-success").classList.remove("d-none");
        document.getElementById("mayus-wrong").classList.add("d-none");
    } else {
        document.getElementById("mayus-success").classList.add("d-none");
        document.getElementById("mayus-wrong").classList.remove("d-none");
    }

    if (/[0-9]/.test(password)) {
        score += 19;
        document.getElementById("number-success").classList.remove("d-none");
        document.getElementById("number-wrong").classList.add("d-none");
    } else {
        document.getElementById("number-success").classList.add("d-none");
        document.getElementById("number-wrong").classList.remove("d-none");
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        score += 19;
        document.getElementById("symbol-success").classList.remove("d-none");
        document.getElementById("symbol-wrong").classList.add("d-none");
    } else {
        document.getElementById("symbol-success").classList.add("d-none");
        document.getElementById("symbol-wrong").classList.remove("d-none");
    }

    if (score > 20 && score <= 40) {
        color = "#ff9e5d";
    }

    if (score > 40 && score <= 60) {
        color = "#ffc94d";
    }

    if (score > 60 && score <= 80) {
        color = "#ffeb3b";
    }

    if (score > 80 && score <= 99) {
        color = "#b6d94c";
    }

    if (score == 100) {
        color = "#10bd17"
    }

    const bar = document.getElementById("password-bar");

    bar.style.width = `${score}%`;
    bar.style.backgroundColor = color;
});

document.getElementById("password-input").addEventListener("focus", () => {
    const container = document.getElementById("password-bar-container");
    container.classList.add("visible")
})