class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
        this.balance = this.balance + amount
  }

  withdraw(amount) {
      let tempBalance = this.balance - amount
      return tempBalance; // variable sementara untuk menampung saldo
  }
}

export default BankAccount;

// let bal = new BankAccount()

// let amount = Number(prompt("Enter amount: "))

// bal.deposit(amount)
// console.log(bal.balance);