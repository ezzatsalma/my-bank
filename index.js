#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// bank class
class BankAccount {
    accountNo;
    balance;
    constructor(accountno, balance) {
        this.accountNo = accountno;
        this.balance = balance;
    }
    //debit
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} succesful,Remaining balance is $${this.balance}`);
        }
        else {
            console.log('insufficient balance');
        }
    }
    //credit money
    debit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`deposit of $${amount},remaining balnce:$${this.balance}`);
    }
    //check balance
    checkbalance() {
        console.log(`current balance $${this.balance}`);
    }
}
class customer {
    firstname;
    lastname;
    gender;
    age;
    mobileno;
    account;
    constructor(firstname, lastname, gender, age, mobileno, account) {
        this.firstname = firstname;
        this.lastname = firstname;
        this.gender = gender;
        this.age = age;
        this.mobileno = mobileno;
        this.account = account;
    }
}
//create  bank accoounts
const accounts = [
    new BankAccount(101, 500),
    new BankAccount(102, 1000),
    new BankAccount(103, 2000)
];
//create customers
const customers = [
    new customer("hamdan", "khan", "male", 30, "0300-9876543", accounts[0]),
    new customer("sara", "hamid", "female", 30, "0300-9876543", accounts[1]),
    new customer("hadi", "khan", "male", 56, "0300-6578940", accounts[2]),
]; // function to interact w bank account
async function service() {
    do {
        const accountnumberinput = await inquirer.prompt({
            name: "accounts",
            type: "number",
            message: "enter account number"
        });
        const customer = customers.find(customer => customer.account.accountNo === accountnumberinput.accounts);
        if (customer) {
            console.log(`Welcome ${customer.firstname}`);
            const opt = await inquirer.prompt({
                name: "choice",
                type: "list",
                choices: ["withdraw", "debit", "check balance", 'exit'],
                message: "choose one"
            });
            switch (opt.choice) {
                case "debit":
                    const amount = await inquirer.prompt({
                        name: "amt",
                        type: "input",
                        message: "enter amount to be deposited"
                    });
                    customer.account.debit(amount.amt);
                    break;
                case "withdraw":
                    const amt = await inquirer.prompt({
                        name: 'amount',
                        type: "input",
                        message: "enter amount to withdraw"
                    });
                    customer.account.withdraw(amt.amount);
                    break;
                case "check balance":
                    customer.account.checkbalance();
                    break;
                case "exit":
                    console.log('exiting.....');
                    console.log(`${chalk.bold.greenBright('thanks for trusting us...../n have a nice day!')}`);
                    return;
            }
        }
        else {
            console.log('invalid input');
        }
    } while (true);
}
service();
