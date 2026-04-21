# 11 — TypeScript Fundamentals

## TypeScript là gì?

TypeScript là **JavaScript + hệ thống kiểu tĩnh (static type system)** — một superset của JS được biên dịch thành JS thuần trước khi chạy.

```
TypeScript (.ts)  →  tsc biên dịch  →  JavaScript (.js)  →  Node.js / Trình duyệt chạy
```

**Lợi ích cốt lõi:**

- Phát hiện lỗi **tại lúc viết code** (compile-time), không phải lúc chạy (runtime)
- IDE hỗ trợ **autocomplete, refactor** thông minh hơn
- Code tự **document hóa** — đọc type là biết dữ liệu trông như thế nào

---

## Cài đặt & Cấu hình

```bash
npm install -D typescript ts-node @types/node
npx tsc --init        # Tạo tsconfig.json
```

**`tsconfig.json` cơ bản:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

> `"strict": true` — bật tất cả kiểm tra nghiêm ngặt. **Luôn bật trong project mới.**

---

## Kiểu dữ liệu cơ bản

### Primitives

```ts
let name: string = "An";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;
```

### `void` — Hàm không trả về giá trị

```ts
function log(msg: string): void {
  console.log(msg);
  // Không return — hoặc return undefined
}
```

### `unknown` — Kiểu không xác định (an toàn hơn `any`)

```ts
let input: unknown = getUserInput();

// ❌ Không thể dùng ngay — phải kiểm tra trước
// input.toUpperCase();

// ✅ Kiểm tra rồi mới dùng
if (typeof input === "string") {
  console.log(input.toUpperCase());
}
```

### `any` — Tắt hoàn toàn type checking ⚠️

```ts
let data: any = "hello";
data = 42; // Không lỗi
data.toUpperCase(); // Không lỗi compile — nhưng sẽ crash runtime!
```

> 🔑 **Nguyên tắc:** Dùng `unknown` thay `any` khi không biết kiểu. `any` là "escape hatch" — tránh dùng.

### `never` — Hàm không bao giờ kết thúc bình thường

```ts
function throwError(msg: string): never {
  throw new Error(msg); // Luôn throw — không bao giờ return
}
```

---

## Type Inference (Suy luận kiểu)

TypeScript **tự động** xác định kiểu khi bạn khởi tạo — không cần ghi rõ trong hầu hết trường hợp:

```ts
let count = 0; // TS suy luận: number
let name = "An"; // TS suy luận: string
const arr = [1, 2, 3]; // TS suy luận: number[]

// Contextual Typing — suy luận từ ngữ cảnh
["An", "Bình"].forEach((name) => {
  console.log(name.toUpperCase()); // TS biết name là string
});
```

---

## Arrays & Tuples

### Arrays

```ts
const scores: number[] = [90, 85, 92];
const names: Array<string> = ["An", "Bình"]; // Tương đương cú pháp trên

const constants: readonly number[] = [1, 2, 3];
// constants.push(4); // ❌ Lỗi — readonly
```

### Tuples — Array với cấu trúc cố định

```ts
const point: [number, number] = [10, 20];
const entry: [string, number, boolean] = ["An", 25, true];

const [x, y] = point; // Destructure
const [userName, userAge] = entry;

// Named tuple (TS 4.0+) — dễ đọc hơn
type RGB = [red: number, green: number, blue: number];
const red: RGB = [255, 0, 0];
```

---

## Union Types & Literal Types

```ts
// Union — một trong nhiều kiểu
type ID = string | number;
let userId: ID = "user_001";
userId = 42; // ✅

// Literal — chỉ cho phép giá trị cụ thể
type Direction = "north" | "south" | "east" | "west";
type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

function move(dir: Direction) {
  /* ... */
}
move("north"); // ✅
// move("up"); // ❌ Lỗi compile
```

---

## Type Narrowing (Thu hẹp kiểu)

TypeScript thu hẹp kiểu dựa trên điều kiện — giúp xử lý union type an toàn:

```ts
function process(value: string | number | null) {
  if (value === null) return;
  // Đây: value là string | number

  if (typeof value === "string") {
    console.log(value.toUpperCase()); // TS biết là string
  } else {
    console.log(value.toFixed(2)); // TS biết là number
  }
}
```

---

## Optional & Default Parameters

```ts
function createUser(
  name: string,
  age: number,
  city?: string, // Optional — có thể bỏ qua
  role: string = "user", // Default value
) {
  return { name, age, city: city ?? "Không rõ", role };
}

createUser("An", 25); // ✅
createUser("Bình", 30, "Hà Nội", "admin"); // ✅
```

---

## 📂 File ví dụ

- [`example.ts`](./example.ts) — tất cả kiểu cơ bản, inference, union, narrowing, tuples
