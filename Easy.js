// 1. Print Hello World
console.log("Hello World");

// 2. Declare variables of different data types and display their values
let Name = "Tina";
let age = 18;
let isstudent = true;
let address = "Bangalore";
let phonenumber = null;
let person = {
name: "Tina",
age: 18
};
let fruits = ["Apple", "Banana", "Mango"];
console.log("Name:", Name);
console.log("Age:", age);
console.log("Is Student:", isstudent);
console.log("Address:", address);
console.log("Phone Number:", phonenumber);
console.log("Person:", person);
console.log("Fruits:", fruits);

// 3. Take two numbers and perform basic arithmetic

let num1 = 10;
let num2 = 5;
console.log("Addition:", num1 + num2);
console.log("Subtraction:", num1 - num2);
console.log("Multiplication:", num1 * num2);
console.log("Division:", num1 / num2);
console.log("Modulus:", num1 % num2);

// 4. Convert Celsius to Fahrenheit
let celsius = 25;
let fahrenheit = (celsius * 9 / 5) + 32;
console.log("Temperature in Fahrenheit:", fahrenheit);

// 5. Swap two numbers using a third variable

let swapNum1 = 10;
let swapNum2 = 20;
let temp = swapNum1;
swapNum1 = swapNum2;
swapNum2 = temp;
console.log("After Swapping:");
console.log("swapNum1:", swapNum1);
console.log("swapNum2:", swapNum2);
let temp = num1;
num1 = num2;
num2 = temp;
console.log("After swapping:");
console.log("num1:", num1);
console.log("num2:", num2);