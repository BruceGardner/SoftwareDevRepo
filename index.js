fetch("http://localhost:5269/productAPI")
  .then(response => response.json())
  .then(products => {
    const list = document.getElementById("products-list");

    products.forEach(product => {
      const li = document.createElement("li");
      li.textContent = `${product.name} - $${product.price} - Stock: ${product.inventory}`;
      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });