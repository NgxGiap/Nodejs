# 01 — Giới thiệu & Môi trường

## Node.js là gì?

Node.js là một **runtime** cho phép chạy JavaScript bên ngoài trình duyệt, được xây dựng trên **V8 Engine** (cùng engine với Chrome).

---

## Kiến trúc cốt lõi

### V8 Engine

- Biên dịch JavaScript sang mã máy (machine code) — **không phải interpret từng dòng**.
- Sử dụng kỹ thuật **JIT (Just-In-Time Compilation)** để tối ưu hiệu năng.

### Non-blocking I/O

- Node.js **không chờ** các tác vụ chậm (đọc file, gọi API, query DB).
- Trong lúc chờ, nó tiếp tục xử lý các tác vụ khác → **hiệu suất cao**.

### Single-threaded

- Node.js chỉ có **một luồng** xử lý JavaScript.
- Nhưng các tác vụ I/O được giao cho **libuv** (C++ library) xử lý song song ở nền.

---

## Thiết lập môi trường

### Cài đặt Node.js

```bash
# Kiểm tra phiên bản
node -v
npm -v
```

### Tạo project mới

```bash
mkdir my-project
cd my-project
npm init -y        # Tạo package.json tự động
```

### Cấu trúc `package.json`

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  }
}
```

### VS Code Extensions nên cài

- **ESLint** — kiểm tra lỗi cú pháp
- **Prettier** — format code tự động
- **Error Lens** — hiển thị lỗi inline

---

## 📂 File ví dụ

- [`example.js`](./example.js) — Hello World và kiểm tra thông tin môi trường
