import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

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

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
run().catch(console.dir);
