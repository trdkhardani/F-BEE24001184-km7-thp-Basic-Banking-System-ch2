import BankingSystem from "./banking_system.js";
import { formatter } from "./config.js";
import promptSync from "prompt-sync";

const prompt = promptSync();

class BankingOperations extends BankingSystem {
  constructor(balance) {
    super(balance);
  }

  async deposit() {
    try {
      let amount = Number(prompt("Amount to Deposit: "));

      const deposit = await super.deposit(amount);
      console.log(deposit);

      this.option();
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  async withdraw() {
    try {
      let amount = Number(prompt("Amount to withdraw: "));

      const withdraw = await super.withdraw(amount);
      console.log(withdraw);

      this.option();
    } catch (err) {
      console.log(`Error: ${err}`);
      this.option(); // proceed to option() when error
    }
  }

  exit = () => {
    console.log("\n Bye, don't forget your card!");
    process.exit(0);
  };

  option() {
    setTimeout(() => {
      console.log(` \n
        1. Deposit
        2. Withdraw
        3. Exit
        Current Balance: ${formatter.format(this.balance)}
        `);
      let choice = prompt("Choice: ");
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
          console.log(
            "Please enter 1 (to deposit), 2 (to withdraw), or 3 (to exit)"
          );
          this.option();
      }
    }, 1000);
  }
}

export default BankingOperations;