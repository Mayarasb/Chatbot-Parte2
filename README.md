# 🤖 Projeto de Chatbots: Regras vs. Processamento de Linguagem Natural (PLN)

Este projeto apresenta dois modelos de chatbot desenvolvidos em **Node.js** com **Express**, demonstrando a diferença entre um chatbot baseado em regras fixas e outro que utiliza **Processamento de Linguagem Natural (PLN)** para classificar as intenções do usuário.

O objetivo é comparar como cada abordagem interpreta mensagens e retorna respostas automáticas.

---

## 📁 Estrutura do Repositório

```text
chat/
│
├── PLNBased/
│   └── chatbot-pln/
│       ├── server.js
│       ├── index.html
│       └── package.json
│
└── RulesBased/
    └── chatbot-node/
        ├── server.js
        ├── index.html
        └── package.json
```

### Descrição dos arquivos

- `server.js`: contém a lógica do chatbot e a API.
- `index.html`: interface web para interagir com o chatbot.
- `package.json`: configurações do projeto e dependências necessárias.

---

## 1. 💬 Chatbot Baseado em Regras

**Diretório:** `RulesBased/chatbot-node`

O chatbot baseado em regras utiliza estruturas condicionais (`if/else`) e o método `includes()` para identificar palavras-chave nas mensagens enviadas pelo usuário.

A aplicação converte a mensagem para letras minúsculas e verifica se ela contém determinados termos. Conforme a palavra identificada, retorna uma resposta previamente definida.

### Regras implementadas

| Palavra-chave ou expressão | Resposta do chatbot |
|---|---|
| `login` | Você pode redefinir sua senha clicando em 'Esqueci minha senha'. |
| `plano` | Temos planos Básico e Premium. Qual você gostaria de saber mais? |
| `atendente` | Ok! Encaminhando você para um atendente. |
| `horario`, `horário`, `horas` | Nosso horário de funcionamento é de segunda a sexta, das 09h às 18h. |
| `localizacao`, `localização`, `endereço`, `onde` | Estamos localizados na Av. Paulista, 1000 - São Paulo, SP. |
| `promocao`, `promoção`, `oferta`, `desconto` | Estamos com promoções de até 30% de desconto nesta semana! Acesse nossa aba de ofertas. |

Se nenhuma regra for identificada, o chatbot retorna:

> Desculpe, não entendi sua pergunta.

### Exemplos de requisições à API

O endpoint utilizado é `POST /chat`.

**Exemplo 1 — Horário de funcionamento**

Requisição:

```json
{
  "message": "Qual o horário de funcionamento?"
}
```

Resposta:

```json
{
  "reply": "Nosso horário de funcionamento é de segunda a sexta, das 09h às 18h."
}
```

**Exemplo 2 — Planos disponíveis**

Requisição:

```json
{
  "message": "Quais planos vocês oferecem?"
}
```

Resposta:

```json
{
  "reply": "Temos planos Básico e Premium. Qual você gostaria de saber mais?"
}
```

**Exemplo 3 — Promoções**

Requisição:

```json
{
  "message": "Vocês têm descontos?"
}
```

Resposta:

```json
{
  "reply": "Estamos com promoções de até 30% de desconto nesta semana! Acesse nossa aba de ofertas."
}
```

**Exemplo 4 — Mensagem não reconhecida**

Requisição:

```json
{
  "message": "Quero informações sobre outra coisa."
}
```

Resposta:

```json
{
  "reply": "Desculpe, não entendi sua pergunta."
}
```

---

## 2. 🧠 Chatbot Baseado em Processamento de Linguagem Natural (PLN)

**Diretório:** `PLNBased/chatbot-pln`

O chatbot baseado em PLN utiliza a biblioteca **Natural.js**, que implementa um classificador Bayesiano para identificar a intenção provável do usuário a partir da mensagem recebida.

Diferentemente do chatbot baseado em regras, essa abordagem utiliza exemplos de frases para treinar o classificador. Após o treinamento, o sistema classifica novas mensagens e seleciona uma resposta de acordo com a intenção identificada.

### Intenções treinadas

| Intenção | Exemplos de frases utilizadas no treinamento |
|---|---|
| `saudacao` | oi, olá, bom dia |
| `pedido_status` | quero saber meu pedido, meu pedido chegou, acompanhar pedido |
| `agradecimento` | obrigado, valeu |
| `preco` | quanto custa, qual é o preço, qual o valor do produto, quanto tá saindo |
| `ajuda` | preciso de ajuda, me ajuda, como funciona a plataforma, estou com dúvidas |
| `cancelamento` | quero cancelar meu pedido, como faço para cancelar, cancelar compra, desistir da compra |

### Respostas configuradas

| Intenção identificada | Resposta do chatbot |
|---|---|
| `saudacao` | Olá! Em que posso te ajudar hoje? |
| `pedido_status` | Para consultar seu pedido, informe o número ou e-mail da compra. |
| `agradecimento` | De nada! Estou sempre à disposição. |
| `preco` | Nossos preços variam de acordo com o produto. Você pode conferir nosso catálogo completo na loja! |
| `ajuda` | Estou aqui para ajudar! Você pode me perguntar sobre preços, status de pedidos ou cancelamentos. |
| `cancelamento` | Para solicitar o cancelamento, acesse 'Meus Pedidos' e selecione a opção 'Solicitar Cancelamento'. |

### Exemplos de requisições à API

O endpoint utilizado também é `POST /chat`.

**Exemplo 1 — Saudação**

Requisição:

```json
{
  "message": "Olá"
}
```

Resposta esperada:

```json
{
  "reply": "Olá! Em que posso te ajudar hoje?",
  "intent": "saudacao"
}
```

**Exemplo 2 — Consulta de pedido**

Requisição:

```json
{
  "message": "Quero saber meu pedido"
}
```

Resposta esperada:

```json
{
  "reply": "Para consultar seu pedido, informe o número ou e-mail da compra.",
  "intent": "pedido_status"
}
```

**Exemplo 3 — Formas de perguntar sobre preço**

Requisição:

```json
{
  "message": "Quanto custa esse produto?"
}
```

Resposta esperada:

```json
{
  "reply": "Nossos preços variam de acordo com o produto. Você pode conferir nosso catálogo completo na loja!",
  "intent": "preco"
}
```

**Exemplo 4 — Solicitação de ajuda**

Requisição:

```json
{
  "message": "Preciso de ajuda"
}
```

Resposta esperada:

```json
{
  "reply": "Estou aqui para ajudar! Você pode me perguntar sobre preços, status de pedidos ou cancelamentos.",
  "intent": "ajuda"
}
```

**Exemplo 5 — Cancelamento de compra**

Requisição:

```json
{
  "message": "Quero cancelar meu pedido"
}
```

Resposta esperada:

```json
{
  "reply": "Para solicitar o cancelamento, acesse 'Meus Pedidos' e selecione a opção 'Solicitar Cancelamento'.",
  "intent": "cancelamento"
}
```

**Exemplo 6 — Agradecimento**

Requisição:

```json
{
  "message": "Valeu"
}
```

Resposta esperada:

```json
{
  "reply": "De nada! Estou sempre à disposição.",
  "intent": "agradecimento"
}
```

> **Observação:** as respostas acima são exemplos esperados conforme o treinamento. O classificador Bayesiano escolhe a intenção mais provável com base nos exemplos fornecidos, portanto frases diferentes podem ser classificadas incorretamente.

---

