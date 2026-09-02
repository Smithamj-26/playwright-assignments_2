// Functions.js
// Run: node Functions.js
// Simple functions examples: add two numbers, square of a number, check even

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

// Basic functions
function addTwoNumbers(a, b) {
  return a + b;
}

function squareNumber(n) {
  return n * n;
}

function isEvenNumber(n) {
  // Handles integers; non-integers are considered not even
  if (!Number.isInteger(n)) return false;
  return n % 2 === 0;
}

async function menu() {
  console.log('Functions (Methods) — JS examples');
  console.log('1) Add two numbers');
  console.log('2) Square of a number');
  console.log('3) Check whether a number is even');
  console.log('4) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-4): ')).trim();
    try {
      if (choice === '1') {
        const aInput = await ask('Enter first number: ');
        const bInput = await ask('Enter second number: ');
        const a = Number(aInput);
        const b = Number(bInput);
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
          console.log('Please enter valid numbers.');
        } else {
          console.log(`${a} + ${b} = ${addTwoNumbers(a, b)}`);
        }
      } else if (choice === '2') {
        const nInput = await ask('Enter a number to square: ');
        const n = Number(nInput);
        if (!Number.isFinite(n)) console.log('Enter a valid number.');
        else console.log(`${n}^2 = ${squareNumber(n)}`);
      } else if (choice === '3') {
        const nInput = await ask('Enter an integer to check even: ');
        const n = Number(nInput);
        if (!Number.isFinite(n) || !Number.isInteger(n)) {
          console.log('Enter a valid integer. Non-integers are treated as not even.');
        }
        console.log(`${n} is ${isEvenNumber(n) ? 'even' : 'not even'}`);
      } else if (choice === '4') {
        console.log('Goodbye');
        rl.close();
        break;
      } else {
        console.log('Invalid choice. Choose 1-4.');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
    }
  }
}

menu();
