import psp from "prompt-sync-plus";
import BankAccount from "./bank_account.js";

const prompt = psp();
class BankingSystem extends BankAccount {
  constructor(balance) {
    super(balance);
    // this.pin = pin;
  }

  deposit(amount) {
    return new Promise((resolve) => {
      console.log("Please wait...");

      setTimeout(() => {
        super.deposit(amount);
        const message = `Successfully deposit ${amount} Your Balance: ${this.balance}`;
        resolve(message);
        // deposit();
      }, 1000);
    });
  }

  withdraw(amount) {
    return new Promise((resolve, reject) => {
      console.log("Please wait...");

      if (this.balance <= 0) { // operasi super.withdraw() belum dijalankan, jadinya ya selama saldonya masih ada, bisa ngabmil lebih dari saldo
        setTimeout(() => {
          reject("You don't have moneh");
        }, 1000);
        return option();
      }

      setTimeout(() => {
        super.withdraw(amount);
        const message = `Successfully withdraw ${amount} Your Balance: ${this.balance}`;
        resolve(message);
        // deposit();
      }, 1000);
    });
  }
}

let bankSystem = new BankingSystem(0);

async function deposit() {
  try {
    let amount = Number(prompt("Money to Deposit: "));

    while (isNaN(amount)) {
      console.log("The entered amount is not a number");
      amount = Number(prompt("Money to Deposit: "));
    }

    const deposit = await bankSystem.deposit(amount);
    console.log(deposit);

    option();
  } catch (err) {
    console.log(`Error: ${err}`);
    // deposit();
  }
}

async function withdraw() {
  try {
    let amount = Number(prompt("Money to withdraw: "));

    while (isNaN(amount)) {
      console.log("The entered amount is not a number");
      amount = Number(prompt("Money to withdraw: "));
    }

    const withdraw = await bankSystem.withdraw(amount);
    
    console.log(withdraw);

    option();
  } catch (err) {
    console.log(`Error: ${err}`);
    // deposit();
  }
}

const exit = () => {
  console.log("\n Bye, don't forget your card!");
  process.exit(0);
};

function option() {
  setTimeout(() => {
    let choice = prompt(`\n Current Balance: Rp${bankSystem.balance},00
            1. Deposit
            2. Withdraw
            3. Exit`);
    switch (choice) {
      case "1":
        deposit();
        break;
      case "2":
        withdraw();
        break;
      case "3":
        exit();
      default:
        console.log(
          "Masukkan angka 1 (tambah saldo), 2 (kurangi saldo), atau 3 (keluar)"
        );
        option();
    }
  }, 1000);
}

option();
