// ============================================================
// 14 — Module System: ES Modules (ESM)
//
// Để chạy file này, có 2 cách:
//
// Cách 1: Đổi tên file thành example-esm.mjs rồi chạy:
//   node example-esm.mjs
//
// Cách 2: Thêm "type": "module" vào package.json rồi chạy:
//   node example-esm.js
//
// ⚠️ KHÔNG chạy bằng: node example-esm.js (nếu chưa có "type":"module")
//    Sẽ bị lỗi: SyntaxError: Cannot use import statement in a module
// ============================================================

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ========================
// PHẦN 1: __dirname / __filename TRONG ESM
// ========================

// ESM KHÔNG có __dirname, __filename sẵn như CJS
// Phải tự tạo từ import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

console.log("=== ESM GLOBALS ===");
console.log("import.meta.url :", import.meta.url);
console.log("__filename      :", __filename);
console.log("__dirname       :", __dirname);
console.log("cwd()           :", process.cwd());

// ========================
// PHẦN 2: IMPORT CJS MODULE TRONG ESM
// ========================

console.log("\n=== IMPORT CJS MODULE ===");

// Node.js cho phép ESM import CJS module
// Nhưng KHÔNG thể dùng named import trực tiếp — phải import default rồi destructure
import mathCJS from "./math.js";
const { add, multiply, circleArea, power } = mathCJS;

console.log("add(5, 3)       :", add(5, 3));
console.log("multiply(4, 7)  :", multiply(4, 7));
console.log("circleArea(10)  :", circleArea(10).toFixed(2));
console.log("power(2, 10)    :", power(2, 10));

// ========================
// PHẦN 3: TOP-LEVEL AWAIT (ĐẶC QUYỀN CỦA ESM)
// ========================

console.log("\n=== TOP-LEVEL AWAIT ===");

// ESM hỗ trợ await ở cấp cao nhất — CJS KHÔNG làm được điều này!
// Trong CJS bắt buộc phải bọc trong async function

const delay = (ms) => new Promise(r => setTimeout(r, ms));

console.log("Bắt đầu chờ...");
await delay(100); // ✅ Top-level await — không cần async function bên ngoài
console.log("Đã chờ 100ms xong");

// Ứng dụng thực tế: load config async khi khởi động app
async function loadConfig() {
  await delay(50); // Giả lập: đọc file, gọi API config...
  return {
    host:  process.env.HOST     ?? "localhost",
    port:  process.env.PORT     ?? 3000,
    debug: process.env.NODE_ENV !== "production",
  };
}

// Dùng top-level await để đảm bảo config sẵn sàng
// trước khi phần còn lại của module chạy
const config = await loadConfig();
console.log("Config loaded:", config);

// ========================
// PHẦN 4: DYNAMIC IMPORT (LAZY LOADING)
// ========================

console.log("\n=== DYNAMIC IMPORT ===");

// import() trả về Promise — dùng để load module theo điều kiện hoặc khi cần
async function loadModuleByEnv(env) {
  const moduleName = env === "production" ? "math" : "math";
  console.log(`Loading module: ${moduleName}...`);

  try {
    const start = Date.now();
    const mod   = await import(`./${moduleName}.js`);
    console.log(`✅ Loaded sau ${Date.now() - start}ms`);
    return mod;
  } catch (e) {
    console.log(`❌ Lỗi:`, e.message);
    return null;
  }
}

const mod = await loadModuleByEnv("development");
if (mod) {
  // CJS module được wrap — truy cập qua .default
  console.log("clamp(150, 0, 100):", mod.default?.clamp(150, 0, 100));
}

// ========================
// PHẦN 5: IMPORT.META
// ========================

console.log("\n=== IMPORT.META ===");

// import.meta.url — URL của file hiện tại
console.log("import.meta.url:", import.meta.url);

// Kiểm tra file có đang chạy trực tiếp không
// (Giống require.main === module trong CJS)
const isEntryPoint = process.argv[1] === __filename;
console.log("Là entry point?:", isEntryPoint);

// ========================
// PHẦN 6: RE-EXPORT PATTERN (comment minh họa)
// ========================

// Trong ESM, file index.js thường dùng để re-export từ các module con
// Ví dụ: src/utils/index.js
//
//   export { add, subtract, multiply } from "./math.js";
//   export { default as Logger }       from "./logger.js";
//   export * from "./helpers.js";
//
// Người dùng chỉ cần import từ một chỗ:
//   import { add, Logger } from "./utils/index.js";

console.log("\n✅ ESM example chạy xong!");