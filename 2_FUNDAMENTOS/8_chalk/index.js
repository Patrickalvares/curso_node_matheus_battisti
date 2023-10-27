const chalk = require('chalk');

const nota = 9;

if (nota >= 7) {
    console.log(chalk.green.bold('Parabéns, você foi aprovado!'));
} else {
    console.log(chalk.bgRed.bold('Infelizmente você foi reprovado!'));
}
