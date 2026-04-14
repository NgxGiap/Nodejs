/**
 * ================================
 * 1. Reference Trap
 * ================================
 */
const a = { name: "Giap" };
const b = a;

b.name = "Changed";

console.log("Reference Trap:");
console.log(a.name); // "Changed" (a bị ảnh hưởng vì cùng reference)
console.log("\n");


/**
 * ================================
 * 2. Shallow Copy vs Deep Copy
 * ================================
 */
const user = {
  name: "Giap",
  address: { city: "Hanoi" },
};

// Shallow copy (spread operator)
const copy1 = { ...user };
copy1.address.city = "Nam Dinh";

console.log("Shallow Copy:");
console.log(user.address.city); // "Nam Dinh" (bị ảnh hưởng)
console.log("\n");

// Deep copy (structuredClone)
const copy2 = structuredClone(user);
copy2.address.city = "Ninh Binh";

console.log("Deep Copy:");
console.log(user.address.city);  // "Nam Dinh" (không bị ảnh hưởng)
console.log(copy2.address.city); // "Ninh Binh"
console.log("\n");


/**
 * ================================
 * 3. Deep Copy với Array
 * ================================
 */
const users = [
  { name: "A", score: 10 },
  { name: "B", score: 20 },
];

const newUsers = structuredClone(users); // Deep copy
newUsers[0].score = 99;

console.log("Deep Copy Array:");
console.log("Original:", users);   // KHÔNG bị ảnh hưởng
console.log("Cloned:", newUsers);  // Đã thay đổi
console.log("\n");


/**
 * ================================
 * 4. Update User (Immutable)
 * ================================
 */
function updateUser(users, name, newData) {
  return users.map((user) => {
    if (user.name === name) {
      return { ...user, ...newData }; // tạo object mới
    }
    return user;
  });
}

const users1 = [
  { name: "An", age: 20 },
  { name: "Bình", age: 25 },
];

const result1 = updateUser(users1, "An", { age: 21 });

console.log("Update User:");
console.log("Original:", users1); // không đổi
console.log("Updated:", result1); // đã update
console.log("\n");


/**
 * ================================
 * 5. Update User với Deep Clone (optional)
 * ================================
 */
function updateUserWithClone(users, name, newData) {
  const clonedUsers = structuredClone(users);

  return clonedUsers.map((user) => {
    if (user.name === name) {
      return { ...user, ...newData };
    }
    return user;
  });
}

const users2 = [
  { name: "An", age: 20 },
  { name: "Bình", age: 25 },
];

const result2 = updateUserWithClone(users2, "An", { age: 21 });

console.log("Update User (Deep Clone):");
console.log("Original:", users2);
console.log("Updated:", result2);