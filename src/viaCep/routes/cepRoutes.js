import express from "express";
const router = express.Router();
import {
  processarConsulta,
  listarEnderecos,
  deletarMensagem,
} from "../../controllers/cepController.js";

router.post("/consulta", processarConsulta);
router.get("/enderecos", listarEnderecos);
router.delete("/deletar/:id", deletarMensagem);

export default router;
