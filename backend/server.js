import cors from "cors";
import express from "express";

const app = express();
let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(404).json({
      message: "product not found",
    });

  res.json(productFound);
});

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(404).json({
      message: "product not found",
    });

  products = products.map((product) =>
    product.id === parseInt(req.params.id)
      ? { ...product, ...newData }
      : product
  );

  res.json({
    message: "product updated",
  });
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(404).json({
      message: "product not found",
    });

  products = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  );

  res.json({
    message: "product deleted",
  });
});

app.listen("5000", () => {
  console.log("servidor iniciado");
});
