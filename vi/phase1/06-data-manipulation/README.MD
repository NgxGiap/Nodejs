# 06 — Xử lý dữ liệu (Arrays & Objects)

## Array Methods quan trọng

| Method       | Mục đích                      | Trả về                   |
| ------------ | ----------------------------- | ------------------------ |
| `.map()`     | Biến đổi từng phần tử         | Array mới                |
| `.filter()`  | Lọc phần tử theo điều kiện    | Array mới                |
| `.reduce()`  | Gộp toàn bộ thành một giá trị | Bất kỳ                   |
| `.find()`    | Tìm phần tử đầu tiên thỏa mãn | Phần tử hoặc `undefined` |
| `.flatMap()` | Map rồi làm phẳng 1 cấp       | Array mới                |

### Chuỗi method (Method chaining)

```js
const result = users
  .filter((u) => u.active)
  .map((u) => u.name)
  .sort();
```

---

## Object Methods

### Destructuring (Giải cấu trúc)

```js
const { name, age, city = "HN" } = user; // city có default value
const { name: fullName } = user; // rename
```

### Dynamic Keys (Khóa động)

```js
const key = "score";
const obj = { [key]: 100 }; // { score: 100 }
```

### `Object.entries()` / `Object.keys()` / `Object.values()`

```js
Object.keys(obj); // ["key1", "key2"]
Object.values(obj); // [val1, val2]
Object.entries(obj); // [["key1", val1], ["key2", val2]]
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — map/filter/reduce/find/flatMap, destructuring, Object.entries
