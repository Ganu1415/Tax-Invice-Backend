import mongoose from "mongoose"; // Use 'import' instead of 'require'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Error ❌", error);
    process.exit(1);
  }
};

export default connectDB; // Use 'export default' instead of 'module.exports'
