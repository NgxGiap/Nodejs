# 10 — Xử lý lỗi (Error Handling)

## try / catch / finally

```js
try {
  // Code có thể gây lỗi
  const data = JSON.parse(invalidJson);
} catch (err) {
  // Xử lý lỗi — err.name, err.message, err.stack
  console.error(err.message);
} finally {
  // LUÔN chạy — dù có lỗi hay không
  // Dùng để: đóng DB connection, cleanup resources
}
```

---

## Custom Error Classes

```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

throw new ValidationError("Email không hợp lệ", "email");
```

Lợi ích: có thể `instanceof` để phân loại lỗi.

---

## Xử lý lỗi trong Async/Await

```js
async function fetchData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Bắt cả network error lẫn HTTP error
    console.error(err);
  }
}
```

---

## Các loại Error built-in

| Error            | Khi nào xảy ra                         |
| ---------------- | -------------------------------------- |
| `ReferenceError` | Truy cập biến chưa khai báo            |
| `TypeError`      | Sai kiểu (gọi `null` như function)     |
| `SyntaxError`    | Code sai cú pháp                       |
| `RangeError`     | Giá trị ngoài phạm vi (Stack overflow) |

---

## 📂 File ví dụ

- [`example.js`](./example.js) — try/catch/finally, custom errors, async error handling
