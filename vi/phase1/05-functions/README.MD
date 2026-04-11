# 05 — Hàm & Scope

## Các loại hàm

### Function Declaration

```js
function greet(name) {
  return `Hello, ${name}!`;
}
```

- Được **hoisted** — có thể gọi trước khi khai báo
- Có `this` riêng

### Function Expression

```js
const greet = function (name) {
  return `Hello, ${name}!`;
};
```

- **Không hoisted**
- Có `this` riêng

### Arrow Function `=>` ✅ (phổ biến nhất)

```js
const greet = (name) => `Hello, ${name}!`;
```

- **Không có `this` riêng** — kế thừa `this` từ scope bao ngoài
- Cú pháp ngắn gọn
- Không dùng làm method của object nếu cần `this`

---

## Sự khác biệt về `this`

```js
const obj = {
  name: "An",
  // ✅ Regular function: this = obj
  greetRegular: function () {
    return this.name; // "An"
  },
  // ❌ Arrow function: this = scope ngoài (không phải obj)
  greetArrow: () => {
    return this?.name; // undefined
  },
};
```

---

## Scope

### Global Scope

Biến khai báo ngoài tất cả function/block → accessible từ mọi nơi.

### Function Scope

Biến khai báo trong function → chỉ tồn tại trong function đó.

### Block Scope

Biến `let`/`const` khai báo trong `{}` → chỉ tồn tại trong block đó.

```
Global
  └── Function Scope
        └── Block Scope
```

---

## Closures (Bao đóng)

Closure là khi một **inner function** "ghi nhớ" và truy cập được **biến của outer function** — ngay cả sau khi outer function đã kết thúc.

```js
function createCounter() {
  let count = 0; // Biến "private"
  return {
    increment: () => ++count,
    getValue: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.getValue()); // 2
// Không thể truy cập count từ bên ngoài!
```

**Ứng dụng của Closure:**

- Tạo biến **private** (data privacy)
- **Memoization** (cache kết quả)
- **Partial application** và **currying**
- Callback và event handlers

---

## 📂 File ví dụ

- [`example.js`](./example.js) — các loại hàm, this binding, scope chain, closures
