import mongoose from "mongoose";

export const connectDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");
};

export const withTransaction = async (operations) => {
  return mongoose.connection.transaction((session) => operations(session));
};
