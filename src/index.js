import express from "express";
import mongoose from "mongoose";
import env from "./config/env.js";
import cepRoutes from "./routes/cepRoutes.js";

const app = express();
app.use(express.json());
app.use(cepRoutes);

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(3000, () => {
      console.log("API rodando na porta 3000");
    });
  })
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err.message));
