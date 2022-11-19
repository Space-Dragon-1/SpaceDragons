import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
	salesItems: Array,
	shippingAddress: Object,
	itemsPrice: Number,
	shippingPrice: Number,
	totalPrice: Number,
	user: String,
	createdAt: Date,
	updatedAt: Date
}, { versionKey: false })

const salesModel = mongoose.model('sales', salesSchema);
export default salesModel;