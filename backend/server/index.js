import app from './app.js';
import data from './data/products.js';
import { PORT } from './config.js';
import { DBconnection } from './db.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import salesRouter from './routes/salesRoutes.js';

DBconnection();

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/sales', salesRouter)

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor iniciado en puerto http://localhost:${port}`);
});

export default app
