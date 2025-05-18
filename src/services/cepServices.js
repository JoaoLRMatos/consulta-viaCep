import Endereco from "../models/Endereco.js";
import { buscarEndereco } from "../utils/viaCep.js";

export async function criarRegistro(cep) {
  if (!cep) throw new Error("CEP é obrigatório");

  return Endereco.create({
    cep: cep.replace(/\D/g, ""), // Armazena sem formatação
    status: "PENDENTE",
  });
}

export async function processarMensagem(id) {
  const registro = await Endereco.findById(id);
  if (!registro) throw new Error("Registro não encontrado");

  try {
    const dadosCep = await buscarEndereco(registro.cep);

    registro.set({
      status: "CONCLUIDO",
      logradouro: dadosCep.logradouro,
      complemento: dadosCep.complemento,
      bairro: dadosCep.bairro,
      localidade: dadosCep.localidade,
      uf: dadosCep.uf,
      unidade: dadosCep.unidade,
      ibge: dadosCep.ibge,
      gia: dadosCep.gia,
      atualizadoEm: new Date(),
    });

    await registro.save();
    return registro;
  } catch (error) {
    registro.set({
      status: "REJEITADO",
      erro: error.message,
      atualizadoEm: new Date(),
    });

    await registro.save();
    throw error; // Propaga o erro para tratamento específico no consumer
  }
}
