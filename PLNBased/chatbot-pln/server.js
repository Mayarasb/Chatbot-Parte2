const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const natural = require("natural");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Classificador Bayesiano
const classifier = new natural.BayesClassifier();

// Treinamento inicial (saudação, pedido, agradecimento)
classifier.addDocument("oi", "saudacao");
classifier.addDocument("olá", "saudacao");
classifier.addDocument("bom dia", "saudacao");

classifier.addDocument("quero saber meu pedido", "pedido_status");
classifier.addDocument("meu pedido chegou", "pedido_status");
classifier.addDocument("acompanhar pedido", "pedido_status");

classifier.addDocument("obrigado", "agradecimento");
classifier.addDocument("valeu", "agradecimento");


// 1. Preço
classifier.addDocument("quanto custa", "preco");
classifier.addDocument("qual é o preço", "preco");
classifier.addDocument("qual o valor do produto", "preco");
classifier.addDocument("quanto tá saindo", "preco");

// 2. Ajuda
classifier.addDocument("preciso de ajuda", "ajuda");
classifier.addDocument("me ajuda", "ajuda");
classifier.addDocument("como funciona a plataforma", "ajuda");
classifier.addDocument("estou com dúvidas", "ajuda");

// 3. Cancelamento
classifier.addDocument("quero cancelar meu pedido", "cancelamento");
classifier.addDocument("como faço para cancelar", "cancelamento");
classifier.addDocument("cancelar compra", "cancelamento");
classifier.addDocument("desistir da compra", "cancelamento");

// Treinamento do classificador com todas as intenções
classifier.train();

app.post("/chat", (req, res) => {
  const { message } = req.body;
  const intent = classifier.classify(message.toLowerCase());
  let reply = "Desculpe, não entendi.";

  switch (intent) {
    case "saudacao":
      reply = "Olá! Em que posso te ajudar hoje?";
      break;
    case "pedido_status":
      reply = "Para consultar seu pedido, informe o número ou e-mail da compra.";
      break;
    case "agradecimento":
      reply = "De nada! Estou sempre à disposição.";
      break;
    case "preco":
      reply = "Nossos preços variam de acordo com o produto. Você pode conferir nosso catálogo completo na loja!";
      break;
    case "ajuda":
      reply = "Estou aqui para ajudar! Você pode me perguntar sobre preços, status de pedidos ou cancelamentos.";
      break;
    case "cancelamento":
      reply = "Para solicitar o cancelamento, acesse 'Meus Pedidos' e selecione a opção 'Solicitar Cancelamento'.";
      break;
  }

  res.json({ reply, intent });
});

app.listen(3000, () => console.log("Chatbot PLN rodando na porta 3000"));