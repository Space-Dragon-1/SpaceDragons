import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  image: {
    url: String,
    public_id: String,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
});

export default mongoose.model('products', productSchema);
