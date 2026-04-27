// math.js — Module helper dùng chung (CommonJS)
// ============================================================

const PI = 3.14159265358979;

function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

function divide(a, b) {
  if (b === 0) throw new Error("Không thể chia cho 0");
  return a / b;
}

function power(base, exp) { return Math.pow(base, exp); }
function circleArea(r)    { return PI * r * r; }
function clamp(n, min, max) { return Math.min(Math.max(n, min), max); }

module.exports = { PI, add, subtract, multiply, divide, power, circleArea, clamp };