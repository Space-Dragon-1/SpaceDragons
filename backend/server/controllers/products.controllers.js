import fs from "fs-extra";
import { deleteImage, uploadImage } from "../libraries/cloudinary.js";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Error: " + error.message);
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    console.log(product);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, stock } = req.body;

    let image = null;

    if (req.files.image) {
      const fileUpload = await uploadImage(req.files.image.tempFilePath);
      image = fileUpload.secure_url;
      /* image = {
        url: fileUpload.secure_url,
        public_id: fileUpload.public_id,
      }; */
      await fs.remove(req.files.image.tempFilePath);
    }

    const newProduct = new Product({
      name,
      slug,
      description,
      price,
      image,
      stock,
    });
    await newProduct.save();
    return res.json(newProduct);
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productRemoved = await Product.findByIdAndDelete(req.params.id);

    if (!productRemoved) return res.sendStatus(404);
    if (productRemoved.image.public_id)
      await deleteImage(productRemoved.image.public_id);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.sendStatus(404);
    } else {
      return res.json(product);
    }
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
};
