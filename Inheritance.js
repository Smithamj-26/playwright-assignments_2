// Inheritance.js
// Run: node Inheritance.js
// Demonstrates a Vehicle base class and a Car subclass that inherits from it.

class Vehicle {
  constructor(make, model, year) {
    this.make = make || 'Unknown';
    this.model = model || 'Unknown';
    this.year = year || null;
    this.running = false;
  }

  start() {
    this.running = true;
    return `${this.make} ${this.model} started.`;
  }

  stop() {
    this.running = false;
    return `${this.make} ${this.model} stopped.`;
  }

  info() {
    return `Vehicle: ${this.make} ${this.model}` + (this.year ? ` (${this.year})` : '');
  }
}

class Car extends Vehicle {
  constructor(make, model, year, numDoors = 4, fuelType = 'petrol') {
    super(make, model, year); // initialize parent properties
    this.numDoors = numDoors;
    this.fuelType = fuelType;
  }

  // Child-specific method
  openTrunk() {
    return `${this.make} ${this.model} trunk opened.`;
  }

  // Override info to include car-specific details but still reuse parent info
  info() {
    const parentInfo = super.info();
    return `${parentInfo} - ${this.numDoors} doors, ${this.fuelType}`;
  }
}

// Demo when run directly
if (require.main === module) {
  console.log('Inheritance demo: Vehicle -> Car');

  const v = new Vehicle('Generic', 'Mover', 2010);
  console.log(v.info());
  console.log(v.start());
  console.log(`Running? ${v.running}`);
  console.log(v.stop());

  console.log('\n--- Car (subclass) examples ---');
  const car1 = new Car('Toyota', 'Corolla', 2020, 4, 'petrol');
  const car2 = new Car('Tesla', 'Model 3', 2022, 4, 'electric');

  // Access parent properties using child objects
  console.log(car1.info()); // uses overridden info which calls parent info
  console.log('Start car1:', car1.start()); // parent method used by child instance
  console.log('Car1 running:', car1.running);
  console.log('Car1 trunk:', car1.openTrunk()); // child-specific
  console.log(car1.stop());

  console.log('\nCar2 details:');
  console.log(car2.info());
  console.log('Is car2 a Vehicle?', car2 instanceof Vehicle);
  console.log('Is car2 a Car?', car2 instanceof Car);

  // Show access to parent properties directly
  console.log(`car2.make = ${car2.make}, car2.model = ${car2.model}, car2.year = ${car2.year}`);

  console.log('\nDemonstration complete.');
}

module.exports = { Vehicle, Car };
