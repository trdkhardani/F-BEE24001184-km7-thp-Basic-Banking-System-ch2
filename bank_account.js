class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  deposit(amount) {
        this.balance = this.balance + amount
  }

  withdraw(amount) {
      let tempBalance = this.balance - amount
      return tempBalance; // temporary variable to save current balance
  }
}

export default BankAccount;