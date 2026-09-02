// Constructors.js
// Run: node Constructors.js
// Demonstrates constructor-based initialization vs setter-based initialization

class StudentWithConstructor {
  constructor(name, roll, age) {
    if (!name) throw new Error('Name is required');
    if (!Number.isInteger(roll)) throw new Error('Roll must be an integer');
    this.name = name;
    this.roll = roll;
    this.age = (age === undefined || age === null) ? null : age;
    // freeze to prevent accidental modification (optional)
    // Object.freeze(this);
  }

  display() {
    console.log(`StudentWithConstructor { name: ${this.name}, roll: ${this.roll}, age: ${this.age} }`);
  }
}

class StudentWithSetters {
  constructor() {
    // no initialization enforced here
    this.name = null;
    this.roll = null;
    this.age = null;
  }

  setName(name) {
    if (!name) throw new Error('Name is required');
    this.name = name;
  }

  setRoll(roll) {
    if (!Number.isInteger(roll)) throw new Error('Roll must be an integer');
    this.roll = roll;
  }

  setAge(age) {
    this.age = age;
  }

  display() {
    console.log(`StudentWithSetters { name: ${this.name}, roll: ${this.roll}, age: ${this.age} }`);
  }
}

// Demo: constructor-based initialization
console.log('--- Constructor-based initialization ---');
try {
  const s1 = new StudentWithConstructor('Alice', 1, 20);
  s1.display();
  // Attempting to create without required values will throw
  try {
    // Uncomment to see the validation in action:
    // const bad = new StudentWithConstructor(null, 2);
  } catch (err) {
    console.log('Constructor validation caught:', err.message);
  }
} catch (err) {
  console.error('Error creating StudentWithConstructor:', err.message);
}

// Demo: setter-based initialization
console.log('\n--- Setter-based initialization ---');
const s2 = new StudentWithSetters();
// object exists now but fields are not set
s2.display();
// set fields later
try {
  s2.setName('Bob');
  s2.setRoll(2);
  s2.setAge(21);
  s2.display();
} catch (err) {
  console.error('Error using setters:', err.message);
}

// Comparison and discussion printed to console
console.log('\n--- Comparison: constructor vs setters ---');
console.log('- Constructor: enforces required fields at creation time. Good for making fully-initialized immutable objects and catching errors early.');
console.log('- Setters: allow incremental initialization and mutation after creation. Useful when information becomes available later or for optional properties.');
console.log('- Validation: both approaches can validate. Constructor centralizes validation at creation; setters validate per-field.');
console.log('- Immutability: constructors pair well with Object.freeze / private fields to create immutable instances. Setters imply mutability.');
console.log('- Readability: constructor signatures show required parameters clearly; setters are more flexible but can be less obvious to callers.');
console.log('\nExample trade-offs:');
console.log('1) If object must always have name and roll, prefer constructor enforcement.');
console.log('2) If object is built over time (e.g., form input across steps), setters or a builder pattern are more convenient.');
console.log('3) For complex construction, consider a static factory method or a Builder class to combine both safety and flexibility.');

// Small example: Using a builder-like pattern with chaining (optional)
class StudentBuilder {
  constructor() { this._data = {}; }
  name(v) { this._data.name = v; return this; }
  roll(v) { this._data.roll = v; return this; }
  age(v) { this._data.age = v; return this; }
  build() {
    // validate before creating
    return new StudentWithConstructor(this._data.name, this._data.roll, this._data.age);
  }
}

console.log('\n--- Builder pattern example (chaining + validation at build) ---');
try {
  const built = new StudentBuilder().name('Carol').roll(3).age(19).build();
  built.display();
} catch (err) {
  console.error('Builder error:', err.message);
}

console.log('\nDone.');
