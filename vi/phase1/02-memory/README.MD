# 02 — Cơ chế bộ nhớ (Memory Mechanics)

## Stack vs Heap

JavaScript sử dụng **hai vùng nhớ** khác nhau để lưu trữ dữ liệu:

### Stack (Ngăn xếp)

- Lưu **Primitives**: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`
- Kích thước **cố định**, cấp phát và giải phóng tự động
- Truy cập **nhanh hơn** Heap
- Biến lưu **trực tiếp giá trị**

```
Stack:
┌─────────────┐
│  a = 10     │  ← giá trị thực
│  b = 10     │  ← bản sao độc lập
└─────────────┘
```

### Heap (Đống)

- Lưu **References**: `Object`, `Array`, `Function`
- Kích thước **động**, phân bổ linh hoạt
- Biến lưu **địa chỉ (reference)** trỏ đến dữ liệu thực trong Heap

```
Stack:              Heap:
┌──────────────┐    ┌─────────────────────┐
│ objA = 0x01 ─────→│ { name: "An" }      │
│ objB = 0x01 ─────→│ (cùng một địa chỉ!) │
└──────────────┘    └─────────────────────┘
```

---

## The Reference Trap (Bẫy tham chiếu)

```js
const objA = { name: "An" };
const objB = objA; // Sao chép ĐỊA CHỈ, không phải giá trị!

objB.name = "Bình";
console.log(objA.name); // "Bình" — objA bị thay đổi theo!
```

> ⚠️ Đây là nguồn gốc của rất nhiều bug khó phát hiện!

---

## Immutability (Bất biến)

### Shallow Copy (Sao chép nông)

Chỉ sao chép **một lớp** — các object lồng bên trong vẫn dùng chung địa chỉ.

```js
// Cách 1: Spread operator
const copy1 = { ...original };

// Cách 2: Object.assign
const copy2 = Object.assign({}, original);
```

### Deep Copy (Sao chép sâu)

Sao chép **toàn bộ cây dữ liệu**, kể cả object lồng nhau.

```js
const deepCopy = structuredClone(original); // ✅ Node.js 17+
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — Minh họa Stack/Heap, Reference Trap, Shallow & Deep Copy
