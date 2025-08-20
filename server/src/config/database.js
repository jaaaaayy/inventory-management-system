import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://localhost:27017/inventory_management_system"
  )
  .then(() => console.log("Connected to Mongodb."))
  .catch((err) => console.log(`Error connecting to Mongodb: ${err}`));
