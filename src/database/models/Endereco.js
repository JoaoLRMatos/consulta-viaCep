import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema(
  {
    cep: { type: String, required: true },
    logradouro: String,
    bairro: String,
    complemento: String,
    localidade: String,
    uf: String,
    ibge: String,
    gia: String,
    ddd: String,
    siafi: String,
    status: {
      type: String,
      enum: ["PENDENTE", "CONCLUIDO", "REJEITADO"],
      default: "PENDENTE",
    },
    data: { type: Object, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Endereco", enderecoSchema);
