import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductBySlug,
  getProducts,
  updateProduct
} from "../controllers/products.controllers.js";

const router = Router();

router.get("/admin/products", getProducts);
router.get("/admin/products/slug/:slug",getProductBySlug);
router.post("/admin/products", createProduct);
router.put("/admin/products/:id", updateProduct);
router.delete("/admin/products/:id", deleteProduct);
router.get("/admin/products/:id", getProduct);

export default router;
