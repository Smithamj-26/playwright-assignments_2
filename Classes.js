// Classes.js
// Run: node Classes.js
// Demonstrates a Student class with attributes and methods, and instantiating multiple objects

class Student {
  static count = 0; // tracks number of Student instances

  constructor(name, roll, age = null, marks = []) {
    this.name = name || 'Unnamed';
    this.roll = roll || 0;
    this.age = age;
    this.marks = Array.isArray(marks) ? marks.slice() : [];
    Student.count += 1;
  }

  // Instance method: display student details
  displayDetails() {
    console.log(`Name: ${this.name}`);
    console.log(`Roll: ${this.roll}`);
    if (this.age !== null) console.log(`Age: ${this.age}`);
    console.log(`Marks: ${this.marks.length ? this.marks.join(', ') : 'No marks'}`);
  }

  // Instance method: add a mark
  addMark(mark) {
    if (typeof mark === 'number' && Number.isFinite(mark)) {
      this.marks.push(mark);
    } else {
      throw new Error('Mark must be a finite number');
    }
  }

  // Instance method: compute average of marks
  averageMark() {
    if (!this.marks.length) return 0;
    const sum = this.marks.reduce((a, b) => a + b, 0);
    return sum / this.marks.length;
  }

  // Instance method: get grade based on average (simple scale)
  grade() {
    const avg = this.averageMark();
    if (this.marks.length === 0) return 'N/A';
    if (avg >= 90) return 'A+';
    if (avg >= 80) return 'A';
    if (avg >= 70) return 'B';
    if (avg >= 60) return 'C';
    if (avg >= 50) return 'D';
    return 'F';
  }

  // Static method: return number of Student instances
  static getCount() {
    return Student.count;
  }
}

// Simple demo when run directly: interactive menu
if (require.main === module) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = q => new Promise(resolve => rl.question(q, ans => resolve(ans)));

  const students = [];

  // helper: create sample students quickly
  function createSampleStudents() {
    students.push(new Student('Alice', 1, 18, [85, 92, 78]));
    students.push(new Student('Bob', 2, 19, [72, 68, 74]));
    students.push(new Student('Charlie', 3, 17, [95, 90, 93]));
  }

  async function menu() {
    console.log('Basic OOP — Student class examples');
    console.log('1) Create a Student');
    console.log('2) List all Students');
    console.log('3) Add mark to a Student');
    console.log('4) Show Student details and grade');
    console.log('5) Create sample students (3)');
    console.log('6) Show total Student instances (static)');
    console.log('7) Exit');

    while (true) {
      const choice = (await ask('\nChoose an option (1-7): ')).trim();
      try {
        if (choice === '1') {
          const name = (await ask('Name: ')).trim() || undefined;
          const rollIn = await ask('Roll (integer): ');
          const roll = Number(rollIn);
          const ageIn = await ask('Age (optional): ');
          const age = ageIn.trim() ? Number(ageIn) : null;
          if (!Number.isFinite(roll) || !Number.isInteger(roll)) {
            console.log('Roll must be an integer. Student not created.');
            continue;
          }
          const s = new Student(name, roll, Number.isFinite(age) ? age : null, []);
          students.push(s);
          console.log('Student created.');
        } else if (choice === '2') {
          if (students.length === 0) console.log('No students available.');
          else {
            students.forEach((s, i) => {
              console.log(`\n[${i}] ${s.name} (Roll: ${s.roll})`);
            });
          }
        } else if (choice === '3') {
          const idxIn = await ask('Student index (see List option): ');
          const idx = Number(idxIn);
          if (!Number.isFinite(idx) || !Number.isInteger(idx) || idx < 0 || idx >= students.length) {
            console.log('Invalid index.');
            continue;
          }
          const markIn = await ask('Enter mark (number): ');
          const mark = Number(markIn);
          try {
            students[idx].addMark(mark);
            console.log('Mark added.');
          } catch (err) {
            console.log('Error adding mark:', err.message);
          }
        } else if (choice === '4') {
          const idxIn = await ask('Student index: ');
          const idx = Number(idxIn);
          if (!Number.isFinite(idx) || !Number.isInteger(idx) || idx < 0 || idx >= students.length) {
            console.log('Invalid index.');
            continue;
          }
          const s = students[idx];
          console.log('--- Student Details ---');
          s.displayDetails();
          console.log(`Average: ${s.averageMark()}`);
          console.log(`Grade: ${s.grade()}`);
        } else if (choice === '5') {
          createSampleStudents();
          console.log('Sample students created.');
        } else if (choice === '6') {
          console.log(`Total Student instances: ${Student.getCount()}`);
        } else if (choice === '7') {
          console.log('Exiting.');
          rl.close();
          break;
        } else {
          console.log('Invalid choice. Enter 1-7.');
        }
      } catch (err) {
        console.error('Error:', err.message || err);
      }
    }
  }

  menu();
}

module.exports = { Student };
