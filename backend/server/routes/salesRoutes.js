import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../../utils.js';
import Product from '../models/Product.js';
import Sales from '../models/salesModel.js';

const salesRouter = express.Router();

salesRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const sales = await Sales.find().populate('user', 'name');
      res.send(sales);
    } catch (error) {
      return res.status(500).send({ message: 'Error: ' + error });
    }
  })
);

salesRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newSales = new Sales({
      salesItems: req.body.salesItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
    });

    const sales = await newSales.save();

    res
      .status(201)
      .send({ message: 'Factura creada Satisfactoriamente', sales });
  })
);

salesRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Sales.find({ user: req.user._id });
    res.send(orders);
  })
);

salesRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Sales.findById(req.params.id);
      res.send(order);
    } catch (error) {
      return res.status(404).send({ message: 'Orden no Encontrada' });
    }
  })
);

salesRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Sales.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      await order.save();
      res.send({ message: 'Pagado correctamente', order });
    } else {
      res.status(404).send({ message: 'No se ah podido efectuar el pago' });
    }
  })
);

salesRouter.put(
  '/:id/deliver',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Sales.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      order.salesItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });

      await order.save();
      res.send({ message: 'Pedido enviado correctamente', order });
    } else {
      res.status(404).send({ message: 'Pedido no Encontrado ' });
    }
  })
);

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

export default salesRouter;
