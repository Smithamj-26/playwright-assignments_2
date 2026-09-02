// Arrays.js
// Run: node Arrays.js
// Easy array examples: store & print 5 numbers, largest & smallest, average

const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function ask(q) { return new Promise(resolve => rl.question(q, a => resolve(a))); }

function parseNumberList(input) {
  if (!input || !input.trim()) return [];
  const parts = input.trim().split(/[,\s]+/).filter(Boolean);
  const nums = parts.map(p => Number(p));
  if (!nums.every(Number.isFinite)) return null;
  return nums;
}

function printFiveNumbers(arr) {
  console.log('Stored numbers:', arr.join(' '));
}

function largestAndSmallest(arr) {
  // assumes non-empty numeric array
  let max = arr[0];
  let min = arr[0];
  for (let v of arr) {
    if (v > max) max = v;
    if (v < min) min = v;
  }
  return { max, min };
}

function average(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, v) => acc + v, 0);
  return sum / arr.length;
}

async function menu() {
  console.log('Arrays — Easy examples');
  console.log('1) Store 5 numbers in an array and print them');
  console.log('2) Find largest and smallest element in an array');
  console.log('3) Calculate average of array elements');
  console.log('4) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-4): ')).trim();
    try {
      if (choice === '1') {
        const input = await ask('Enter 5 numbers separated by space or comma (or press Enter to use default 5 numbers): ');
        let nums = parseNumberList(input);
        if (nums === null) {
          console.log('Invalid input. Please enter numbers only.');
        } else if (nums.length === 0) {
          nums = [10, 20, 30, 40, 50];
          console.log('Using default array:');
          printFiveNumbers(nums);
        } else if (nums.length !== 5) {
          console.log('Please enter exactly 5 numbers. You entered', nums.length);
        } else {
          printFiveNumbers(nums);
        }
      } else if (choice === '2') {
        const input = await ask('Enter numbers separated by space or comma: ');
        const nums = parseNumberList(input);
        if (nums === null || nums.length === 0) {
          console.log('Invalid input or empty array. Please enter at least one number.');
        } else {
          const { max, min } = largestAndSmallest(nums);
          console.log(`Largest: ${max}`);
          console.log(`Smallest: ${min}`);
        }
      } else if (choice === '3') {
        const input = await ask('Enter numbers separated by space or comma: ');
        const nums = parseNumberList(input);
        if (nums === null || nums.length === 0) {
          console.log('Invalid input or empty array. Please enter at least one number.');
        } else {
          console.log(`Average = ${average(nums)}`);
        }
      } else if (choice === '4') {
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
