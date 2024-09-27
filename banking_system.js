import promptSync from "prompt-sync";
import BankAccount from "./bank_account.js";
import { formatter } from "./config.js";

const prompt = promptSync();

class BankingSystem extends BankAccount {
  constructor(balance) {
    super(balance);
  }

  #validatePositiveNumber(input, transactionType) {
    while (isNaN(input) || input <= 0) { // if number is 0 or below or NaN (string)
      console.log("Invalid amount. Please enter a positive number.");
      input = Number(prompt("Amount to " + transactionType + ": "));
    }
    console.clear();
    return input;
  }

  deposit(amount) {
    amount = this.#validatePositiveNumber(amount, "Deposit");

    console.log("Please wait...");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        super.deposit(amount);
        const message = `Successfully deposit ${formatter.format(
          amount
        )} | Your Balance: ${formatter.format(this.balance)}`;
        resolve(message);
      }, 1000);
    });
  }

  withdraw(amount) {
    amount = this.#validatePositiveNumber(amount, "Withdraw");

    console.log("Please wait...");

    return new Promise((resolve, reject) => {
      if (this.balance <= 0) {
        // check if current balance is 0 or below
        setTimeout(() => {
          reject("You have no balance");
        }, 1000);
        return; // halt program after Promise reject
      }

      let tempBalance = super.withdraw(amount); // temporary variable to save current balance

      if (tempBalance < 0) {
        // check if balance is negative after withdraw
        setTimeout(() => {
          reject("Insufficient Balance");
        }, 1000);
        return; // halt program after Promise reject
      }

      setTimeout(() => {
        this.balance = tempBalance; // if the amount is valid, swap tempBalance with this.balance property
        const message = `Successfully withdraw ${formatter.format(
          amount
        )} | Your Balance: ${formatter.format(this.balance)}`;
        resolve(message);
      }, 1000);
    });
  }
}

export default BankingSystem;
