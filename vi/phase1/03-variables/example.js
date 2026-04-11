// ============================================================
// 03 — Biến & Kiểu dữ liệu
// ============================================================

// --- 1. var vs let vs const ---
console.log("=== var HOISTING ===");
console.log(hoistedVar); // undefined (không lỗi, nhưng nguy hiểm!)
var hoistedVar = "tôi bị hoisted";

// console.log(hoistedLet); // ❌ ReferenceError: TDZ
let hoistedLet = "tôi KHÔNG bị hoisted";

// --- 2. Block Scope ---
console.log("\n=== BLOCK SCOPE ===");
{
  var varInBlock = "var — thoát ra ngoài block!";
  let letInBlock = "let — bị giữ trong block";
  const constInBlock = "const — bị giữ trong block";
}
console.log(varInBlock);    // ✅ In được
// console.log(letInBlock); // ❌ ReferenceError

// --- 3. const với Object/Array ---
console.log("\n=== CONST VỚI OBJECT ===");
const user = { name: "An", age: 25 };
user.name = "Bình"; // ✅ Thay đổi property — được phép
console.log(user);  // { name: 'Bình', age: 25 }

// user = {}; // ❌ TypeError: Assignment to constant variable

const arr = [1, 2, 3];
arr.push(4); // ✅ Thêm phần tử — được phép
console.log(arr); // [1, 2, 3, 4]

// --- 4. Các kiểu dữ liệu & typeof ---
console.log("\n=== TYPEOF ===");
console.log(typeof "hello");        // string
console.log(typeof 42);             // number
console.log(typeof 3.14);           // number (JS không phân biệt int/float)
console.log(typeof true);           // boolean
console.log(typeof undefined);      // undefined
console.log(typeof null);           // object ← BUG nổi tiếng của JS!
console.log(typeof {});             // object
console.log(typeof []);             // object ← dùng Array.isArray() thay thế
console.log(typeof function() {});  // function
console.log(typeof Symbol("id"));   // symbol

// Cách kiểm tra đúng cho Array:
console.log("\n=== KIỂM TRA ARRAY ===");
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({}));        // false

// --- 5. Null vs Undefined ---
console.log("\n=== NULL VS UNDEFINED ===");
let notAssigned;           // undefined — chưa được gán
let intentionalEmpty = null; // null — chủ động gán rỗng

console.log(notAssigned);       // undefined
console.log(intentionalEmpty);  // null
console.log(notAssigned == intentionalEmpty);  // true (loose)
console.log(notAssigned === intentionalEmpty); // false (strict)