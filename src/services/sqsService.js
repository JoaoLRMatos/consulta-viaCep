import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import env from "../config/env.js";

// Configuração do cliente SQS
const sqsClient = new SQSClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

async function enviarMensagem(id) {
  // Envia mensagm para a fila
  try {
    const params = {
      QueueUrl: env.SQS_URL,
      MessageBody: JSON.stringify({ id }),
    };
    const command = new SendMessageCommand(params);
    await sqsClient.send(command);
    console.log("Mensagem enviada para a fila, ID:", id);
  } catch (error) {
    console.error("Erro ao enviar a mensagem para o SQS:", error);
    throw error;
  }
}

async function receberMensagens() {
  // Recebe a mensagem da fila
  try {
    const params = {
      QueueUrl: env.SQS_URL,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    };

    const command = new ReceiveMessageCommand(params);
    const data = await sqsClient.send(command);
    return data.Messages || [];
  } catch (error) {
    console.error("Erro ao receber mensagens da fila:", error);
    throw error;
  }
}

async function deletarMensagem(receiptHandle) {
  // Deleta a mensagem da fila
  try {
    const params = {
      QueueUrl: env.SQS_URL,
      ReceiptHandle: receiptHandle,
    };
    const command = new DeleteMessageCommand(params);
    await sqsClient.send(command);
    console.log("Mensagem deletada da fila");
  } catch (error) {
    console.error("Erro ao deletar mensagem:", error);
  }
}

export { enviarMensagem, receberMensagens, deletarMensagem };
