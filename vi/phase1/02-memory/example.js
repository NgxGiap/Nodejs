// ============================================================
// 02 — Cơ chế bộ nhớ: Stack vs Heap, Reference Trap, Copy
// ============================================================

// --- 1. STACK: Primitives được sao chép theo GIÁ TRỊ ---
let a = 10;
let b = a;   // b nhận bản sao độc lập của giá trị 10
b = 99;

console.log("=== STACK (Primitives) ===");
console.log("a:", a); // 10 — không bị ảnh hưởng
console.log("b:", b); // 99

// --- 2. HEAP: Objects được sao chép theo ĐỊA CHỈ ---
const objA = { name: "An", score: 100 };
const objB = objA; // Sao chép ĐỊA CHỈ — cùng trỏ vào một object!

objB.name = "Bình";

console.log("\n=== HEAP (Reference Trap) ===");
console.log("objA:", objA); // { name: 'Bình', score: 100 } — bị thay đổi!
console.log("objB:", objB); // { name: 'Bình', score: 100 }
console.log("Cùng địa chỉ?", objA === objB); // true

// --- 3. SHALLOW COPY (Sao chép nông) ---
const original = {
  name: "An",
  address: { city: "Hà Nội" }, // object lồng nhau
};

const shallowCopy = { ...original };
shallowCopy.name = "Copy";           // ✅ Độc lập
shallowCopy.address.city = "HCM";   // ❌ Vẫn dùng chung địa chỉ với original!

console.log("\n=== SHALLOW COPY ===");
console.log("original.name:", original.name);          // 'An' — an toàn
console.log("original.address.city:", original.address.city); // 'HCM' — bị thay đổi!

// --- 4. DEEP COPY (Sao chép sâu) ---
const source = {
  name: "An",
  address: { city: "Hà Nội" },
};

const deepCopy = structuredClone(source);
deepCopy.name = "Deep";
deepCopy.address.city = "Đà Nẵng"; // ✅ Hoàn toàn độc lập

console.log("\n=== DEEP COPY ===");
console.log("source.name:", source.name);              // 'An' — an toàn
console.log("source.address.city:", source.address.city); // 'Hà Nội' — an toàn
console.log("deepCopy.address.city:", deepCopy.address.city); // 'Đà Nẵng'