// Intermediate.js
// Run: node Intermediate.js
// Reusable functions: factorial, isPrime, reverseNumber, countVowels, sumArray

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

// Factorial using BigInt for safety
function factorial(n) {
  if (!Number.isInteger(n)) throw new Error('Factorial requires an integer');
  if (n < 0) throw new Error('Factorial not defined for negative numbers');
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

// Prime check for positive integers
function isPrime(n) {
  if (!Number.isInteger(n) || n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// Reverse a number; preserves sign; returns Number when safe, otherwise BigInt
function reverseNumber(num) {
  const sign = num < 0 ? -1 : 1;
  const s = String(Math.abs(num));
  const rev = s.split('').reverse().join('');
  // if result fits in safe integer range, return Number
  if (rev.length <= 15) return sign * Number(rev);
  return sign * BigInt(rev);
}

// Count vowels in a string (both lowercase and uppercase)
function countVowels(str) {
  if (typeof str !== 'string') return 0;
  const matches = str.match(/[aeiouAEIOU]/g);
  return matches ? matches.length : 0;
}

// Sum elements in an array of numbers
function sumArray(arr) {
  return arr.reduce((acc, x) => acc + x, 0);
}

async function menu() {
  console.log('Intermediate — reusable functions examples');
  console.log('1) Factorial (reusable)');
  console.log('2) Prime check (reusable)');
  console.log('3) Reverse a number');
  console.log('4) Count vowels in a string');
  console.log('5) Sum of elements in an array');
  console.log('6) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-6): ')).trim();
    try {
      if (choice === '1') {
        const nInput = await ask('Enter a non-negative integer: ');
        const n = Number(nInput);
        if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) {
          console.log('Please enter a valid non-negative integer.');
        } else {
          console.log(`${n}! = ${factorial(n).toString()}`);
        }
      } else if (choice === '2') {
        const nInput = await ask('Enter an integer to check prime: ');
        const n = Number(nInput);
        if (!Number.isFinite(n) || !Number.isInteger(n)) console.log('Enter a valid integer.');
        else console.log(`${n} is ${isPrime(n) ? 'prime' : 'not prime'}`);
      } else if (choice === '3') {
        const nInput = await ask('Enter an integer to reverse: ');
        // Accept large integers as string but attempt Number conversion for sign
        if (!/^-?\d+$/.test(nInput.trim())) {
          console.log('Please enter a valid integer (digits only).');
        } else {
          const asNum = Number(nInput);
          const rev = reverseNumber(asNum);
          console.log(`Reversed: ${rev.toString()}`);
        }
      } else if (choice === '4') {
        const s = await ask('Enter a string: ');
        console.log(`Vowel count: ${countVowels(s)}`);
      } else if (choice === '5') {
        const line = await ask('Enter numbers separated by space (e.g. 1 2 3.5): ');
        const parts = line.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) {
          console.log('No numbers provided.');
        } else {
          const nums = parts.map(p => Number(p));
          if (!nums.every(Number.isFinite)) {
            console.log('All inputs must be valid numbers.');
          } else {
            console.log(`Sum = ${sumArray(nums)}`);
          }
        }
      } else if (choice === '6') {
        console.log('Goodbye');
        rl.close();
        break;
      } else {
        console.log('Invalid choice. Choose 1-6.');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
    }
  }
}

menu();
