import mongoose from "mongoose";

let isConnected = false; // variable to check if mongoose is connected

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);
	if (!process.env.MONGODB_URI) return console.log("MongoDB_URI not found");
	if (isConnected) return console.log("Already connected to mongoose");

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		isConnected = true;
		console.log("Connected to mongoDB");
	} catch (error) {
		console.log("Error" + error);
	}
}