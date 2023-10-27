// modulos externos
const inquirer = require("inquirer");
const chalk = require("chalk");

// modulos internos
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [
          "Criar Conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Criar Conta") {
        createAccount();
      } else if (action === "Consultar Saldo") {
        getAccountBalance();
      } else if (action === "Depositar") {
        deposit();
      } else if (action === "Sacar") {
      } else if (action === "Sair") {
        console.log(chalk.bgBlue.black("Obrigado por usar nosso Banco"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

//creat an account
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolher o nosso Banco"));
  console.log(chalk.green("Defina as Opções da sua cotna a seguir"));

  buildAccount();
  operation();
}

function buildAccount() {
  inquirer
    .prompt([{ name: "accountName", message: "Digite o nome da sua conta:" }])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.info(accountName);
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta já existe, escolha outro nome")
        );
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        `{"balance":0}`,
        function (err) {
          console.log(err);
        }
      );
      console.log(chalk.bgGreen.black("Conta criada com sucesso"));
      operation();
    })
    .catch((err) => console.log(err));
}

// add an amount to the account
function deposit() {
  inquirer
    .prompt([{ name: "accountName", message: "Qual o nome da sua Conta?" }])
    .then((answer) => {
      const accountName = answer["accountName"];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([{ name: "amount", message: "Qual o valor do depósito?" }])
        .then((answer) => {
          const amount = answer["amount"];

          // add amount to account
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Esta conta não existe"));
    operation();
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const account = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Valor inválido"));
    return deposit();
  }

  console.log(account);
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.bgGreen.black(
      `Depósito no valor de R$${amount} realizado com sucesso`
    )
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

// show account balance
function getAccountBalance() {
  inquirer
    .prompt([{ name: "accountName", message: "Qual o nome da sua conta?" }])
    .then((answer) => {
      const accountName = answer["accountName"];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }
      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(`O saldo da sua conta é R$${accountData.balance}`)
      );
      operation();
    })
    .catch((err) => console.log(err));
}

//get an amount from user account
function withdraw() {
  inquirer
    .prompt([{ name: "accountName", message: "Qual o nome da sua conta?" }])
    .then((answer) => {
      answer["accountName"];
      if (!checkAccount(accountName)) {
        return withdraw();
      }
      inquirer
        .prompt([{ name: "amount", message: "Qual o valor do saque?" }])
        .then((answer) => {
          const amount = answer["amount"];

          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("Valor inválido"));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Saldo insuficiente"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.bgGreen.black(`Saque no valor de R$${amount} realizado com sucesso`)
  );
  operation();
}
