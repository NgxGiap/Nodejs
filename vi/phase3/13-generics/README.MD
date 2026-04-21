# 13 — Generics

## Generics là gì?

Generics cho phép viết code **tái sử dụng** hoạt động với **nhiều kiểu dữ liệu** — mà vẫn đảm bảo **type safety**.

**Vấn đề khi không có Generics:**

```ts
// Phải viết lại cho từng kiểu — lặp code
function getFirstNumber(arr: number[]): number {
  return arr[0];
}
function getFirstString(arr: string[]): string {
  return arr[0];
}

// Hoặc dùng any — mất type safety
function getFirst(arr: any[]): any {
  return arr[0];
} // ❌ Nguy hiểm
```

**Giải pháp — Generic function:**

```ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const n = getFirst([1, 2, 3]); // n: number ✅
const s = getFirst(["a", "b"]); // s: string ✅
```

> `T` là **type parameter** — placeholder cho kiểu thực tế được truyền vào khi gọi.

---

## Generic Functions

```ts
// Một type parameter
function identity<T>(value: T): T {
  return value;
}

// Nhiều type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

// Generic với default type
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
```

---

## Constraints (Ràng buộc)

Giới hạn type parameter phải có đặc điểm nhất định:

```ts
// T phải có property .length
function logLength<T extends { length: number }>(value: T): T {
  console.log(value.length);
  return value;
}

logLength("hello"); // ✅ string có .length = 5
logLength([1, 2, 3]); // ✅ array có .length = 3
// logLength(42);        // ❌ number không có .length

// T phải là key của object U
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "An", age: 25 };
getProperty(user, "name"); // ✅ → string
getProperty(user, "age"); // ✅ → number
// getProperty(user, "xyz"); // ❌ "xyz" không phải key của user
```

---

## Generic Interfaces & Classes

```ts
// Generic interface
interface Repository<T> {
  findById(id: number): T | undefined;
  save(entity: T): T;
  delete(id: number): boolean;
  findAll(): T[];
}

// Generic class
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
  get size(): number {
    return this.items.length;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.pop(); // 2 — type: number
```

---

## Generic trong thực tế

### API Response wrapper

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

type UserResponse = ApiResponse<User>;
type ListResponse<T> = ApiResponse<{ items: T[]; total: number }>;
```

### Conditional Types

```ts
// Trả về kiểu khác nhau tùy theo T
type IsArray<T> = T extends any[] ? "yes" : "no";
type Flatten<T> = T extends Array<infer U> ? U : T;

type A = Flatten<number[]>; // number
type B = Flatten<string>; // string
```

---

## 📂 File ví dụ

- [`example.ts`](./example.ts) — generic functions, constraints, keyof, generic class, real-world patterns
