import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" }, // admin/user
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
