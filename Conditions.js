// Conditions.js
// Run: node Conditions.js
// Interactive menu for:
// 1) Check leap year
// 2) Determine student's grade from marks
// 3) Simple calculator (switch-case)
// 4) Check positive / negative / zero
// 5) Largest of three numbers

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

// 1. Check if a year is a leap year
function isLeapYear(year) {
  // Leap year if divisible by 4 but not by 100, unless divisible by 400
  if (!Number.isInteger(year)) return false;
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  return year % 400 === 0;
}

// 2. Determine grade based on marks (percentage 0-100)
function gradeFromMarks(marks) {
  if (isNaN(marks) || marks < 0 || marks > 100) return null;
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  if (marks >= 35) return 'E';
  return 'F';
}

// 3. Simple calculator using switch-case
function simpleCalculator(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    case '%':
      if (b === 0) throw new Error('Modulo by zero');
      return a % b;
    case '^': // power
      return Math.pow(a, b);
    default:
      throw new Error('Unsupported operator');
  }
}

// 4. Check positive, negative or zero
function signOfNumber(n) {
  if (n > 0) return 'positive';
  if (n < 0) return 'negative';
  return 'zero';
}

// 5. Largest of three numbers
function largestOfThree(a, b, c) {
  return Math.max(a, b, c);
}

async function menu() {
  console.log('Conditions — JS examples');
  console.log('1) Check leap year');
  console.log('2) Determine student grade from marks');
  console.log('3) Simple calculator (switch-case)');
  console.log('4) Check positive/negative/zero');
  console.log('5) Largest of three numbers');
  console.log('6) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-6): ')).trim();
    try {
      if (choice === '1') {
        const yInput = await ask('Enter year (e.g. 2024): ');
        const y = Number(yInput);
        if (!Number.isFinite(y) || !Number.isInteger(y)) {
          console.log('Please enter a valid integer year.');
        } else {
          console.log(`${y} is ${isLeapYear(y) ? '' : 'not '}a leap year.`);
        }
      } else if (choice === '2') {
        const mInput = await ask('Enter marks (0-100): ');
        const m = Number(mInput);
        const g = gradeFromMarks(m);
        if (g === null) console.log('Invalid marks. Enter a number between 0 and 100.');
        else console.log(`Marks: ${m} => Grade: ${g}`);
      } else if (choice === '3') {
        const aInput = await ask('Enter first number: ');
        const bInput = await ask('Enter second number: ');
        const op = (await ask("Enter operator (+, -, *, /, %, ^ for power): ")).trim();
        const a = Number(aInput);
        const b = Number(bInput);
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
          console.log('Please enter valid numbers.');
        } else {
          try {
            const res = simpleCalculator(a, b, op);
            console.log(`${a} ${op} ${b} = ${res}`);
          } catch (err) {
            console.log('Error:', err.message);
          }
        }
      } else if (choice === '4') {
        const nInput = await ask('Enter a number: ');
        const n = Number(nInput);
        if (!Number.isFinite(n)) console.log('Enter a valid number.');
        else console.log(`${n} is ${signOfNumber(n)}.`);
      } else if (choice === '5') {
        const aInput = await ask('Enter first number: ');
        const bInput = await ask('Enter second number: ');
        const cInput = await ask('Enter third number: ');
        const a = Number(aInput);
        const b = Number(bInput);
        const c = Number(cInput);
        if (![a, b, c].every(Number.isFinite)) console.log('Enter three valid numbers.');
        else console.log(`Largest is: ${largestOfThree(a, b, c)}`);
      } else if (choice === '6') {
        console.log('Exiting.');
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
