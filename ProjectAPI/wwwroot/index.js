console.log("JS is running");

const API_URL = "http://localhost:5273/ProductAPI";

function loadProducts() {
    fetch(API_URL)
        .then(res => res.json())
        .then(products => {
            const list = document.getElementById("products-list");
            list.innerHTML = "";

            products.forEach(p => {
                const li = document.createElement("li");
                li.textContent = `${p.Name} - $${p.Price} - Stock: ${p.Inventory}`;
                list.appendChild(li);
            });
        })
        .catch(err => console.error("Error fetching products:", err));
}

const form = document.getElementById("create-product-form");
const confirmation = document.getElementById("confirmation-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit clicked!");

  const product = {
    Name: document.getElementById("product-name").value,
    Price: parseInt(document.getElementById("product-price").value),
    Inventory: parseInt(document.getElementById("product-inventory").value)
  };

  try {
    const response = await fetch("http://localhost:5273/ProductAPI", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      confirmation.style.display = "block";
      form.reset();
      loadProducts();
    } else {
      const text = await response.text();
      console.error("Failed to create product:", text);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

loadProducts();