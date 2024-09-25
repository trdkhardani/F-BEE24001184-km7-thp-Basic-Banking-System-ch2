import psp from "prompt-sync-plus";
import BankAccount from "./bank_account.js";

const prompt = psp();
class BankingSystem extends BankAccount {
  constructor(balance) {
    super(balance);
    // this.pin = pin;
  }

  deposit(amount) {
    return new Promise((resolve, reject) => {
      console.log("Please wait...");

      if (isNaN(amount)) {
        setTimeout(() => {
          console.log("Not a number");
          reject("The entered amount is not a number");
        }, 1000);
      }

      setTimeout(() => {
        super.deposit(amount);
        const message = `Successfully deposit ${amount} Your Balance: ${this.balance}`;
        resolve(message);
      }, 1000);
    });
  }

  withdraw(amount) {
    amount = Number(prompt("Balance to Withdraw: "));
    super.withdraw(amount);
  }
}

let bankSystem = new BankingSystem(0);

async function deposit() {
  try {
    let amount = Number(prompt("Money to Deposit: "));
    const deposit = await bankSystem.deposit(amount);
    console.log(deposit);
    option();
  } catch (err) {
    console.log(`Err: ${err}`);
  }
}

const exit = () => {
    console.log("\n Bye, don't forget your card!")
    process.exit(0);
}

function option() {
  setTimeout(() => {
    let choice = prompt(`\n Saldo saat ini: Rp${bankSystem.balance},00
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

// while (true) {
//   // let amount = await rl.question("Money to Deposit: ")
//   let amount = Number(prompt("Money to Deposit: "));
//   bal.deposit(amount);
//   console.log(bal.balance);
// }

// let bal = 0;

// let bankSystem = new BankAccount(bal);

// bankSystem.deposit(1000)
// bankSystem.deposit(2000)
// bankSystem.withdraw(500)
// console.log(bankSystem.balance);
