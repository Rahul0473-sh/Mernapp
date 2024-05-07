import mongoose from "mongoose";
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to DB");
  } catch (error) {
    console.log(`Error while connection mongodb ${error.message}`);
    throw error;
  }
};
export  default connectDB;
