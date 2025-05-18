import { criarRegistro } from "../services/cepServices.js";
import { enviarMensagem } from "../services/sqsService.js";
import Endereco from "../models/Endereco.js";

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

export const listarEnderecos = async (req, res) => {
  try {
    const todos = await Endereco.find().sort({ createAd: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar registros" });
  }
};
export const deletarMensagem = async (req, res) => {
  try {
    const { id } = req.params;
    const removido = await Endereco.findByIdAndDelete(id);
    if (!removido) {
      return res.status(400).json({ erro: "Registro não encontrado" });
    }
    res.json({ mensagem: "Endereço removido com sucesso" });
  } catch (error) {
    res.json({ error: "ID inválido ou erro ao remover" });
  }
};
