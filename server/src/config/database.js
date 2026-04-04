import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/inventory_management_system")
  .then(() => console.log("Connected to Mongodb."))
  .catch((err) => console.log(`Error connecting to Mongodb: ${err}`));

export const withTransaction = async (operations) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const result = await operations(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};