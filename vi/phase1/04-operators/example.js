/**
 * =========================================
 * 1. Equality: == vs ===
 * =========================================
 */

// Loose equality (type coercion)
console.log(0 == false);        // true
console.log("" == 0);           // true
console.log(null == undefined); // true

// Strict equality (no coercion)
console.log(0 === false);        // false
console.log("" === 0);           // false
console.log(null === undefined); // false

/**
 * ⚠️ Best Practice:
 * - Tránh dùng ==
 * - Luôn dùng === để tránh bug
 */


/**
 * =========================================
 * 2. Logical Operators
 * =========================================
 */

// AND (&&)
console.log(1 && "hello"); // "hello"
console.log(0 && "hello"); // 0

// OR (||)
console.log(1 || "hello"); // 1
console.log(0 || "hello"); // "hello"

// NOT (!)
console.log(!"text"); // false
console.log(!0);      // true


/**
 * =========================================
 * 3. Nullish Coalescing (??) vs OR (||)
 * =========================================
 */

// null / undefined
console.log(null || "default"); // "default"
console.log(null ?? "default"); // "default"

// falsy values
console.log(0 || "default"); // "default"
console.log(0 ?? "default"); // 0

console.log("" || "default"); // "default"
console.log("" ?? "default"); // ""

/**
 * Note:
 * - ||: trả về giá trị đầu tiên truthy
 * - ??: chỉ fallback khi null hoặc undefined
 */


/**
 * =========================================
 * 4. Optional Chaining (?.)
 * =========================================
 */

const user = {
  name: "Giap",
  address: {
    city: "Hanoi",
  },
};

console.log(user.address.city);      // "Hanoi"
console.log(user.profile?.email);    // undefined (không lỗi)

// Cách cũ (không dùng optional chaining)
if (user.profile) {
  console.log(user.profile.email);
} else {
  console.log("Profile not found");
}


/**
 * =========================================
 * 5. Bug thực tế với ||
 * =========================================
 */

// Bug
function getUserNameBug(user) {
  return user.name || "Anonymous";
}

console.log(getUserNameBug({ name: "" })); // "Anonymous" (sai)

// Fix đúng
function getUserName(user) {
  return user.name ?? "Anonymous";
}

console.log(getUserName({ name: "" })); // "" (đúng)
console.log(getUserName({ name: "Alice" })); // "Alice"


/**
 * =========================================
 * 6. Utility Function
 * =========================================
 */

function getValue(value, defaultValue) {
  return value ?? defaultValue;
}

console.log(getValue(null, "A")); // "A"
console.log(getValue(0, "A"));    // 0
console.log(getValue("", "A"));   // ""