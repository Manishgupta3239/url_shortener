import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI in env");
}

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const ConnectDb = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("DB Connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log("❌ DB Error:", error);
    throw error;
  }
};

export default ConnectDb;