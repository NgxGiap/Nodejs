# 07 — Execution Context & Event Loop

## Call Stack

**Call Stack** là nơi JavaScript theo dõi các function đang được thực thi — hoạt động theo cơ chế **LIFO** (Last In, First Out).

```
Gọi: main() → a() → b()

Call Stack:
┌──────┐
│ b()  │  ← đang thực thi
│ a()  │
│main()│
└──────┘

Sau khi b() xong → pop ra:
┌──────┐
│ a()  │  ← tiếp tục
│main()│
└──────┘
```

---

## Event Loop — Vòng lặp sự kiện

```
┌─────────────────────────────────────────┐
│           JavaScript Runtime            │
│                                         │
│  ┌──────────┐     ┌─────────────────┐   │
│  │Call Stack│     │   Web APIs /    │   │
│  │          │────→│   Node APIs     │   │
│  │          │     │ (setTimeout...) │   │
│  └──────────┘     └────────┬────────┘   │
│        ↑                   │            │
│        │           ┌───────▼────────┐   │
│  Event Loop        │  Task Queues   │   │
│  (kiểm tra)        │                │   │
│                    │ Microtask Queue│   │
│                    │ (Promise, tick)│   │
│                    │                │   │
│                    │ Macrotask Queue│   │
│                    │ (setTimeout..) │   │
│                    └────────────────┘   │
└─────────────────────────────────────────┘
```

**Quy trình:**

1. Chạy hết code đồng bộ trong Call Stack
2. **Xử lý hết** Microtask Queue (Promise callbacks, `process.nextTick`)
3. Lấy **một** task từ Macrotask Queue
4. Quay lại bước 2

---

## Task Queues

### Macrotasks (Ưu tiên thấp hơn)

- `setTimeout`, `setInterval`
- I/O callbacks, `setImmediate`

### Microtasks (Ưu tiên cao hơn)

- `Promise.then()`, `.catch()`, `.finally()`
- `process.nextTick` (Node.js — cao nhất!)
- `queueMicrotask()`

> 🔑 **Quy tắc vàng**: Microtasks luôn chạy **trước** Macrotasks tiếp theo.

---

## 📂 File ví dụ

- [`example.js`](./example.js) — minh họa thứ tự thực thi, microtask vs macrotask
