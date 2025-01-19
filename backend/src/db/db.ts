import mongoose from "mongoose";

const connectToDb = async (): Promise<void> => {
  const dbUri = process.env.DB_CONNECT;
  if (!dbUri) {
    throw new Error("DB_CONNECT environment variable is not defined.");
  }

  try {
    await mongoose.connect(dbUri);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
};

export default connectToDb;
