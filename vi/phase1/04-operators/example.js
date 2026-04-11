// ============================================================
// 04 — Toán tử & Logic
// ============================================================

// --- 1. == vs === ---
console.log("=== == vs === ===");
console.log(1 == "1");          // true  ← type coercion
console.log(1 === "1");         // false ← strict
console.log(0 == false);        // true
console.log(0 === false);       // false
console.log(null == undefined); // true
console.log(null === undefined);// false

// --- 2. Nullish Coalescing (??) vs OR (||) ---
console.log("\n=== ?? vs || ===");
const valueA = 0;
console.log(valueA ?? "default");  // 0   ← 0 không phải null/undefined
console.log(valueA || "default");  // "default" ← 0 là falsy, bị thay thế

const valueB = "";
console.log(valueB ?? "default");  // ""  ← "" không phải null/undefined
console.log(valueB || "default");  // "default"

const valueC = null;
console.log(valueC ?? "default");  // "default"
console.log(valueC || "default");  // "default"

// Ứng dụng thực tế:
const config = { timeout: 0, retries: null };
const timeout = config.timeout ?? 3000;  // 0  ✅ Giữ đúng giá trị
const retries = config.retries ?? 3;     // 3  ✅ Dùng default
console.log({ timeout, retries });

// --- 3. Optional Chaining (?.) ---
console.log("\n=== OPTIONAL CHAINING ===");
const user1 = {
  name: "An",
  address: { city: "Hà Nội" },
  greet() { return `Xin chào, tôi là ${this.name}`; }
};

const user2 = null;

// Truy cập property lồng nhau
console.log(user1?.address?.city);  // "Hà Nội"
console.log(user2?.address?.city);  // undefined (không crash!)

// Gọi method
console.log(user1?.greet?.());     // "Xin chào, tôi là An"
console.log(user2?.greet?.());     // undefined (không crash!)

// Kết hợp với ??
const city = user2?.address?.city ?? "Không rõ địa chỉ";
console.log(city); // "Không rõ địa chỉ"

// --- 4. Logical Operators ---
console.log("\n=== LOGICAL OPERATORS ===");
// Short-circuit evaluation
console.log(true && "hello");   // "hello"
console.log(false && "hello");  // false (dừng sớm)
console.log(null || "fallback"); // "fallback"
console.log("value" || "fallback"); // "value"

// Ứng dụng: render có điều kiện (pattern phổ biến trong React)
const isLoggedIn = true;
const username = "An";
const greeting = isLoggedIn && `Chào mừng, ${username}!`;
console.log(greeting); // "Chào mừng, An!"

// Double NOT (!!) — chuyển sang boolean
console.log(!!"");       // false
console.log(!!"hello");  // true
console.log(!!0);        // false
console.log(!!1);        // true
console.log(!!null);     // false