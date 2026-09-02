// Loops.js
// Run: node Loops.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

// 1. Print numbers from 1 to N using a loop.
function printOneToN(n) {
  if (n < 1) {
    console.log('N should be >= 1');
    return;
  }
  let out = [];
  for (let i = 1; i <= n; i++) out.push(i);
  console.log(out.join(' '));
}

// 2. Find the sum of first N natural numbers.
function sumFirstN(n) {
  if (n < 1) return 0;
  // formula
  return n * (n + 1) / 2;
}

// 3. Print multiplication table of a given number (default 1..10).
function multiplicationTable(x, upto = 10) {
  for (let i = 1; i <= upto; i++) {
    console.log(`${x} x ${i} = ${x * i}`);
  }
}

// 4. Reverse a number.
function reverseNumber(num) {
  // preserve sign
  const sign = num < 0 ? -1 : 1;
  const s = String(Math.abs(num));
  const rev = s.split('').reverse().join('');
  // return as number if possible, otherwise BigInt for very large strings
  if (rev.length <= 15) return sign * Number(rev);
  return sign * BigInt(rev);
}

// 5. Check whether a number is a palindrome.
function isPalindromeNumber(num) {
  const s = String(num);
  const rs = s.split('').reverse().join('');
  return s === rs;
}

// 6. Find factorial of a number.
function factorial(n) {
  if (n < 0) throw new Error('Factorial not defined for negative numbers');
  // Use BigInt for safety
  let res = BigInt(1);
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

// 7. Generate Fibonacci series up to N terms.
function fibonacciTerms(n) {
  const out = [];
  if (n <= 0) return out;
  if (n >= 1) out.push(0);
  if (n >= 2) out.push(1);
  let a = 0, b = 1;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    out.push(c);
    a = b;
    b = c;
  }
  return out;
}

// 8. Check primes for a set of numbers.
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0) return false;
  const limit = Math.floor(Math.sqrt(num));
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

async function menu() {
  console.log('Loops & Basic Number Algorithms — JS examples');
  console.log('1) Print numbers 1..N');
  console.log('2) Sum of first N natural numbers');
  console.log('3) Multiplication table');
  console.log('4) Reverse a number');
  console.log('5) Check palindrome');
  console.log('6) Factorial');
  console.log('7) Fibonacci series (N terms)');
  console.log('8) Prime check for a set of numbers');
  console.log('9) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-9): ')).trim();
    try {
      if (choice === '1') {
        const n = Number(await ask('Enter N (positive integer): '));
        printOneToN(n);
      } else if (choice === '2') {
        const n = Number(await ask('Enter N (positive integer): '));
        console.log(`Sum of first ${n} natural numbers = ${sumFirstN(n)}`);
      } else if (choice === '3') {
        const x = Number(await ask('Enter the number for table: '));
        const uptoInput = await ask('Upto (default 10): ');
        const upto = uptoInput.trim() ? Number(uptoInput) : 10;
        multiplicationTable(x, upto);
      } else if (choice === '4') {
        const input = await ask('Enter an integer to reverse: ');
        const num = input.includes('.') ? Number(input) : BigInt(input);
        // convert BigInt to string for reverseNumber if needed
        const reversed = reverseNumber(Number(input));
        console.log(`Reversed: ${reversed}`);
      } else if (choice === '5') {
        const input = await ask('Enter a number to check palindrome: ');
        // treat the whole input string (so leading zeros considered)
        const isPal = input === input.split('').reverse().join('');
        console.log(isPal ? 'Palindrome' : 'Not a palindrome');
      } else if (choice === '6') {
        const n = Number(await ask('Enter N (non-negative integer): '));
        const f = factorial(n);
        console.log(`${n}! = ${f.toString()}`);
      } else if (choice === '7') {
        const n = Number(await ask('Enter number of terms N (positive integer): '));
        console.log(fibonacciTerms(n).join(' '));
      } else if (choice === '8') {
        const line = await ask('Enter numbers separated by space: ');
        const parts = line.trim().split(/\s+/).filter(Boolean);
        const nums = parts.map(p => Number(p));
        for (let x of nums) {
          if (!Number.isFinite(x) || !Number.isInteger(x)) {
            console.log(`${x} -> not an integer`);
          } else {
            console.log(`${x} -> ${isPrime(x) ? 'prime' : 'not prime'}`);
          }
        }
      } else if (choice === '9') {
        console.log('Goodbye');
        rl.close();
        break;
      } else {
        console.log('Invalid choice, choose 1-9.');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
    }
  }
}

menu();
