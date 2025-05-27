import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/inventory_management_system")
  .then(() => console.log("Connected to Mongodb."))
  .catch((err) => console.log(`Error connecting to Mongodb: ${err}`));
