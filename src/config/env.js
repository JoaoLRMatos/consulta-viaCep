import { cleanEnv, str } from "envalid";
import dotenv from "dotenv";
dotenv.config();

const env = cleanEnv(process.env, {
  MONGO_URI: str({
    desc: "MongoDB connection string (ex: mongodb://localhost:27017/meubanco)",
  }),

  AWS_ACCESS_KEY_ID: str({
    desc: "Chave de acesso AWS",
  }),

  AWS_SECRET_ACCESS_KEY: str({
    desc: "Chave secreta AWS",
  }),

  AWS_REGION: str({
    default: "us-east-2",
    desc: "Região da AWS (ex: us-east-2)",
  }),

  SQS_URL: str({
    desc: "URL da fila SQS",
  }),
});

export default env;
