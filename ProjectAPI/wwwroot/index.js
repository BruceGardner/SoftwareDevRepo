console.log("JS is running");

// DOM references
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const productForm = document.getElementById("create-product-form");
const confirmation = document.getElementById("confirmation-message");
const productsList = document.getElementById("products-list");
const purchaseForm = document.getElementById("purchase-form");
const purchaseMessage = document.getElementById("purchase-message");
const purchaseProductId = document.getElementById("purchase-product-id");

// Only toggle product and purchase forms if user is logged in
function toggleProductForm() {
    if (productForm) productForm.style.display = "block";
    if (purchaseForm) purchaseForm.style.display = "block";
}

// Only initialize purchase form if both the purchase form and products list exist
function initPurchaseForm() {
    if (!purchaseForm || !productsList) return; // <-- guard
    const firstLi = productsList.querySelector('li');
    if (firstLi && purchaseProductId) {
        purchaseProductId.value = firstLi.dataset.id;
    }
}

// Validate purchase quantity on submit
if (purchaseForm) {
    purchaseForm.addEventListener("submit", (e) => {
        const quantityInput = purchaseForm.querySelector('input[name=quantity]');
        const firstLi = productsList.querySelector('li');
        if (!quantityInput || !firstLi) return;

        const stock = parseInt(firstLi.textContent.match(/Stock: (\d+)/)[1]);
        const qty = parseInt(quantityInput.value);

        if (qty < 1 || qty > stock) {
            e.preventDefault();
            if (purchaseMessage) {
                purchaseMessage.textContent = 'Invalid quantity.';
                purchaseMessage.style.color = 'red';
            }
        }
    });
}

// Initialize
toggleProductForm();
initPurchaseForm();