// import psp from "prompt-sync-plus";
import promptSync from "prompt-sync";
import BankAccount from "./bank_account.js";
const prompt = promptSync();

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 2,
});

const timeOut = 1000;

class BankingSystem extends BankAccount {
  constructor(balance) {
    super(balance);
    // this.pin = pin;
  }

  #validate(input, transactionType) {
    while (isNaN(input)) {
      console.log("The entered amount is not a number");
      input = Number(prompt("Amount to " + transactionType + ": "));
    }
    console.clear();
    return input;
  }

  deposit(amount) {
    console.log("Please wait...");

    amount = this.#validate(amount, "Deposit");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        super.deposit(amount);
        const message = `Successfully deposit ${formatter.format(
          amount
        )} Your Balance: ${formatter.format(this.balance)}`;
        resolve(message);
      }, timeOut);
    });
  }

  withdraw(amount) {
    console.log("Please wait...");

    amount = this.#validate(amount, "Withdraw");

    return new Promise((resolve, reject) => {
      if (this.balance <= 0) {
        // check if current balance is 0 or below
        setTimeout(() => {
          reject("You have no balance");
        }, timeOut);
        return; // continue program after Promise reject
      }

      let tempBalance = super.withdraw(amount); // temporary variable to save current balance

      if (tempBalance < 0) {
        // check if balance is negative after withdraw
        setTimeout(() => {
          reject("Insufficient Balance");
        }, timeOut);
        return; // continue program after Promise reject
      }

      setTimeout(() => {
        this.balance = tempBalance;
        const message = `Successfully withdraw ${formatter.format(
          amount
        )} Your Balance: ${formatter.format(this.balance)}`;
        resolve(message);
        // deposit();
      }, timeOut);
    });
  }
}

let bankSystem = new BankingSystem(0);

async function deposit() {
  try {
    let amount = Number(prompt("Amount to Deposit: "));

    // amount = bankSystem._validate(amount, "Deposit")

    const deposit = await bankSystem.deposit(amount);
    console.log(deposit);

    option();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

async function withdraw() {
  try {
    let amount = Number(prompt("Amount to withdraw: "));

    // amount = bankSystem._validate(amount, "Withdraw");

    const withdraw = await bankSystem.withdraw(amount);
    console.log(withdraw);

    option();
  } catch (err) {
    console.log(`Error: ${err}`);
    option(); // proceed to option() when error
  }
}

const exit = () => {
  console.log("\n Bye, don't forget your card!");
  process.exit(0);
};

export function option() {
  setTimeout(() => {
    console.log(` \n
      1. Deposit
      2. Withdraw
      3. Exit
      Current Balance: ${formatter.format(bankSystem.balance)}
      `);
    let choice = prompt("Choice: ");
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
          "Please enter 1 (to deposit), 2 (to withdraw), or 3 (to exit)"
        );
        option();
    }
  }, timeOut);
}

option();
