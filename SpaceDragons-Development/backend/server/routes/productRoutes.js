import express from 'express';
import Product from '../models/Product.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/:searcher', async (req, res) => {
  const products = await Product.find({name: {$regex: req.params.searcher, $options: 'i'}});
  if (products) {
    res.status(200).send(products);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

export default productRouter;
