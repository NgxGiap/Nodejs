// ============================================================
// 07 — Execution Context & Event Loop
// ============================================================

// --- 1. Minh họa Call Stack ---
console.log("=== CALL STACK ===");

function c() { console.log("c() thực thi"); }
function b() { c(); console.log("b() thực thi"); }
function a() { b(); console.log("a() thực thi"); }

a();
// Thứ tự in: c → b → a (LIFO)

// --- 2. Thứ tự thực thi: Sync → Microtask → Macrotask ---
console.log("\n=== THỨ TỰ THỰC THI ===");

console.log("1. Sync: Bắt đầu");

setTimeout(() => {
  console.log("5. Macrotask: setTimeout 0ms");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Microtask: Promise.then");
});

process.nextTick(() => {
  console.log("2. Microtask: process.nextTick (ưu tiên cao nhất)");
});

console.log("4. Sync: Kết thúc");

// Output theo thứ tự:
// 1 → 4 → 2 → 3 → 5
// (Sync → nextTick → Promise → setTimeout)

// --- 3. Microtasks chạy hết trước Macrotask tiếp theo ---
setTimeout(() => {
  console.log("\n=== MACROTASK CHẠY ===");
  console.log("Macrotask thực thi");

  Promise.resolve().then(() => {
    console.log("Microtask BÊN TRONG macrotask (chạy ngay sau macrotask này)");
  });

  setTimeout(() => {
    console.log("Macrotask tiếp theo (chạy sau microtask bên trên)");
  }, 0);
}, 100);

// --- 4. Stack Overflow ---
// Gọi đệ quy vô hạn sẽ làm đầy Call Stack
function recursive(n) {
  if (n <= 0) return "done";
  return recursive(n - 1);
}

try {
  // recursive(100000); // ❌ Uncommment để thấy RangeError: Maximum call stack size exceeded
  console.log("\n(Bỏ comment dòng trên để thấy Stack Overflow)");
} catch (e) {
  console.error("Stack Overflow:", e.message);
}

// --- 5. Giải quyết heavy computation với setImmediate ---
// Chia nhỏ task nặng để không block Event Loop
function heavyTask(items, callback) {
  let index = 0;
  function processChunk() {
    const end = Math.min(index + 100, items.length);
    while (index < end) {
      // xử lý items[index]
      index++;
    }
    if (index < items.length) {
      setImmediate(processChunk); // Nhường quyền cho event loop
    } else {
      callback("Hoàn thành!");
    }
  }
  processChunk();
}

const bigArray = new Array(250).fill(0).map((_, i) => i);
heavyTask(bigArray, (msg) => console.log("\nheavyTask:", msg));