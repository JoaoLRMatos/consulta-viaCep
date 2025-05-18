import express from "express";
const router = express.Router();
import { processarConsulta } from "../controllers/cepController.js";

router.post("/consulta", processarConsulta);

export default router;
