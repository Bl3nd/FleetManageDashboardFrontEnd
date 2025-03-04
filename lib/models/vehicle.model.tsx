import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
	id: {type: String},
	make: {type: String, required: true},
	model: {type: String, required: true},
	year: {type: String, required: true},
	vin: {type: String, required: true},
	mileage: {type: String},
	workorders: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Workorders"
		}
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});