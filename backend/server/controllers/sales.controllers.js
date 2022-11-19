import salesModel from "../models/sales.js";
import User from "../models/userModel.js";

export const getSales = async (req, res) => {
  try {
    const sales = await salesModel.find();
    res.send(sales);
    console.log(sales)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Error: " + error.message);
  }
};

export const getSalesById = async (req, res) => {
  try {
    const sales = await salesModel.findById(req.params._id);
    console.log(sales);
    res.send(sales);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Error: " + error.message);
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await User.findById(req.params._id);
    console.log(client);
    res.send(client);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Error: " + error.message);
  }
};