import app from './app.js';
import data from './data/products.js';
import { PORT } from './config.js';
import { DBconnection } from './db.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import salesRouter from './routes/salesRoutes.js';

DBconnection();

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/sales', salesRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
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
