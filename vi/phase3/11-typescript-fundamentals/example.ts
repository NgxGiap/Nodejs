/**
 * =========================================
 * 1. Basic Types
 * =========================================
 */

let userName: string = "Giap";
let age: number = 21;
let isActive: boolean = true;

console.log(`Name: ${userName}, Age: ${age}, Active: ${isActive}`);


/**
 * =========================================
 * 2. Function Types
 * =========================================
 */

function greet(name: string): string {
  return "Hello " + name;
}

console.log(greet("Giap"));


/**
 * =========================================
 * 3. Array Types
 * =========================================
 */

const numbers: number[] = [1, 2, 3];
console.log(numbers);


/**
 * =========================================
 * 4. unknown (Type Safety)
 * =========================================
 */

let data: unknown = "Hello";

if (typeof data === "string") {
  console.log(data.toUpperCase());
}


/**
 * =========================================
 * 5. void
 * =========================================
 */

function logMessage(msg: string): void {
  console.log(msg);
}

logMessage("This is a message");


/**
 * =========================================
 * 6. Type Inference
 * =========================================
 */

let x = 10; // inferred as number
console.log(x);

// x = "hello"; Type error


/**
 * =========================================
 * 7. Function with Types
 * =========================================
 */

function multiply(a: number, b: number): number {
  return a * b;
}

console.log(multiply(5, 3));


/**
 * =========================================
 * 8. Union Types
 * =========================================
 */

function printId(id: string | number): void {
  console.log(id);
}

printId("123");
printId(456);


/**
 * =========================================
 * 9. Defensive Coding with unknown
 * =========================================
 */

function processInput(input: unknown): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }

  throw new Error("Input must be a string");
}