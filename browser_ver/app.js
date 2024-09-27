import BankingOperations from "./banking_operations.js";

document.addEventListener('DOMContentLoaded', () => {
    const bankOperations = new BankingOperations(0);
    bankOperations.option(); // automatically start the banking operations
    const startButton = document.querySelector('button');
    startButton.addEventListener('click', () => {
        bankOperations.option();
    });
});

