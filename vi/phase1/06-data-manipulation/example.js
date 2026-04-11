// ============================================================
// 06 — Xử lý dữ liệu: Arrays & Objects
// ============================================================

const products = [
  { id: 1, name: "Laptop", price: 25000000, category: "tech", inStock: true },
  { id: 2, name: "Chuột", price: 350000, category: "tech", inStock: false },
  { id: 3, name: "Bàn phím", price: 800000, category: "tech", inStock: true },
  { id: 4, name: "Ghế công thái học", price: 4500000, category: "furniture", inStock: true },
  { id: 5, name: "Đèn bàn", price: 450000, category: "furniture", inStock: true },
];

// --- 1. filter — Lọc sản phẩm còn hàng ---
const available = products.filter(p => p.inStock);
console.log("Còn hàng:", available.length); // 4

// --- 2. map — Lấy danh sách tên ---
const names = products.map(p => p.name);
console.log("Tên SP:", names);

// --- 3. map — Tạo object mới (transform) ---
const priceList = products.map(p => ({
  name: p.name,
  priceFormatted: p.price.toLocaleString("vi-VN") + "đ"
}));
console.log("\nBảng giá:", priceList);

// --- 4. reduce — Tính tổng tiền ---
const totalValue = products.reduce((acc, p) => acc + p.price, 0);
console.log("\nTổng giá trị kho:", totalValue.toLocaleString("vi-VN") + "đ");

// reduce nâng cao: nhóm theo category
const grouped = products.reduce((acc, p) => {
  if (!acc[p.category]) acc[p.category] = [];
  acc[p.category].push(p.name);
  return acc;
}, {});
console.log("\nNhóm theo category:", grouped);

// --- 5. find — Tìm sản phẩm theo id ---
const found = products.find(p => p.id === 3);
console.log("\nTìm id=3:", found?.name); // "Bàn phím"

// --- 6. Method chaining ---
const cheapTechItems = products
  .filter(p => p.category === "tech" && p.inStock)
  .filter(p => p.price < 1000000)
  .map(p => p.name);
console.log("\nTech < 1tr còn hàng:", cheapTechItems);

// --- 7. flatMap ---
const orders = [
  { orderId: 1, items: ["Laptop", "Chuột"] },
  { orderId: 2, items: ["Bàn phím"] },
  { orderId: 3, items: ["Ghế", "Đèn bàn"] },
];
const allItems = orders.flatMap(o => o.items);
console.log("\nTất cả items:", allItems);
// Không dùng flatMap: orders.map(o => o.items) → [["Laptop","Chuột"], ["Bàn phím"], ...]

// --- 8. Object Destructuring ---
console.log("\n=== DESTRUCTURING ===");
const user = { name: "An", age: 25, city: "Hà Nội", role: "admin" };

// Cơ bản
const { name, age } = user;
console.log(name, age); // "An" 25

// Đổi tên
const { name: fullName, role: userRole } = user;
console.log(fullName, userRole); // "An" "admin"

// Default value
const { city, country = "Việt Nam" } = user;
console.log(city, country); // "Hà Nội" "Việt Nam"

// Destructuring trong tham số hàm
function displayUser({ name, age, city = "Không rõ" }) {
  console.log(`${name}, ${age} tuổi, sống tại ${city}`);
}
displayUser(user);

// --- 9. Dynamic Keys ---
console.log("\n=== DYNAMIC KEYS ===");
const field = "email";
const value = "an@example.com";

const update = { [field]: value };
console.log(update); // { email: 'an@example.com' }

// Ứng dụng: cập nhật một field động
function updateField(obj, key, val) {
  return { ...obj, [key]: val };
}
const updated = updateField(user, "age", 26);
console.log(updated);

// --- 10. Object.entries / keys / values ---
console.log("\n=== OBJECT ITERATION ===");
const scores = { An: 90, Bình: 85, Chi: 92 };

console.log("Keys:", Object.keys(scores));
console.log("Values:", Object.values(scores));
console.log("Entries:", Object.entries(scores));

// Duyệt object như map/filter
const topScorers = Object.entries(scores)
  .filter(([, score]) => score >= 90)
  .map(([name]) => name);
console.log("Top scorers:", topScorers); // ["An", "Chi"]