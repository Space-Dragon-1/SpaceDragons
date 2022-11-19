import express from 'express';
import fileUpload from 'express-fileupload';
import productRoutes from './routes/products.routes.js';
import customerRoutes from './routes/customer.routes.js';
import salesRoutes from './routes/salesRoutes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './files',
  })
);

// routes
app.use(productRoutes);
app.use(customerRoutes);
app.use(salesRoutes);

export default app;
