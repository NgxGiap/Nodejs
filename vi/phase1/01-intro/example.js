// ============================================================
// 01 — Giới thiệu & Môi trường
// ============================================================

// --- Thông tin môi trường ---
console.log("Node.js version:", process.version);
console.log("Platform:", process.platform);
console.log("Thư mục hiện tại:", process.cwd());

// --- Non-blocking I/O minh họa ---
// setTimeout là ví dụ đơn giản nhất về async / non-blocking
console.log("1. Bắt đầu");

setTimeout(() => {
  console.log("3. Sau 1 giây (async - không chặn luồng)");
}, 1000);

console.log("2. Tiếp tục ngay lập tức (không chờ setTimeout)");

// Output sẽ là: 1 → 2 → 3
// Chứng minh Node.js KHÔNG bị block khi gặp tác vụ chậm