import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	fullName: String,
	email: String,
	password: String,
	phone: String,
	address: String,
	avatar: String,
	birthday: Date,
	role: String,
	status: String
}, {
	timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;