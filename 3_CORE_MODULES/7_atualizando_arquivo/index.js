const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("mensagem.html", function (err, data) {
      if (err) {
        console.error("Erro ao ler o arquivo:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erro interno do servidor");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else {
    const nameNewLine = name + "\r\n";

    fs.writeFile("arquivo.txt", nameNewLine, function (err, data) {
      res.write(302, { location: "/" });
      res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
