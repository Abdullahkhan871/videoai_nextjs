import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("Please add MONGODB URL");
}

let cachedMongoDbConnection = global.mongoose;

if (!cachedMongoDbConnection) {
  cachedMongoDbConnection = global.mongoose = {
    connection: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  if (cachedMongoDbConnection.connection) {
    return cachedMongoDbConnection.connection;
  }

  if (!cachedMongoDbConnection.promise) {
    const option = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cachedMongoDbConnection.promise = mongoose
      .connect(MONGODB_URL, option)
      .then(() => mongoose.connection);
  }

  try {
    cachedMongoDbConnection.connection = await cachedMongoDbConnection.promise;
  } catch (error) {
    throw error;
  }

  return cachedMongoDbConnection.connection;
}
