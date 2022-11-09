import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products", updateProduct);
router.delete("/products", deleteProduct);

router.get("/products/:id", getProduct);

export default router;
