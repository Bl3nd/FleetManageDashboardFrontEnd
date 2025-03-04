import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	id: {type: String, required: true},
	name: {type: String, required: true},
	onboarded: {type: Boolean, default: false},
	vehicles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Vehicles",
		}
	],
	employees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employees",
		}
	],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;