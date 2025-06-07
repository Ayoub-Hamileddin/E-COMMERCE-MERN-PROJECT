import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("successfuly connect to mongo db");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
