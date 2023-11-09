const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/sobre", (req, res) => {
  res.sendFile("sobre.html", { root: __dirname });
});

app.get("/contato", (req, res) => {
  res.sendFile("contato.html", { root: __dirname });
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
