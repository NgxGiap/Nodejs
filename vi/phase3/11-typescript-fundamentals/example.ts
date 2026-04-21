// ============================================================
// 11 — TypeScript Fundamentals
// Chạy: npx ts-node example.ts
// ============================================================

// --- 1. Kiểu cơ bản & Inference ---
console.log("=== KIỂU CƠ BẢN ===");

// Khai báo rõ ràng
const userName: string = "An";
const age: number = 25;
const isAdmin: boolean = false;

// Inference — TS tự suy luận, không cần ghi kiểu
const score = 90; // number
const greeting = "Hello"; // string
const flags = [true, false]; // boolean[]

console.log(`${userName}, ${age} tuổi, admin: ${isAdmin}`);

// --- 2. unknown vs any ---
console.log("\n=== UNKNOWN VS ANY ===");

// unknown: phải kiểm tra kiểu trước khi dùng — AN TOÀN
function processInput(input: unknown): string {
  if (typeof input === "string") {
    return input.toUpperCase(); // ✅ TS biết chắc là string
  }
  if (typeof input === "number") {
    return input.toFixed(2); // ✅ TS biết chắc là number
  }
  if (Array.isArray(input)) {
    return input.join(", "); // ✅ TS biết chắc là array
  }
  return String(input);
}

console.log(processInput("hello")); // "HELLO"
console.log(processInput(3.14159)); // "3.14"
console.log(processInput([1, 2, 3])); // "1, 2, 3"
console.log(processInput(true)); // "true"

// any: mất hoàn toàn type safety — TRÁNH dùng
// let data: any = "hello";
// data.toUpperCase();  // Không lỗi compile dù data có thể là number

// --- 3. void & never ---
console.log("\n=== VOID & NEVER ===");

function logMessage(msg: string): void {
  console.log(`[LOG] ${msg}`);
  // return undefined; // Hoặc không return
}

function failWith(message: string): never {
  throw new Error(message);
}

// never trong exhaustive check — TS đảm bảo xử lý hết mọi case
type TrafficLight = "red" | "yellow" | "green";

function getAction(light: TrafficLight): string {
  switch (light) {
    case "red":
      return "Dừng lại";
    case "yellow":
      return "Chuẩn bị";
    case "green":
      return "Đi";
    default:
      // Nếu thêm màu mới vào TrafficLight mà quên xử lý → TS báo lỗi!
      return failWith(`Màu đèn không hợp lệ: ${light}`);
  }
}

logMessage("Server khởi động");
console.log(getAction("red"));
console.log(getAction("green"));

// --- 4. Arrays & Tuples ---
console.log("\n=== ARRAYS & TUPLES ===");

const numbers: number[] = [10, 20, 30, 40, 50];
const matrix: number[][] = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// Tuple: cấu trúc cố định
type Coordinate = [number, number];
type UserRecord = [id: number, name: string, active: boolean];

const origin: Coordinate = [0, 0];
const user1: UserRecord = [1, "An", true];
const user2: UserRecord = [2, "Bình", false];

// Destructure tuple — named tuple giúp code tự document
const [id, name, active] = user1;
console.log(`User #${id}: ${name} (${active ? "hoạt động" : "vô hiệu"})`);

// Swap hai giá trị bằng tuple
function swap<T>(a: T, b: T): [T, T] {
  return [b, a];
}
const [first, second] = swap(1, 99);
console.log(`Swap: ${first}, ${second}`); // 99, 1

// --- 5. Union Types & Literal Types ---
console.log("\n=== UNION & LITERAL TYPES ===");

type ID = string | number;
type Status = "pending" | "processing" | "done" | "failed";
type Priority = 1 | 2 | 3; // 1=cao, 2=trung bình, 3=thấp

interface Task {
  id: ID;
  title: string;
  status: Status;
  priority: Priority;
}

const tasks: Task[] = [
  { id: 1, title: "Học TypeScript", status: "done", priority: 1 },
  { id: "T-02", title: "Viết README", status: "processing", priority: 2 },
  { id: 3, title: "Review code", status: "pending", priority: 1 },
];

// Lọc theo status
const doneTasks = tasks.filter((t) => t.status === "done");
console.log(
  "Xong:",
  doneTasks.map((t) => t.title),
);

// Lọc theo priority cao
const highPriority = tasks.filter((t) => t.priority === 1);
console.log(
  "Ưu tiên cao:",
  highPriority.map((t) => t.title),
);

// --- 6. Type Narrowing (Thu hẹp kiểu) ---
console.log("\n=== TYPE NARROWING ===");

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // TS biết có .radius
    case "rectangle":
      return shape.width * shape.height; // TS biết có .width, .height
    case "triangle":
      return 0.5 * shape.base * shape.height; // TS biết có .base, .height
  }
}

const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "rectangle", width: 4, height: 6 },
  { kind: "triangle", base: 3, height: 8 },
];

shapes.forEach((s) => {
  console.log(`${s.kind}: diện tích = ${getArea(s).toFixed(2)}`);
});

// --- 7. Optional & Default Parameters ---
console.log("\n=== OPTIONAL & DEFAULT ===");

function createProduct(
  name: string,
  price: number,
  category?: string, // Optional
  inStock: boolean = true, // Default
  tags: string[] = [], // Default array
) {
  return {
    name,
    price,
    category: category ?? "Chưa phân loại",
    inStock,
    tags,
  };
}

console.log(createProduct("Laptop", 25000000));
console.log(
  createProduct("Chuột", 350000, "Tech", false, ["gaming", "wireless"]),
);

// --- 8. Type Assertions ---
console.log("\n=== TYPE ASSERTIONS ===");

// Khi TS không thể tự suy luận — ta "nói" với TS kiểu là gì
const rawData: unknown = '{"name":"An","score":95}';

// as Type
const parsed = JSON.parse(rawData as string) as { name: string; score: number };
console.log(`${parsed.name}: ${parsed.score} điểm`);

// Satisfies operator (TS 4.9+) — kiểm tra kiểu nhưng giữ nguyên kiểu suy luận
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<string, string | number[]>;

// TS biết palette.red là number[] (không phải string | number[])
console.log(palette.red.map((v) => v * 2)); // ✅ .map() hợp lệ
