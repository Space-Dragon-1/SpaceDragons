import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Sales from '../models/salesModel.js';

const salesRouter = express.Router();

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

export default salesRouter;
