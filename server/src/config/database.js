import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined.");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  });

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