console.log("JS is running");

const API_URL = "http://localhost:5273/ProductAPI";

let isLoggedIn = false;

// DOM references
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const productForm = document.getElementById("create-product-form");
const confirmation = document.getElementById("confirmation-message");
const productsList = document.getElementById("products-list");

// Toggle product form based on login state
function toggleProductForm() {
    if (isLoggedIn) {
        productForm.style.display = "block";
    } else {
        productForm.style.display = "none";
    }
}

// Load products from API
async function loadProducts() {
    try {
        const res = await fetch(API_URL);
        const products = await res.json();

        productsList.innerHTML = "";
        products.forEach(p => {
            const li = document.createElement("li");
            li.textContent = `${p.Name} - $${p.Price} - Stock: ${p.Inventory}`;
            productsList.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

// Handle login form submission dynamically
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        const res = await fetch("login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (data.success) {
            isLoggedIn = true;
            loginMessage.textContent = "Logged in successfully!";
            loginMessage.style.color = "green";
            loginForm.style.display = "none";
            toggleProductForm();
        } else {
            loginMessage.textContent = data.message;
            loginMessage.style.color = "red";
        }
    } catch (err) {
        loginMessage.textContent = "Error logging in.";
        loginMessage.style.color = "red";
    }
});

// Handle product creation
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        Name: document.getElementById("product-name").value,
        Price: parseInt(document.getElementById("product-price").value),
        Inventory: parseInt(document.getElementById("product-inventory").value)
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            confirmation.style.display = "block";
            productForm.reset();
            loadProducts();
        } else {
            const text = await response.text();
            console.error("Failed to create product:", text);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

// Initialize page
toggleProductForm();
loadProducts();