import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDb = async () => {
  try {
    const {MONGO_URI} = ENV;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    const conn = await mongoose.connect(ENV.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};