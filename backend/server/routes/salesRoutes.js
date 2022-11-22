import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Sales from '../models/salesModel.js';

const salesRouter = express.Router();

salesRouter.get(
  '/',
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
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Sales.findById(req.params.id);
      res.send(order);
    } catch (error) {
      return res.status(404).send({ message: 'Venta no Encontrada ', error });
    }
  })
);

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.inventario = product.inventario - quantity;
  await product.save({ validateBeforeSave: false });
}

export default salesRouter;
