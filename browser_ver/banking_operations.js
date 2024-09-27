import BankingSystem from "./banking_system.js";
import { formatter } from "./config.js";

class BankingOperations extends BankingSystem {
  constructor(balance) {
    super(balance);
  }

  async deposit() {
    try {
      let amount = Number(window.prompt("Amount to Deposit: "));

      const deposit = await super.deposit(amount);
      alert(deposit);

      this.option();
    } catch (err) {
      alert(`Error: ${err}`);
    }
  }

  async withdraw() {
    try {
      let amount = Number(window.prompt("Amount to withdraw: "));

      const withdraw = await super.withdraw(amount);
      alert(withdraw);

      this.option();
    } catch (err) {
      alert(`Error: ${err}`);
      this.option(); // proceed to option() when error
    }
  }

  exit = () => {
    alert("\n Bye, don't forget your card!");
    return;
  };

  option() {
    setTimeout(() => {
      let choice = window.prompt(` \n
        1. Deposit
        2. Withdraw
        3. Exit
        Current Balance: ${formatter.format(this.balance)}
        `);
      switch (choice) {
        case "1":
          this.deposit();
          break;
        case "2":
          this.withdraw();
          break;
        case "3":
          this.exit();
          break;
        default:
          alert(
            "Please enter 1 (to deposit), 2 (to withdraw), or 3 (to exit)"
          );
          this.option();
      }
    }, 1000);
  }
}

export default BankingOperations;