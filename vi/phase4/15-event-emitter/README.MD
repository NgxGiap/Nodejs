# 15 — Event Emitter

## Pattern Pub/Sub là gì?

**Publish/Subscribe** (Observer pattern) là mô hình giao tiếp **gián tiếp**:

```
Không có Pub/Sub:                    Có Pub/Sub:
─────────────────                    ─────────────────────────────
A gọi trực tiếp B, C, D             A phát event "user:created"
A phải biết B, C, D tồn tại         B, C, D tự đăng ký lắng nghe
Thêm D → phải sửa code A            Thêm E → chỉ cần E đăng ký
Coupling cao                         Coupling thấp
```

---

## EventEmitter trong Node.js

```js
const { EventEmitter } = require("events");

const emitter = new EventEmitter();

// Lắng nghe (Subscribe)
emitter.on("event-name", (data) => {
  console.log("Nhận được:", data);
});

// Phát (Publish)
emitter.emit("event-name", { message: "hello" });
```

---

## API đầy đủ

| Method                       | Mô tả                                   |
| ---------------------------- | --------------------------------------- |
| `.on(event, fn)`             | Lắng nghe mỗi lần event xảy ra          |
| `.once(event, fn)`           | Chỉ lắng nghe **một lần duy nhất**      |
| `.emit(event, ...args)`      | Phát event, truyền dữ liệu              |
| `.off(event, fn)`            | Hủy một listener cụ thể                 |
| `.removeAllListeners(event)` | Hủy toàn bộ listeners của event         |
| `.listenerCount(event)`      | Số lượng listeners đang đăng ký         |
| `.eventNames()`              | Danh sách tất cả event đang có listener |
| `.setMaxListeners(n)`        | Tăng giới hạn listeners (mặc định: 10)  |

---

## Kế thừa EventEmitter

Pattern phổ biến nhất — class của bạn **kế thừa** EventEmitter:

```js
class OrderService extends EventEmitter {
  createOrder(data) {
    const order = { id: Date.now(), ...data };
    this.emit("order:created", order);
    return order;
  }
}

const orderService = new OrderService();
orderService.on("order:created", (order) => {
  // Gửi email xác nhận
  sendConfirmationEmail(order);
});
```

---

## Error Event — Bắt buộc phải xử lý!

```js
emitter.on("error", (err) => {
  console.error("Lỗi:", err.message);
});

// Nếu KHÔNG có "error" listener và emit("error") được gọi
// → Node.js sẽ CRASH toàn bộ process!
```

---

## Memory Leak với listeners

```js
// ⚠️ Cảnh báo: Mỗi lần gọi hàm → thêm listener mới → memory leak
function addHandler() {
  emitter.on("data", handler); // Tích lũy sau nhiều lần gọi!
}

// ✅ Đúng cách: kiểm tra trước hoặc dùng once()
// Hoặc lưu reference để .off() sau này
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — EventEmitter cơ bản, kế thừa class, Event Bus, error handling, memory leak
