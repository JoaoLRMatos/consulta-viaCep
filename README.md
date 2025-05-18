# 🧾 Projeto CEP com Node.js, MongoDB e AWS SQS

Este projeto simula uma aplicação backend com arquitetura baseada em produtor/consumidor, onde:

- O produtor recebe um CEP e envia o ID para uma fila (AWS SQS).
- O consumidor escuta essa fila, consulta o endereço no ViaCEP, e atualiza o MongoDB com os dados completos.

## Funcionalidades

- Criação de registros de CEP com status inicial PENDENTE.

- Processamento de registros para consulta de dados no ViaCEP.

- Atualização do status para CONCLUIDO ou REJEITADO com base no resultado da consulta.

- Armazenamento dos dados retornados pelo ViaCEP no banco de dados.

- Testes automatizados com Jest e MongoDB em memória.

## Tecnologias Utilizadas

- Node.js

- MongoDB com Mongoose

- Jest para testes

- API ViaCEP

- Express

- AWS SQS

- Axios

## 📂 Estrutura do Projeto

```
📂 consulta-cep/
├── 📂 src/
│   ├── 📂 config/
│   │   └── env.js
│   ├── 📂 consumers/
│   │   └── cepConsumer.js
│   ├── 📂 controllers/
│   │   └── cepController.js
│   ├── 📂 db/
│   │   └── connections.js
│   ├── 📂 models/
│   │   └── Endereco.js
│   ├── 📂 routes/
│   │   └── cepRoutes.js
│   ├── 📂 services/
│   │   ├── cepServices.js
│   │   └── sqsService.js
│   ├── 📂 utils/
│   │   └── viaCep.js
│   └── index.js
├── 📂 tests/
│   └── app.test.js
├── 📂 env/
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Como Executar o Projeto

1. Clone o repositório:

```
git clone https://github.com/JoaoLRMatos/consulta-viaCep.git
cd consulta-viaCep
```

2. Instale as dependências:

```
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e insira:

```
MONGO_URI=sua_uri_mongodb
AWS_ACCESS_KEY_ID=sua_chave_aws
AWS_SECRET_ACCESS_KEY=sua_secreta_aws
AWS_REGION=sa-east-1
SQS_URL=sua_url_sqs
```

## Executando os Testes

Para rodar os testes automatizados:

```
npm test
```

## Iniciando a aplicação

1. Subir a API REST (produtor):

```
node .\src\index.js
```

2. Endpoint para enviar CEP para a fila:

```
POST /enderecos/producer
Body: { "cep": "01001-000" }
```

3. Iniciar o consumidor (processador da fila):

```
node consumer.js
```

## Exemplo de Uso

Criação de um novo registro de CEP:

```
import { criarRegistro } from './src/services/cepService.js';

const novoRegistro = await criarRegistro('87020025');
console.log(novoRegistro);
```

Processamento de um registro existente:

```
import { processarMensagem } from './src/services/cepService.js';

const resultado = await processarMensagem(novoRegistro._id);
console.log(resultado);
```

# 📚 Endpoints disponíveis

- GET /enderecos : Lista todos os endereços
- POST /consultar : Envia CEP para a fila (produtor)
- DELETE /deletar/:id : Deleta um endereço

# 🧠 Autor

Feito por João Luca Rodrigues de Matos — em estudo para oportunidade como desenvolvedor backend Node.js. Versão 2.0
