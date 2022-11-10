import express from "express";
import fileUpload from "express-fileupload";
import productRoutes from "./routes/products.routes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./files",
  })
);

// routes
app.use(productRoutes);

export default app;
