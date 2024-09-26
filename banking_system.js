// import psp from "prompt-sync-plus";
import promptSync from "prompt-sync";
import BankAccount from "./bank_account.js";
const prompt = promptSync();

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 2,
});
class BankingSystem extends BankAccount {
  constructor(balance) {
    super(balance);
    // this.pin = pin;
  }

  deposit(amount) {
    console.log("Please wait...");

    return new Promise((resolve) => {
      setTimeout(() => {
        super.deposit(amount);
        const message = `Successfully deposit ${formatter.format(amount)} Your Balance: ${formatter.format(this.balance)}`;
        resolve(message);
      }, 1000);
    });
  }

  withdraw(amount) {
    console.log("Please wait...");

    return new Promise((resolve, reject) => {
      if (this.balance <= 0) {
        // check if current balance is 0 or below
        setTimeout(() => {
          reject("You have no balance");
        }, 1000);
        return option();
      }

      let tempBalance = super.withdraw(amount); // temporary variable to save current balance

      if (tempBalance < 0) {
        // check if balance is negative after withdraw
        setTimeout(() => {
          reject("Insufficient Balance");
        }, 1000);
        return option();
      }

      setTimeout(() => {
        this.balance = tempBalance;
        const message = `Successfully withdraw ${formatter.format(amount)} Your Balance: ${formatter.format(this.balance)}`;
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
      // check if entered input or amount is NaN. will be looped until the entered input is not NaN
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
      // check if entered input or amount is NaN. will be looped until the entered input is not NaN
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
  }, 1000);
}

option();
