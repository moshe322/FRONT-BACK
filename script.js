const BACKEND_URL = "http://127.0.0.1:8888/api"; // Ensure correct API endpoint

document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            window.location.href = "register.html"; // Redirect to register page
        });
    }

    const registerSubmitBtn = document.getElementById("registerSubmit");
    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener("click", registerUser);
    }

    const loginSubmitBtn = document.getElementById("loginSubmit");
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener("click", loginUser);
    }
});

// Register User Function
async function registerUser() {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    if (!username || !password) {
        showMessage("registerMessage", "Please enter a username and password.", "red");
        return;
    }

    console.log(`Register Attempt: Username=${username}`);

    try {
        const response = await fetch(`${BACKEND_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log("Register Response:", data);

        if (response.ok) {
            showMessage("registerMessage", "User registered successfully!", "green");

            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to login page
            }, 2000);
        } else {
            showMessage("registerMessage", data.message || "Registration failed.", "red");
        }
    } catch (error) {
        console.error("Registration Error:", error);
        showMessage("registerMessage", "Registration failed. Try again.", "red");
    }
}

// Login User Function
async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        showMessage("loginMessage", "Please enter a username and password.", "red");
        return;
    }

    console.log(`Login Attempt: Username=${username}`);

    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log("Login Response:", data);

        if (response.ok) {
            showMessage("loginMessage", "Login Successful!", "green");

            setTimeout(() => {
                window.location.href = "message.html"; // Redirect after login
            }, 2000);
        } else {
            showMessage("loginMessage", data.message || "Invalid credentials.", "red");
        }
    } catch (error) {
        console.error("Login Error:", error);
        showMessage("loginMessage", "Login failed. Try again.", "red");
    }
}

// Function to show messages on UI
function showMessage(elementId, message, color) {
    const messageBox = document.getElementById(elementId);
    if (messageBox) {
        messageBox.innerText = message;
        messageBox.style.color = color;
    }
}
