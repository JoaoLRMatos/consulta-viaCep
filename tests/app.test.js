import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { jest } from "@jest/globals";

// Mock dinâmico para viaCep.js
let viaCep;
jest.unstable_mockModule("../src/utils/viaCep.js", () => ({
  buscarEndereco: jest.fn(),
}));

// Imports dependentes do mock
import Endereco from "../src/models/Endereco.js";
import * as cepService from "../src/services/cepServices.js";

// Setup Mongo em memória
let mongoServer;

beforeAll(async () => {
  viaCep = await import("../src/utils/viaCep.js");

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Endereco.deleteMany();
});

test("deve criar um registro com status PENDENTE", async () => {
  const registro = await cepService.criarRegistro("87020025");

  expect(registro.cep).toBe("87020025");
  expect(registro.status).toBe("PENDENTE");
});

test("deve processar o registro e atualizar com dados do ViaCEP", async () => {
  const registro = await cepService.criarRegistro("87020025");

  viaCep.buscarEndereco.mockResolvedValue({
    cep: "87020-025",
    logradouro: "Avenida Duque de Caxias",
    complemento: "",
    bairro: "Zona 07",
    localidade: "Maringá",
    uf: "PR",
    unidade: "",
    ibge: "4115200",
    gia: "",
  });

  const atualizado = await cepService.processarMensagem(registro._id);
  expect(atualizado.status).toBe("CONCLUIDO");
  expect(atualizado.data).toHaveProperty(
    "logradouro",
    "Avenida Duque de Caxias"
  );
});

test("deve lançar erro se o ID não existir", async () => {
  await expect(
    cepService.processarMensagem("000000000000000000000000")
  ).rejects.toThrow("Registro não encontrado");
});
