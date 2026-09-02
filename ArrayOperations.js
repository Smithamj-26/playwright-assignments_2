// ArrayOperations.js
// Run: node ArrayOperations.js
// Implements: search element, reverse array, sort ascending,
// remove duplicates, merge two arrays, frequency count, rotate by one position

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function ask(q) { return new Promise(resolve => rl.question(q, a => resolve(a))); }

// Helper: parse input string into array of tokens; try to convert tokens to numbers when appropriate
function parseList(input) {
  if (!input || !input.trim()) return [];
  const parts = input.trim().split(/[,,\s]+/).filter(Boolean);
  return parts.map(p => {
    // detect plain integer/float (including negative)
    if (/^-?\d+(?:\.\d+)?$/.test(p)) return Number(p);
    return p;
  });
}

// 1. Search for an element in an array. Returns indices (may be multiple) or empty array
function searchElement(arr, key) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) results.push(i);
  }
  return results;
}

// 2. Reverse an array (returns a new array)
function reverseArray(arr) {
  return arr.slice().reverse();
}

// 3. Sort an array in ascending order. Numeric when possible, otherwise lexicographic
function sortAscending(arr) {
  const allNumbers = arr.every(x => typeof x === 'number');
  const copy = arr.slice();
  if (allNumbers) return copy.sort((a, b) => a - b);
  return copy.sort();
}

// Advanced Beginner
// 1. Remove duplicate elements from an array (preserve first occurrence order)
function removeDuplicates(arr) {
  const seen = new Set();
  const out = [];
  for (let v of arr) {
    // Convert -0 to 0 for Set consistency
    const key = (v === 0 ? 0 : v);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(v);
    }
  }
  return out;
}

// 2. Merge two arrays
function mergeArrays(a, b) {
  return a.concat(b);
}

// 3. Find the frequency of each element
function frequencyCount(arr) {
  const freq = new Map();
  for (let v of arr) {
    const key = String(v); // map keys as strings to display clearly
    freq.set(key, (freq.get(key) || 0) + 1);
  }
  return Object.fromEntries(freq);
}

// 4. Rotate an array by one position to the right (last element becomes first)
function rotateRightByOne(arr) {
  if (arr.length === 0) return [];
  const copy = arr.slice();
  const last = copy.pop();
  copy.unshift(last);
  return copy;
}

async function menu() {
  console.log('Array Operations — Interactive Examples');
  console.log('1) Search for an element in an array');
  console.log('2) Reverse an array');
  console.log('3) Sort an array in ascending order');
  console.log('4) Remove duplicate elements from an array');
  console.log('5) Merge two arrays');
  console.log('6) Find frequency of each element');
  console.log('7) Rotate an array by one position (right)');
  console.log('8) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-8): ')).trim();
    try {
      if (choice === '1') {
        const input = await ask('Enter array elements (space or comma separated): ');
        const arr = parseList(input);
        const keyInput = await ask('Enter element to search for (exact match): ');
        const key = (/^-?\d+(?:\.\d+)?$/.test(keyInput.trim())) ? Number(keyInput) : keyInput;
        const indices = searchElement(arr, key);
        if (indices.length === 0) console.log('Element not found.');
        else console.log(`Element found at index/indices: ${indices.join(', ')}`);
      } else if (choice === '2') {
        const input = await ask('Enter array elements (space or comma separated): ');
        const arr = parseList(input);
        console.log('Reversed array:', reverseArray(arr));
      } else if (choice === '3') {
        const input = await ask('Enter array elements (space or comma separated): ');
        const arr = parseList(input);
        console.log('Sorted ascending:', sortAscending(arr));
      } else if (choice === '4') {
        const input = await ask('Enter array elements (space or comma separated): ');
        const arr = parseList(input);
        console.log('After removing duplicates:', removeDuplicates(arr));
      } else if (choice === '5') {
        const aInput = await ask('Enter first array elements: ');
        const bInput = await ask('Enter second array elements: ');
        const a = parseList(aInput);
        const b = parseList(bInput);
        console.log('Merged array:', mergeArrays(a, b));
      } else if (choice === '6') {
        const input = await ask('Enter array elements (space or comma separated): ');
        const arr = parseList(input);
        console.log('Frequencies:', frequencyCount(arr));
      } else if (choice === '7') {
        const input = await ask('Enter array elements (space or comma separated): ');
        const arr = parseList(input);
        console.log('Rotated (right by 1):', rotateRightByOne(arr));
      } else if (choice === '8') {
        console.log('Exiting.');
        rl.close();
        break;
      } else {
        console.log('Invalid choice. Enter 1-8.');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
    }
  }
}

menu();
