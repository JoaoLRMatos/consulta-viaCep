import mongoose from "mongoose";
import env from "../../config/env.js";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Conectado ao MongoDB");
    return mongoose.connection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1);
  }
}

export default connectDB;
