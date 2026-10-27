const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();
  let response = "Desculpe, não entendi sua pergunta.";


  if (message.includes("login")) {
    response = "Você pode redefinir sua senha clicando em 'Esqueci minha senha'.";
  } else if (message.includes("plano")) {
    response = "Temos planos Básico e Premium. Qual você gostaria de saber mais?";
  } else if (message.includes("atendente")) {
    response = "Ok! Encaminhando você para um atendente.";
  } 

  else if (message.includes("horario") || message.includes("horário") || message.includes("horas")) {
    response = "Nosso horário de funcionamento é de segunda a sexta, das 09h às 18h.";
  } else if (message.includes("localizacao") || message.includes("localização") || message.includes("endereço") || message.includes("onde")) {
    response = "Estamos localizados na Av. Paulista, 1000 - São Paulo, SP.";
  } else if (message.includes("promocao") || message.includes("promoção") || message.includes("oferta") || message.includes("desconto")) {
    response = "Estamos com promoções de até 30% de desconto nesta semana! Acesse nossa aba de ofertas.";
  }

  res.json({ reply: response });
});

app.listen(3000, () => console.log("Chatbot baseado em regras rodando na porta 3000"));