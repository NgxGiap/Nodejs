// ============================================================
// 14 — Module System: CommonJS (CJS)
// Chạy: node example-cjs.js
// ============================================================

// --- 1. Import module tự tạo ---
console.log("=== IMPORT MODULE TỰ TẠO ===");

const math = require("./math");               // Lấy toàn bộ object
const { add, subtract, circleArea } = require("./math"); // Destructure

console.log("math.PI:", math.PI);
console.log("add(3, 4):", add(3, 4));
console.log("subtract(10, 3):", subtract(10, 3));
console.log("circleArea(5):", circleArea(5).toFixed(4));

// Thử chia cho 0 — module throw Error
try {
  math.divide(10, 0);
} catch (e) {
  console.log("Lỗi bắt được:", e.message);
}

// --- 2. Module Cache (Singleton) ---
console.log("\n=== MODULE CACHE (SINGLETON) ===");

const logger1 = require("./logger");
const logger2 = require("./logger");

// Cùng một instance — vì CJS cache sau lần require() đầu tiên
console.log("Cùng instance?", logger1 === logger2); // true

logger1.info("Khởi động ứng dụng");
logger2.warn("Bộ nhớ đang thấp", { usedMB: 450, totalMB: 512 });
logger1.error("Kết nối DB thất bại", { host: "localhost", port: 5432 });

// logger2 vẫn thấy log của logger1 — cùng một object
console.log("Tổng số log:", logger1.getHistory().length); // 3

// --- 3. Built-in Modules ---
console.log("\n=== BUILT-IN MODULES ===");

const path = require("path");
const os   = require("os");

// path module
const filePath = "/home/user/projects/app/src/index.js";
console.log("basename :", path.basename(filePath));         // "index.js"
console.log("extname  :", path.extname(filePath));          // ".js"
console.log("dirname  :", path.dirname(filePath));          // ".../src"
console.log("join     :", path.join("src", "utils", "helper.js")); // cross-platform
console.log("resolve  :", path.resolve("./math.js"));       // absolute path

const parsed = path.parse(filePath);
console.log("parse    :", parsed);
// { root: '/', dir: '...', base: 'index.js', ext: '.js', name: 'index' }

// os module
console.log("\nos.platform :", os.platform());
console.log("os.arch     :", os.arch());
console.log("os.cpus     :", os.cpus().length, "cores");
console.log("os.totalmem :", (os.totalmem() / 1024 ** 3).toFixed(1), "GB");
console.log("os.freemem  :", (os.freemem()  / 1024 ** 3).toFixed(1), "GB");
console.log("os.homedir  :", os.homedir());
console.log("os.tmpdir   :", os.tmpdir());

// --- 4. process object ---
console.log("\n=== PROCESS OBJECT ===");

console.log("Node version :", process.version);
console.log("Platform     :", process.platform);
console.log("cwd()        :", process.cwd());
console.log("__dirname    :", __dirname);
console.log("__filename   :", __filename);

// CLI Arguments — thử: node example-cjs.js hello world
const args = process.argv.slice(2); // bỏ "node" và path của script
console.log("CLI args     :", args.length ? args : "(không có)");

// Biến môi trường
const env  = process.env.NODE_ENV ?? "development";
const port = process.env.PORT     ?? "3000";
console.log(`Environment  : ${env} (PORT=${port})`);

// Memory usage
const mem = process.memoryUsage();
console.log("Memory (MB)  :", {
  rss:      (mem.rss      / 1024 ** 2).toFixed(1),
  heapUsed: (mem.heapUsed / 1024 ** 2).toFixed(1),
  external: (mem.external / 1024 ** 2).toFixed(1),
});

// --- 5. Dynamic require (CJS feature) ---
console.log("\n=== DYNAMIC REQUIRE ===");

function loadModule(name) {
  // CJS cho phép require() bên trong hàm, điều kiện, vòng lặp
  try {
    const mod = require(`./${name}`);
    console.log(`✅ Loaded: ${name}`);
    return mod;
  } catch {
    console.log(`❌ Không tìm thấy: ${name}`);
    return null;
  }
}

loadModule("math");
loadModule("logger");
loadModule("nonexistent"); // ❌

// --- 6. Process events ---
process.on("exit", (code) => {
  console.log(`\nProcess kết thúc với code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("Lỗi không được xử lý:", err.message);
  process.exit(1);
});