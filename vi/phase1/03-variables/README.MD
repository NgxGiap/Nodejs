# 03 — Biến & Kiểu dữ liệu

## Khai báo biến

### `var` — Đã lỗi thời ⚠️

- **Function scope** (không có block scope)
- Bị **hoisting** lên đầu function → dễ gây bug khó đoán
- **Không dùng** trong code hiện đại

### `let` — Biến có thể thay đổi

- **Block scope** `{ }`
- Có **Temporal Dead Zone (TDZ)**: không thể dùng trước khi khai báo
- Dùng khi giá trị cần thay đổi (vòng lặp, counter...)

### `const` — Hằng số (ưu tiên dùng)

- **Block scope**
- Không thể **gán lại** (reassign)
- Với object/array: không thể gán lại biến, nhưng **vẫn có thể thay đổi nội dung bên trong**

```js
const user = { name: "An" };
user.name = "Bình"; // ✅ Hợp lệ — thay đổi property
user = {}; // ❌ Lỗi — không thể gán lại
```

---

## Temporal Dead Zone (TDZ)

```js
console.log(x); // ❌ ReferenceError — TDZ
let x = 5;

console.log(y); // undefined — var được hoisted
var y = 5;
```

---

## Kiểu dữ liệu

### Primitives (Nguyên thủy) — Lưu trên Stack

| Kiểu        | Ví dụ           | Ghi chú                     |
| ----------- | --------------- | --------------------------- |
| `string`    | `"Hello"`       | Chuỗi ký tự                 |
| `number`    | `42`, `3.14`    | Số nguyên và thực           |
| `boolean`   | `true`, `false` | Đúng/Sai                    |
| `null`      | `null`          | Không có giá trị (có chủ ý) |
| `undefined` | `undefined`     | Chưa được gán giá trị       |
| `symbol`    | `Symbol('id')`  | Định danh duy nhất          |

### References (Tham chiếu) — Lưu trên Heap

| Kiểu       | Ví dụ            |
| ---------- | ---------------- |
| `Object`   | `{ name: "An" }` |
| `Array`    | `[1, 2, 3]`      |
| `Function` | `() => {}`       |

---

## Kiểm tra kiểu dữ liệu

```js
typeof "hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" ← bug nổi tiếng của JS!
typeof []; // "object"
typeof {}; // "object"
typeof function () {}; // "function"

// Kiểm tra Array chính xác:
Array.isArray([1, 2, 3]); // true
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — var/let/const, TDZ, typeof, các kiểu dữ liệu
