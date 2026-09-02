// Objects.js
// Run: node Objects.js
// Demonstrates: student object, display object properties, multiple Employee objects, store/display objects using arrays

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function ask(q) { return new Promise(resolve => rl.question(q, a => resolve(a))); }

// 1. Create a student object with a name and roll number.
function createStudent(name = 'John Doe', roll = 1) {
  return { name, roll };
}

// 2. Create an object and display its properties.
function displayObjectProperties(obj) {
  if (obj === null || typeof obj !== 'object') {
    console.log('Not an object');
    return;
  }
  console.log('Object properties:');
  for (const [key, value] of Object.entries(obj)) {
    console.log(`  ${key}: ${value}`);
  }
}

// 3. Create multiple Employee objects.
class Employee {
  constructor(id, name, dept = 'General', salary = 0) {
    this.id = id;
    this.name = name;
    this.department = dept;
    this.salary = salary;
  }
}

function createEmployees(sampleCount = 3) {
  const sample = [
    new Employee(101, 'Alice', 'HR', 50000),
    new Employee(102, 'Bob', 'Engineering', 75000),
    new Employee(103, 'Charlie', 'Sales', 60000)
  ];
  if (sampleCount <= sample.length) return sample.slice(0, sampleCount);
  // generate additional employees if requested
  const out = sample.slice();
  let nextId = 104;
  while (out.length < sampleCount) {
    out.push(new Employee(nextId, `Emp${nextId}`, 'General', 40000 + (out.length * 2000)));
    nextId++;
  }
  return out;
}

// 4. Store and display object details using arrays.
function storeObjectsInArray(objs) {
  const arr = Array.isArray(objs) ? objs.slice() : [objs];
  return arr;
}

function displayObjectsArray(arr) {
  if (!Array.isArray(arr)) {
    console.log('Not an array');
    return;
  }
  console.log(`Displaying ${arr.length} object(s):`);
  arr.forEach((o, idx) => {
    console.log(`- Object #${idx + 1}:`);
    displayObjectProperties(o);
  });
}

async function menu() {
  console.log('Objects — JS examples');
  console.log('1) Create a student object and display it');
  console.log('2) Create an object and display its properties');
  console.log('3) Create multiple Employee objects');
  console.log('4) Store and display object details using arrays');
  console.log('5) Exit');

  while (true) {
    const choice = (await ask('\nChoose an option (1-5): ')).trim();
    try {
      if (choice === '1') {
        const name = await ask('Enter student name (default John Doe): ');
        const rollInput = await ask('Enter roll number (default 1): ');
        const roll = rollInput.trim() ? Number(rollInput) : 1;
        const student = createStudent(name.trim() || undefined, Number.isFinite(roll) ? roll : 1);
        console.log('Student object:');
        displayObjectProperties(student);
      } else if (choice === '2') {
        const raw = await ask('Enter object as JSON (e.g. {"a":1,"b":"x"}): ');
        try {
          const obj = JSON.parse(raw);
          displayObjectProperties(obj);
        } catch (err) {
          console.log('Invalid JSON:', err.message);
        }
      } else if (choice === '3') {
        const countInput = await ask('How many employees to create (default 3): ');
        const count = countInput.trim() ? Number(countInput) : 3;
        if (!Number.isFinite(count) || count <= 0) {
          console.log('Enter a positive integer.');
        } else {
          const emps = createEmployees(Math.floor(count));
          console.log(`Created ${emps.length} employee(s):`);
          displayObjectsArray(emps);
        }
      } else if (choice === '4') {
        console.log('You can create objects (student or employees) and store them in an array.');
        const choice2 = (await ask('Add (s)tudent or (e)mployees or (j)son object? (s/e/j): ')).trim().toLowerCase();
        let objs = [];
        if (choice2 === 's') {
          const name = await ask('Student name: ');
          const rollInput = await ask('Roll number: ');
          const roll = Number(rollInput);
          objs = storeObjectsInArray(createStudent(name || undefined, Number.isFinite(roll) ? roll : 1));
        } else if (choice2 === 'e') {
          const countInput = await ask('How many employees to add: ');
          const count = Number(countInput) || 3;
          objs = storeObjectsInArray(createEmployees(Math.floor(count)));
        } else if (choice2 === 'j') {
          const raw = await ask('Enter JSON array of objects (e.g. [{"x":1}, {"y":2}]): ');
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) objs = storeObjectsInArray(parsed);
            else objs = storeObjectsInArray(parsed);
          } catch (err) {
            console.log('Invalid JSON. Aborting.');
            continue;
          }
        } else {
          console.log('Unknown option.');
          continue;
        }
        displayObjectsArray(objs);
      } else if (choice === '5') {
        console.log('Exiting.');
        rl.close();
        break;
      } else {
        console.log('Invalid choice. Enter 1-5.');
      }
    } catch (err) {
      console.error('Error:', err.message || err);
    }
  }
}

menu();
