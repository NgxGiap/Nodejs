# 04 — Toán tử & Logic

## So sánh bằng: `==` vs `===`

### `==` Loose Equality (So sánh lỏng)

Tự động **ép kiểu** (type coercion) trước khi so sánh → dễ gây kết quả bất ngờ.

```js
0 == false; // true  ← false bị ép thành 0
"" == false; // true
null == undefined; // true
1 == "1"; // true  ← "1" bị ép thành 1
```

### `===` Strict Equality (So sánh nghiêm ngặt) ✅

So sánh cả **giá trị** và **kiểu dữ liệu**. Luôn dùng cái này.

```js
1 === "1"; // false
null === undefined; // false
0 === false; // false
```

---

## Toán tử hiện đại

### `??` Nullish Coalescing

Trả về vế phải **chỉ khi** vế trái là `null` hoặc `undefined`.

```js
const name = null ?? "Khách"; // "Khách"
const count = 0 ?? 10; // 0  ← khác với ||
const count2 = 0 || 10; // 10 ← || coi 0 là falsy
```

> 💡 Dùng `??` thay `||` khi `0`, `""`, `false` là giá trị hợp lệ!

### `?.` Optional Chaining

Truy cập thuộc tính lồng nhau **an toàn** — trả về `undefined` thay vì throw lỗi.

```js
const user = null;
console.log(user?.address?.city); // undefined (không crash)
console.log(user.address.city); // ❌ TypeError!

// Gọi method an toàn
user?.greet?.(); // không lỗi nếu greet không tồn tại
```

---

## Logical Operators

```js
// && (AND): trả về giá trị falsy đầu tiên, hoặc giá trị cuối cùng
console.log(1 && 2 && 3); // 3
console.log(1 && false && 3); // false

// || (OR): trả về giá trị truthy đầu tiên
console.log(0 || "" || "hello"); // "hello"
console.log(false || null); // null

// ! (NOT)
console.log(!true); // false
console.log(!0); // true  ← 0 là falsy
console.log(!!"hi"); // true  ← !! chuyển sang boolean
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — ==vs===, ??, ?., logical operators
