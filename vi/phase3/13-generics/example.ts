// ============================================================
// 13 — Generics
// Chạy: npx ts-node example.ts
// ============================================================

// ========================
// PHẦN 1: GENERIC FUNCTIONS
// ========================

// --- 1. Cơ bản ---
function identity<T>(value: T): T {
  return value;
}
console.log(identity(42)); // 42  — T = number
console.log(identity("hello")); // "hello" — T = string
console.log(identity([1, 2, 3])); // [1,2,3] — T = number[]

// --- 2. Generic với Array ---
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function zip<A, B>(arrA: A[], arrB: B[]): [A, B][] {
  const length = Math.min(arrA.length, arrB.length);
  return Array.from({ length }, (_, i) => [arrA[i], arrB[i]]);
}

console.log("\n=== GENERIC ARRAYS ===");
console.log(getFirst([10, 20, 30])); // 10
console.log(getLast(["a", "b", "c"])); // "c"
console.log(chunk([1, 2, 3, 4, 5, 6], 2)); // [[1,2],[3,4],[5,6]]
console.log(zip(["An", "Bình"], [25, 30])); // [["An",25],["Bình",30]]

// --- 3. Nhiều type parameters ---
function mapObject<K extends string, V, R>(
  obj: Record<K, V>,
  fn: (value: V, key: K) => R,
): Record<K, R> {
  const result = {} as Record<K, R>;
  for (const key in obj) {
    result[key] = fn(obj[key], key);
  }
  return result;
}

const scores = { an: 85, binh: 92, chi: 78 };
const grades = mapObject(scores, (score) =>
  score >= 90 ? "A" : score >= 80 ? "B" : "C",
);
console.log("Grades:", grades); // { an: 'B', binh: 'A', chi: 'C' }

// ========================
// PHẦN 2: CONSTRAINTS
// ========================

console.log("\n=== CONSTRAINTS ===");

// --- 4. extends constraint ---
interface HasId {
  id: number;
}
interface HasName {
  name: string;
}
interface HasLength {
  length: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

function sortByName<T extends HasName>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

function logLength<T extends HasLength>(label: string, value: T): T {
  console.log(`${label} có độ dài: ${value.length}`);
  return value;
}

const users = [
  { id: 1, name: "Chi", email: "chi@e.com" },
  { id: 2, name: "An", email: "an@e.com" },
  { id: 3, name: "Bình", email: "binh@e.com" },
];

console.log("findById(2):", findById(users, 2)?.name);
console.log(
  "sortByName:",
  sortByName(users).map((u) => u.name),
);
logLength("string", "hello world");
logLength("array", [1, 2, 3, 4, 5]);

// --- 5. keyof constraint ---
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((k) => (result[k] = obj[k]));
  return result;
}

const product = { id: 1, name: "Laptop", price: 25000000, inStock: true };

console.log("\n=== KEYOF ===");
console.log(getProperty(product, "name")); // "Laptop"
console.log(getProperty(product, "price")); // 25000000
// getProperty(product, "xyz"); // ❌ Lỗi compile

const updated = setProperty(product, "price", 22000000);
console.log("Updated price:", updated.price);

const preview = pick(product, ["id", "name"]);
console.log("Preview:", preview);

// ========================
// PHẦN 3: GENERIC CLASSES
// ========================

console.log("\n=== GENERIC CLASSES ===");

// --- 6. Stack (ngăn xếp) ---
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log("Stack:", numStack.toArray()); // [1,2,3]
console.log("Peek:", numStack.peek()); // 3
console.log("Pop:", numStack.pop()); // 3
console.log("Size:", numStack.size); // 2

// --- 7. In-Memory Repository ---
interface Entity {
  id: number;
}

class Repository<T extends Entity> {
  private store = new Map<number, T>();

  save(entity: T): T {
    this.store.set(entity.id, { ...entity }); // Lưu bản copy
    return entity;
  }

  findById(id: number): T | undefined {
    return this.store.get(id);
  }

  findAll(): T[] {
    return Array.from(this.store.values());
  }

  findWhere(predicate: (item: T) => boolean): T[] {
    return this.findAll().filter(predicate);
  }

  update(id: number, partial: Partial<Omit<T, "id">>): T | undefined {
    const existing = this.findById(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...partial, id } as T;
    this.store.set(id, updated);
    return updated;
  }

  delete(id: number): boolean {
    return this.store.delete(id);
  }

  count(): number {
    return this.store.size;
  }
}

interface User extends Entity {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface Post extends Entity {
  title: string;
  authorId: number;
  published: boolean;
}

console.log("\n=== REPOSITORY ===");
const userRepo = new Repository<User>();
userRepo.save({ id: 1, name: "An", email: "an@e.com", role: "admin" });
userRepo.save({ id: 2, name: "Bình", email: "binh@e.com", role: "user" });
userRepo.save({ id: 3, name: "Chi", email: "chi@e.com", role: "user" });

console.log(
  "All:",
  userRepo.findAll().map((u) => u.name),
);
console.log(
  "Admins:",
  userRepo.findWhere((u) => u.role === "admin").map((u) => u.name),
);
userRepo.update(2, { name: "Bình Updated" });
console.log("Updated:", userRepo.findById(2)?.name);
userRepo.delete(3);
console.log("Count:", userRepo.count());

// ========================
// PHẦN 4: PATTERNS THỰC TẾ
// ========================

console.log("\n=== API RESPONSE PATTERN ===");

// --- 8. Generic API Response ---
interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
  timestamp: string;
}

function successResponse<T>(data: T, message = "OK"): ApiResponse<T> {
  return { data, success: true, message, timestamp: new Date().toISOString() };
}

function errorResponse<T = null>(message: string): ApiResponse<T> {
  return {
    data: null,
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
}

type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}>;

function paginate<T>(
  items: T[],
  page: number,
  pageSize: number,
): PaginatedResponse<T> {
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return successResponse({
    items: paged,
    total: items.length,
    page,
    pageSize,
  });
}

const allUsers = userRepo.findAll();
const page1 = paginate(allUsers, 1, 2);
console.log(
  "Page 1:",
  page1.data?.items.map((u) => u.name),
);
console.log("Total:", page1.data?.total);

const notFound = errorResponse<User>("User không tồn tại");
console.log("Error response:", notFound.message, "success:", notFound.success);
