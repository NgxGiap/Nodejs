/**
 * =========================================
 * 1. Hoisting & Temporal Dead Zone (TDZ)
 * =========================================
 */

// Hoisting với var
console.log(a); // undefined
var a = 10;

// Hoisting với let (TDZ)
// console.log(b); // ❌ ReferenceError
let b = 20;

/**
 * TDZ (Temporal Dead Zone):
 * - Khoảng thời gian từ lúc biến được hoisted đến khi được khởi tạo
 * - let/const: có TDZ → truy cập trước khi khởi tạo sẽ lỗi
 * - var: không có TDZ → được gán mặc định undefined
 */


/**
 * =========================================
 * 2. Scope: var vs let
 * =========================================
 */

if (true) {
  var x = 1;
  let y = 2;
}

console.log(x); // 1 (var có function/global scope)
// console.log(y); // ❌ ReferenceError (let có block scope)


/**
 * =========================================
 * 3. const & Object Mutation
 * =========================================
 */

const user = {
  name: "Giap",
};

// Thay đổi property → OK
user.name = "Changed";

console.log(user.name); // "Changed"

// Gán lại object → ❌ TypeError
// user = { name: "New User" };


/**
 * =========================================
 * 4. Primitive vs Reference
 * =========================================
 */

// Primitive (copy by value)
let c = 10;
let d = c;

d = 20;

console.log(c); // 10 (không bị ảnh hưởng)

// Reference (copy by reference)
let obj1 = { value: 10 };
let obj2 = obj1;

obj2.value = 20;

console.log(obj1.value); // 20 (bị ảnh hưởng)


/**
 * =========================================
 * 5. typeof quirks
 * =========================================
 */

console.log(typeof null);        // "object" (bug lịch sử)
console.log(typeof undefined);   // "undefined"
console.log(typeof []);          // "object"
console.log(typeof {});          // "object"
console.log(typeof function(){});// "function"
console.log(typeof NaN);         // "number"


/**
 * =========================================
 * 6. Check Primitive
 * =========================================
 */

function isPrimitive(value) {
  return value !== Object(value);
}

console.log(isPrimitive(10));            // true
console.log(isPrimitive("Hello"));       // true
console.log(isPrimitive(true));          // true
console.log(isPrimitive(null));          // true
console.log(isPrimitive({}));            // false
console.log(isPrimitive([]));            // false
console.log(isPrimitive(function(){}));  // false