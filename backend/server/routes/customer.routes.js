import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getListProducts,
  updateProduct,
} from '../controllers/customer.controllers.js';

const router = Router();

router.get('/customer/products-list', getListProducts);
router.post('/customer/products', createProduct);
router.put('/customer/products/:id', updateProduct);
router.delete('/customer/products/:id', deleteProduct);

router.get('/customer/products/:id', getProduct);

export default router;
