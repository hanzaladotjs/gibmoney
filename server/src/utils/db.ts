import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const uri = process.env.DATABASE_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(uri as string);
  } catch (e) {
    console.log(e)
  }
};