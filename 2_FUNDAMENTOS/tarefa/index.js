import inquirer from "inquirer";
import chalk from "chalk";

const questions = [
  {
    type: "input",
    name: "nome",
    message: "Qual é o seu nome?",
  },
  {
    type: "input",
    name: "idade",
    message: "Qual é a sua idade?",
  },
];

inquirer.prompt(questions)
  .then((answers) => {
    try {
      const { nome, idade } = answers;

      if (!nome || isNaN(idade)) {
        throw new Error("Nome ou idade inválidos.");
      }

      console.log(chalk.black.bgYellow(`Olá, ${nome}! Você tem ${idade} anos.`));
    } catch (err) {
      console.log(`Ocorreu um erro: ${err.message}`);
    }
  })
  .catch((err) => {
    console.log(`Erro ao obter as respostas: ${err.message}`);
  });
