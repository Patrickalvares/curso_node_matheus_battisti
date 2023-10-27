const path = require("path");

console.log(path.resolve("test.txt"));

//formar path

const midFolder = "relatorios";
const fileName = "Patrick.txt";

const finalPath = path.join("/", "arquivos", midFolder, fileName);

console.log(finalPath);
