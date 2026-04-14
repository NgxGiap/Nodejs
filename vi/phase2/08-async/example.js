// ============================================================
// 08 — Lập trình bất đồng bộ
// ============================================================

// Helper: giả lập delay (thay thế cho API thực)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeDB = {
  users: [{ id: 1, name: "An", orderId: 101 }],
  orders: [{ id: 101, product: "Laptop", userId: 1 }],
};

// --- 1. CALLBACK STYLE (cũ) ---
console.log("=== CALLBACKS ===");

function getUser_CB(id, callback) {
  setTimeout(() => {
    const user = fakeDB.users.find(u => u.id === id);
    user ? callback(null, user) : callback(new Error("User not found"));
  }, 100);
}

function getOrder_CB(orderId, callback) {
  setTimeout(() => {
    const order = fakeDB.orders.find(o => o.id === orderId);
    order ? callback(null, order) : callback(new Error("Order not found"));
  }, 100);
}

// Callback Hell (lồng nhau — khó đọc)
getUser_CB(1, (err, user) => {
  if (err) return console.error("Lỗi:", err.message);
  console.log("Callback - User:", user.name);
  getOrder_CB(user.orderId, (err, order) => {
    if (err) return console.error("Lỗi:", err.message);
    console.log("Callback - Order:", order.product);
    // Nếu còn bước nữa → lại lồng thêm :(
  });
});

// --- 2. PROMISE STYLE ---
console.log("\n=== PROMISES ===");

function getUser_P(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = fakeDB.users.find(u => u.id === id);
      user ? resolve(user) : reject(new Error("User not found"));
    }, 100);
  });
}

function getOrder_P(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = fakeDB.orders.find(o => o.id === orderId);
      order ? resolve(order) : reject(new Error("Order not found"));
    }, 100);
  });
}

// Promise chain — phẳng hơn callback hell
getUser_P(1)
  .then(user => {
    console.log("Promise - User:", user.name);
    return getOrder_P(user.orderId);
  })
  .then(order => {
    console.log("Promise - Order:", order.product);
  })
  .catch(err => console.error("Promise Error:", err.message))
  .finally(() => console.log("Promise - Xong!"));

// --- 3. ASYNC/AWAIT STYLE ✅ ---
async function loadUserData(userId) {
  try {
    const user = await getUser_P(userId);
    console.log("\nAsync - User:", user.name);

    const order = await getOrder_P(user.orderId);
    console.log("Async - Order:", order.product);

    return { user, order };
  } catch (err) {
    console.error("Async Error:", err.message);
  } finally {
    console.log("Async - Xong!");
  }
}

loadUserData(1);

// --- 4. Promise Combinators ---
async function combinatorDemo() {
  const task1 = delay(200).then(() => "Task 1 xong sau 200ms");
  const task2 = delay(100).then(() => "Task 2 xong sau 100ms");
  const task3 = delay(300).then(() => "Task 3 xong sau 300ms");

  // Promise.all: chờ TẤT CẢ (nhanh hơn await tuần tự)
  const start = Date.now();
  const results = await Promise.all([task1, task2, task3]);
  console.log(`\nPromise.all (${Date.now() - start}ms):`, results);
  // ~300ms thay vì 600ms nếu await tuần tự

  // Promise.race: kết quả nhanh nhất
  const t1 = delay(200).then(() => "Slow");
  const t2 = delay(50).then(() => "Fast");
  const winner = await Promise.race([t1, t2]);
  console.log("Promise.race winner:", winner); // "Fast"

  // Promise.allSettled: kết quả tất cả kể cả lỗi
  const p1 = Promise.resolve("OK");
  const p2 = Promise.reject(new Error("Thất bại"));
  const p3 = Promise.resolve("OK nữa");

  const settled = await Promise.allSettled([p1, p2, p3]);
  settled.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("allSettled ✅:", result.value);
    } else {
      console.log("allSettled ❌:", result.reason.message);
    }
  });
}

combinatorDemo();