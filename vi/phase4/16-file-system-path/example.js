// ============================================================
// 16 — File System & Path
// Chạy: node example.js
// ============================================================

const fs   = require("fs/promises");
const fsCB = require("fs");          // Cho watcher (không có trong fs/promises)
const path = require("path");

const TMP = path.join(__dirname, "tmp");

async function main() {

  // ========================
  // PHẦN 1: SETUP
  // ========================

  console.log("=== SETUP THƯ MỤC ===");
  await fs.mkdir(TMP, { recursive: true });
  await fs.mkdir(path.join(TMP, "logs"),    { recursive: true });
  await fs.mkdir(path.join(TMP, "uploads"), { recursive: true });
  console.log("Tạo xong cấu trúc thư mục tmp/");

  // ========================
  // PHẦN 2: GHI FILE
  // ========================

  console.log("\n=== GHI FILE ===");

  // Ghi JSON
  const users = [
    { id: 1, name: "An",   email: "an@example.com",   role: "admin" },
    { id: 2, name: "Bình", email: "binh@example.com", role: "user"  },
    { id: 3, name: "Chi",  email: "chi@example.com",  role: "user"  },
  ];
  const jsonPath = path.join(TMP, "users.json");
  await fs.writeFile(jsonPath, JSON.stringify(users, null, 2), "utf-8");
  console.log("✅ Ghi users.json");

  // Ghi text (CSV)
  const csvHeader = "id,name,email,role\n";
  const csvRows   = users.map(u => `${u.id},${u.name},${u.email},${u.role}`).join("\n");
  const csvPath   = path.join(TMP, "users.csv");
  await fs.writeFile(csvPath, csvHeader + csvRows, "utf-8");
  console.log("✅ Ghi users.csv");

  // ========================
  // PHẦN 3: ĐỌC FILE
  // ========================

  console.log("\n=== ĐỌC FILE ===");

  // Đọc JSON
  const rawJson   = await fs.readFile(jsonPath, "utf-8");
  const parsedUsers = JSON.parse(rawJson);
  console.log(`Đọc JSON: ${parsedUsers.length} users`);
  parsedUsers.forEach(u => console.log(`  - #${u.id} ${u.name} (${u.role})`));

  // Đọc từng dòng CSV
  const rawCsv  = await fs.readFile(csvPath, "utf-8");
  const [header, ...rows] = rawCsv.trim().split("\n");
  const keys    = header.split(",");
  const csvData = rows.map(row => {
    const values = row.split(",");
    return Object.fromEntries(keys.map((k, i) => [k, values[i]]));
  });
  console.log("Đọc CSV:", csvData.length, "rows");

  // ========================
  // PHẦN 4: APPEND (LOG FILE)
  // ========================

  console.log("\n=== APPEND LOG ===");

  const logPath = path.join(TMP, "logs", "app.log");

  // Ghi nhiều log entries
  const logEntries = [
    { level: "INFO",  msg: "Server khởi động",          meta: { port: 3000 } },
    { level: "INFO",  msg: "Kết nối DB thành công",      meta: { host: "localhost" } },
    { level: "WARN",  msg: "Bộ nhớ đang ở mức cao",     meta: { used: "78%" } },
    { level: "ERROR", msg: "Request timeout",            meta: { url: "/api/data", ms: 5001 } },
  ];

  for (const entry of logEntries) {
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      ...entry,
    }) + "\n";
    await fs.appendFile(logPath, line);
  }

  // Đọc lại log
  const logContent = await fs.readFile(logPath, "utf-8");
  const logLines   = logContent.trim().split("\n").map(l => JSON.parse(l));
  console.log(`Ghi ${logLines.length} log entries`);
  logLines.forEach(l => {
    const icon = { INFO: "ℹ️ ", WARN: "⚠️ ", ERROR: "❌" }[l.level];
    console.log(`  ${icon} [${l.level}] ${l.msg}`);
  });

  // ========================
  // PHẦN 5: THÔNG TIN FILE (STAT)
  // ========================

  console.log("\n=== STAT ===");

  const filesToStat = [jsonPath, csvPath, logPath];
  for (const fp of filesToStat) {
    const stat = await fs.stat(fp);
    console.log(`${path.basename(fp)}:`);
    console.log(`  Size    : ${stat.size} bytes`);
    console.log(`  Modified: ${stat.mtime.toLocaleString("vi-VN")}`);
    console.log(`  Is file : ${stat.isFile()}`);
  }

  // ========================
  // PHẦN 6: READDIR (LIỆT KÊ FILE)
  // ========================

  console.log("\n=== READDIR ===");

  async function listDir(dirPath, indent = "") {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        console.log(`${indent}📁 ${entry.name}/`);
        await listDir(path.join(dirPath, entry.name), indent + "  ");
      } else {
        const stat = await fs.stat(path.join(dirPath, entry.name));
        console.log(`${indent}📄 ${entry.name} (${stat.size}B)`);
      }
    }
  }

  console.log("tmp/");
  await listDir(TMP, "  ");

  // ========================
  // PHẦN 7: COPY & RENAME
  // ========================

  console.log("\n=== COPY & RENAME ===");

  const backupPath = path.join(TMP, "users.backup.json");
  await fs.copyFile(jsonPath, backupPath);
  console.log("✅ Copy users.json → users.backup.json");

  const renamedPath = path.join(TMP, "uploads", "users-import.csv");
  await fs.rename(csvPath, renamedPath);
  console.log("✅ Move users.csv → uploads/users-import.csv");

  // ========================
  // PHẦN 8: KIỂM TRA TỒN TẠI
  // ========================

  console.log("\n=== KIỂM TRA TỒN TẠI ===");

  async function fileExists(fp) {
    try { await fs.access(fp); return true; }
    catch { return false; }
  }

  console.log("users.json tồn tại?         ", await fileExists(jsonPath));
  console.log("users.csv tồn tại?          ", await fileExists(csvPath));    // Đã move
  console.log("users.backup.json tồn tại?  ", await fileExists(backupPath));
  console.log("uploads/users-import.csv?   ", await fileExists(renamedPath));

  // ========================
  // PHẦN 9: PATH MODULE
  // ========================

  console.log("\n=== PATH MODULE ===");

  const p = "/home/user/projects/app/src/index.js";
  console.log("parse()   :", path.parse(p));
  console.log("basename():", path.basename(p));
  console.log("extname() :", path.extname(p));
  console.log("dirname() :", path.dirname(p));
  console.log("join()    :", path.join("a", "b", "..", "c", "file.txt"));
  console.log("resolve() :", path.resolve("./example.js"));
  console.log("relative():", path.relative("/home/user", "/home/user/projects"));
  console.log("sep       :", JSON.stringify(path.sep));   // "/" hoặc "\"

  // ========================
  // PHẦN 10: DỌN DẸP
  // ========================

  console.log("\n=== DỌN DẸP ===");
  await fs.rm(TMP, { recursive: true, force: true });
  console.log("✅ Đã xóa toàn bộ thư mục tmp/");
}

main().catch(err => {
  console.error("Lỗi:", err.message);
  process.exit(1);
});