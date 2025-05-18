import { criarRegistro } from "../services/cepServices.js";
import { enviarMensagem } from "../services/sqsService.js";

export const processarConsulta = async (req, res) => {
  try {
    const { cep } = req.body;
    if (!cep) return res.status(400).json({ erro: "O CEP é obrigatório" });

    const registro = await criarRegistro(cep);
    await enviarMensagem(registro._id.toString());

    return res.status(201).json({ id: registro._id, status: registro.status });
  } catch (error) {
    return res.status(500).json({ erro: error.message });
  }
};
