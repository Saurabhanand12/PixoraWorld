// mongoose-connection.js
import mongoose from "mongoose";
import config from "config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${config.get("MONGODB_URI")}/Pixora`);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
