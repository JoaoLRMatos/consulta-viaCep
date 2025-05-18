import { processarMensagem } from "../services/cepServices.js";
import { receberMensagens, deletarMensagem } from "../services/sqsService.js";
import connection from "../db/connection.js";

async function startConsumer() {
  try {
    await connection(); // Connexão com o DB
    console.log("Consumidor iniciado. Aguardando mensagens da fila...");

    while (true) {
      let mensagens = [];
      try {
        mensagens = await receberMensagens();

        if (mensagens.length === 0) {
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 5s se fila vazia
          continue;
        }

        for (const msg of mensagens) {
          try {
            // Extrai o ID do corpo da mensagem
            const { id } = JSON.parse(msg.Body);

            // Processa a mensagem com o ID extraído
            await processarMensagem(id);

            // Remove a mensagem processada da fila
            await deletarMensagem(msg.ReceiptHandle);
            console.log(`Mensagem processada com sucesso (ID: ${id})`);
          } catch (erroProcessamento) {
            console.error(
              `Erro ao processar mensagem (ReceiptHandle: ${msg.ReceiptHandle}):`,
              erroProcessamento.message
            );
          }
        }
      } catch (erroFila) {
        console.error("Erro ao acessar fila SQS:", erroFila.message);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Espera 10s antes de tentar novamente
      }
    }
  } catch (erroConexao) {
    console.error(
      "Falha crítica na inicialização do consumidor:",
      erroConexao.message
    );
    process.exit(1);
  }
}

// Inicia o consumidor
startConsumer().catch((err) => {
  console.error("Erro não tratado no consumidor:", err);
  process.exit(1);
});

export default startConsumer;
