// const prompt = require("prompt-sync")();

class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
    this.balance = this.balance + amount
  }

  withdraw(amount) {
    this.balance = this.balance - amount
  }
}

export default BankAccount;

// let bal = new BankAccount()

// let amount = Number(prompt("Enter amount: "))

// bal.deposit(amount)
// console.log(bal.balance);