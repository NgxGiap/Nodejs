# 16 — File System & Path

## fs Module

Node.js cung cấp module `fs` để tương tác với hệ thống file — đọc, ghi, xóa, tạo thư mục, theo dõi thay đổi...

### Ba cách dùng `fs`

```js
// Cách 1: Callback (cũ) — KHÔNG dùng trong code mới
const fs = require("fs");
fs.readFile("file.txt", "utf-8", (err, data) => { ... });

// Cách 2: Sync — BLOCK toàn bộ Event Loop ⚠️
const data = fs.readFileSync("file.txt", "utf-8");

// Cách 3: Promise (fs/promises) — ✅ LUÔN dùng cái này
const fs = require("fs/promises");
const data = await fs.readFile("file.txt", "utf-8");
```

> **Nguyên tắc**: Chỉ dùng Sync cho **CLI scripts** hoặc **khởi tạo app** (một lần). Trong server/ứng dụng chạy liên tục — luôn dùng async.

---

## Thao tác File

```js
const fs = require("fs/promises");

// Đọc file
const text = await fs.readFile("file.txt", "utf-8");
const raw = await fs.readFile("image.png"); // Buffer nếu không có encoding

// Ghi file (tạo mới hoặc ghi đè)
await fs.writeFile("output.txt", "Nội dung", "utf-8");
await fs.writeFile("data.json", JSON.stringify(obj, null, 2));

// Thêm vào cuối file
await fs.appendFile("app.log", `[${new Date()}] Log entry\n`);

// Xóa file
await fs.unlink("old-file.txt");

// Copy file
await fs.copyFile("src.txt", "dest.txt");

// Rename / Move
await fs.rename("old.txt", "new.txt");
```

---

## Thao tác Thư mục

```js
// Tạo thư mục (recursive: không lỗi nếu đã tồn tại)
await fs.mkdir("path/to/dir", { recursive: true });

// Đọc danh sách file
const entries = await fs.readdir("./src");
// Với loại file:
const detailed = await fs.readdir("./src", { withFileTypes: true });
detailed.forEach((entry) => {
  if (entry.isDirectory()) console.log("📁", entry.name);
  else console.log("📄", entry.name);
});

// Xóa thư mục (kể cả có nội dung bên trong)
await fs.rm("./tmp", { recursive: true });
```

---

## Kiểm tra & Thống kê

```js
// Thông tin file
const stat = await fs.stat("file.txt");
stat.size; // Bytes
stat.isFile(); // true/false
stat.isDirectory(); // true/false
stat.birthtime; // Ngày tạo
stat.mtime; // Ngày sửa cuối

// Kiểm tra file có tồn tại không
async function exists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}
```

---

## path Module

```js
const path = require("path");

// Xây dựng đường dẫn — cross-platform (Windows/Linux/Mac)
path.join("src", "utils", "helper.js"); // "src/utils/helper.js"
path.resolve("./src", "../config"); // Đường dẫn tuyệt đối

// Phân tích đường dẫn
path.basename("/home/user/file.txt"); // "file.txt"
path.basename("/home/user/file.txt", ".txt"); // "file" (bỏ extension)
path.extname("/home/user/file.txt"); // ".txt"
path.dirname("/home/user/file.txt"); // "/home/user"
path.parse("/home/user/file.txt");
// { root: '/', dir: '/home/user', base: 'file.txt', ext: '.txt', name: 'file' }

// So sánh
path.sep; // "/" trên Linux/Mac, "\" trên Windows
path.delimiter; // ":" trên Linux/Mac, ";" trên Windows
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — đọc/ghi/xóa file, thư mục, stat, watch, fs.promises patterns
