const express = require("express");
const cors = require("cors");
const app = express();
const port = 5269;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const products = [
  { id: 1, name: "Testing Dummy", price: 70, inventory: 1 },
  { id: 2, name: "Laser Gun", price: 500, inventory: 4 }
];


app.get("/productAPI", (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});