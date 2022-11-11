import app from './app.js';
import data from './data/products.js';
import { PORT } from './config.js';
import { DBconnection } from './db.js';

//DBconnection();

app.get('/api/tienda', (req, res) => {
  res.send(data.products);
});

app.get('/api/tienda/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor iniciado en puerto http://localhost:${port}`);
});

/*let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];
*/

//app.use(cors());
//app.use(express.json());

/*app.get("/", (req, res) => {
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
*/
