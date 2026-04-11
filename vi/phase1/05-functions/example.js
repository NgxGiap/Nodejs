// ============================================================
// 05 — Hàm & Scope
// ============================================================

// --- 1. Ba loại hàm ---
console.log("=== CÁC LOẠI HÀM ===");

// Function Declaration (được hoisted)
console.log(add(2, 3)); // ✅ Gọi được TRƯỚC khi khai báo
function add(a, b) { return a + b; }

// Function Expression (không hoisted)
const multiply = function(a, b) { return a * b; };

// Arrow Function (cú pháp ngắn nhất)
const subtract = (a, b) => a - b;
const square = n => n * n;          // 1 tham số: bỏ ()
const getObj = () => ({ key: 1 });  // Trả về object: bọc trong ()

console.log(multiply(3, 4)); // 12
console.log(subtract(10, 3)); // 7
console.log(square(5));       // 25

// --- 2. this binding ---
console.log("\n=== THIS BINDING ===");
const person = {
  name: "An",

  // ✅ Regular function: this = object gọi method
  greetRegular: function() {
    return `Regular: Tôi là ${this.name}`;
  },

  // ❌ Arrow function: this kế thừa từ ngoài (global/module)
  greetArrow: () => {
    return `Arrow: Tôi là ${this?.name ?? "undefined"}`;
  },

  // ✅ Dùng arrow function bên trong regular function: this đúng
  greetDelayed: function() {
    const inner = () => `Inner arrow: Tôi là ${this.name}`;
    return inner();
  }
};

console.log(person.greetRegular()); // "Regular: Tôi là An"
console.log(person.greetArrow());   // "Arrow: Tôi là undefined"
console.log(person.greetDelayed()); // "Inner arrow: Tôi là An"

// --- 3. Scope Chain ---
console.log("\n=== SCOPE CHAIN ===");
const globalVar = "GLOBAL";

function outer() {
  const outerVar = "OUTER";

  function inner() {
    const innerVar = "INNER";
    // inner có thể thấy: innerVar, outerVar, globalVar
    console.log(innerVar, outerVar, globalVar);
  }

  inner();
  // outer không thể thấy innerVar
  // console.log(innerVar); // ❌ ReferenceError
}

outer();

// --- 4. Closures ---
console.log("\n=== CLOSURES ===");

// Ứng dụng 1: Biến private (data privacy)
function createCounter(initialValue = 0) {
  let count = initialValue; // Biến private

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    reset()     { count = initialValue; return count; },
    getValue()  { return count; },
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.reset());     // 10
// Không thể đọc/sửa `count` trực tiếp từ bên ngoài

// Ứng dụng 2: Tạo hàm với config cố định (partial application)
function createMultiplier(multiplier) {
  return (number) => number * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Ứng dụng 3: Memoization (cache kết quả)
function memoize(fn) {
  const cache = {};
  return function(n) {
    if (cache[n] !== undefined) {
      console.log(`[cache hit] ${n}`);
      return cache[n];
    }
    cache[n] = fn(n);
    return cache[n];
  };
}

const slowSquare = (n) => n * n;
const fastSquare = memoize(slowSquare);

console.log(fastSquare(7)); // tính toán: 49
console.log(fastSquare(7)); // [cache hit] 49