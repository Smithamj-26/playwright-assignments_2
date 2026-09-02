// Encapsulation.js
// Run: node Encapsulation.js
// Demonstrates:
// 1) Private variables accessed via getters/setters (using JS private fields)
// 2) BankAccount class with deposit and withdraw methods
// 3) Validation to prevent invalid data entry

class Person {
  #name;
  #age;

  constructor(name, age) {
    // Use setters so validation is centralized
    this.name = name;
    this.age = age;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error('Name must be a non-empty string');
    }
    this.#name = value.trim();
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error('Age must be a non-negative integer');
    }
    this.#age = value;
  }

  toString() {
    return `Person { name: ${this.#name}, age: ${this.#age} }`;
  }
}

class BankAccount {
  #owner;          // Person or string
  #accountNumber;  // string
  #balance;        // number (non-negative)

  constructor(owner, accountNumber, initialBalance = 0) {
    // basic validation
    if (!owner) throw new Error('Owner is required');
    if (typeof accountNumber !== 'string' || !/^[A-Za-z0-9\-]{4,}$/.test(accountNumber)) {
      throw new Error('Invalid account number (minimum 4 alphanumeric chars)');
    }
    if (!BankAccount.#isValidAmount(initialBalance, { allowZero: true })) {
      throw new Error('Initial balance must be a non-negative number');
    }

    this.#owner = owner;
    this.#accountNumber = accountNumber;
    this.#balance = Number(initialBalance);
  }

  // Private static helper for amount validation
  static #isValidAmount(amount, { allowZero = false } = {}) {
    if (!Number.isFinite(amount)) return false;
    if (amount < 0) return false;
    if (!allowZero && amount === 0) return false;
    return true;
  }

  // Public getter for balance (read-only)
  get balance() {
    return this.#balance;
  }

  // Public getter for owner (returns name if Person provided)
  get owner() {
    if (this.#owner && typeof this.#owner === 'object' && 'name' in this.#owner) {
      return this.#owner.name;
    }
    return String(this.#owner);
  }

  // Public method to deposit money; validates input
  deposit(amount) {
    if (!BankAccount.#isValidAmount(amount, { allowZero: false })) {
      throw new Error('Deposit amount must be a positive number');
    }
    this.#balance += Number(amount);
    return this.#balance;
  }

  // Public method to withdraw money; validates and prevents overdraft
  withdraw(amount) {
    if (!BankAccount.#isValidAmount(amount, { allowZero: false })) {
      throw new Error('Withdrawal amount must be a positive number');
    }
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= Number(amount);
    return this.#balance;
  }

  // Optional: mask account number for display
  getMaskedAccountNumber() {
    const s = String(this.#accountNumber);
    if (s.length <= 4) return s.replace(/.(?=.$)/g, '*');
    const last4 = s.slice(-4);
    return '****' + last4;
  }

  toString() {
    return `BankAccount { owner: ${this.owner}, account: ${this.getMaskedAccountNumber()}, balance: ${this.#balance} }`;
  }
}

// Demo / tests when run directly
if (require.main === module) {
  console.log('Encapsulation demo');

  // Person demo
  try {
    const p = new Person('Alice', 30);
    console.log(p.toString());

    // Trying invalid name
    try {
      p.name = '';
    } catch (err) {
      console.log('Validation (name):', err.message);
    }

    // Trying invalid age
    try {
      p.age = -5;
    } catch (err) {
      console.log('Validation (age):', err.message);
    }
  } catch (err) {
    console.error('Failed to create Person:', err.message);
  }

  console.log('\n--- BankAccount demo ---');
  try {
    const owner = new Person('Bob', 40);
    const acct = new BankAccount(owner, 'ACCT-12345', 1000);
    console.log(acct.toString());

    console.log('Depositing 500...');
    acct.deposit(500);
    console.log('Balance after deposit:', acct.balance);

    console.log('Withdrawing 300...');
    acct.withdraw(300);
    console.log('Balance after withdrawal:', acct.balance);

    // Try invalid deposit
    try {
      acct.deposit(0);
    } catch (err) {
      console.log('Deposit validation:', err.message);
    }

    // Try overdraft
    try {
      acct.withdraw(10000);
    } catch (err) {
      console.log('Withdrawal validation:', err.message);
    }

    console.log('Final account:', acct.toString());
  } catch (err) {
    console.error('BankAccount error:', err.message);
  }

  console.log('\nDemo complete.');
}

module.exports = { Person, BankAccount };
