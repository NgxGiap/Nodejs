# 08 — Lập trình bất đồng bộ (Asynchronous)

## Tại sao cần Async?

Các tác vụ như đọc file, gọi API, query DB **mất thời gian**. Nếu chờ đồng bộ, ứng dụng sẽ bị **đóng băng**. JavaScript giải quyết bằng mô hình bất đồng bộ.

---

## 1. Callbacks

Hàm được truyền vào và gọi **sau khi** tác vụ hoàn thành.

```js
fs.readFile("data.txt", "utf-8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```

**Callback Hell** — lồng nhau quá nhiều:

```js
getUser(id, (err, user) => {
  getOrders(user.id, (err, orders) => {
    getItems(orders[0].id, (err, items) => {
      // ← Khó đọc, khó maintain
    });
  });
});
```

---

## 2. Promises

Object đại diện cho một giá trị **có thể có trong tương lai**.

**Ba trạng thái:**

- `pending` — đang chờ
- `fulfilled` — thành công (kèm giá trị)
- `rejected` — thất bại (kèm lỗi)

```js
fetchUser(1)
  .then((user) => fetchOrders(user.id))
  .then((orders) => console.log(orders))
  .catch((err) => console.error(err))
  .finally(() => console.log("Xong!"));
```

**Promise Combinators:**

```js
Promise.all([p1, p2, p3]); // Chờ TẤT CẢ — một cái fail → all fail
Promise.allSettled([p1, p2]); // Chờ TẤT CẢ — không quan tâm fail/success
Promise.race([p1, p2]); // Lấy kết quả NHANH NHẤT
Promise.any([p1, p2]); // Lấy kết quả THÀNH CÔNG đầu tiên
```

---

## 3. Async/Await ✅

Syntactic sugar trên Promises — code trông như **đồng bộ** nhưng thực ra bất đồng bộ.

```js
async function loadData() {
  try {
    const user = await fetchUser(1);
    const orders = await fetchOrders(user.id);
    return orders;
  } catch (err) {
    console.error(err);
  }
}
```

> ⚠️ `await` chỉ dùng được bên trong `async function`

---

## 📂 File ví dụ

- [`example.js`](./example.js) — callback hell → promise → async/await, Promise combinators
