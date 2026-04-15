/**
 * =========================================
 * 1. Function Declaration vs Expression
 * =========================================
 */

// Function Declaration (hoisted)
sayHello();

function sayHello() {
  console.log("Hello");
}

// Function Expression (NOT hoisted)
// sayHi(); // ReferenceError

const sayHi = function () {
  console.log("Hi");
};


/**
 * =========================================
 * 2. Arrow Function & this
 * =========================================
 */

const user = {
  name: "Giap",
  greet: () => {
    console.log("Hello " + this.name);
  },
};

user.greet(); // "Hello undefined"

/**
 * Arrow function không có `this` riêng
 * lấy `this` từ scope bên ngoài
 */


/**
 * =========================================
 * 3. Scope (Global / Function / Block)
 * =========================================
 */

let a = 1;

function test() {
  let a = 2;

  if (true) {
    let a = 3;
    console.log(a); // 3 (block scope)
  }

  console.log(a); // 2 (function scope)
}

test();
console.log(a); // 1 (global scope)


/**
 * =========================================
 * 4. Closure cơ bản
 * =========================================
 */

function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter(); // 1
counter(); // 2
counter(); // 3

/**
 * Closure:
 * - inner function giữ reference tới biến của outer
 * - giúp duy trì state
 */


/**
 * =========================================
 * 5. var + setTimeout (Closure Bug)
 * =========================================
 */

// Bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

// Output:
// 3
// 3
// 3

/**
 * Nguyên nhân:
 * - var có function scope
 * - tất cả callback dùng chung biến i
 */

// Fix 1: dùng let
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100);
}

// Fix 2: dùng closure (IIFE)
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j);
    }, 100);
  })(i);
}


/**
 * =========================================
 * 6. Closure: Counter
 * =========================================
 */

function createCounter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter2 = createCounter();

counter2(); // 1
counter2(); // 2
counter2(); // 3


/**
 * =========================================
 * 7. Data Privacy với Closure
 * =========================================
 */

function createUser(name) {
  let _name = name; // private variable

  return {
    getName() {
      return _name;
    },
    setName(newName) {
      _name = newName;
    },
  };
}

const user2 = createUser("Giap");

console.log(user2.getName()); // "Giap"

user2.setName("New Name");
console.log(user2.getName()); // "New Name"

// Không truy cập trực tiếp:
// console.log(user2._name); // undefined