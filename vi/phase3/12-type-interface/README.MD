# 12 — Type vs Interface

## Tổng quan

Cả `type` và `interface` đều dùng để **mô tả hình dạng của dữ liệu** — nhưng có những điểm khác biệt quan trọng về khả năng và cách dùng.

---

## Interface

Interface mô tả **hợp đồng** (contract) mà một object hoặc class phải tuân theo.

### Khai báo cơ bản

```ts
interface User {
  id: number;
  name: string;
  email?: string; // Optional — có thể có hoặc không
  readonly createdAt: Date; // Readonly — không thể thay đổi sau khi tạo
}
```

### Mở rộng với `extends`

```ts
interface AdminUser extends User {
  permissions: string[];
  level: number;
}

// Extends nhiều interface
interface SuperAdmin extends AdminUser, Loggable {
  masterKey: string;
}
```

### Declaration Merging — Chỉ interface làm được

```ts
// Khai báo lần 1
interface Config {
  host: string;
  port: number;
}

// Khai báo lần 2 — TS tự động merge
interface Config {
  timeout: number;
  debug?: boolean;
}

// Kết quả: Config có cả 4 properties
```

> 💡 Dùng Declaration Merging để **mở rộng type từ thư viện bên thứ ba** mà không cần sửa source của họ.

### Dùng với Class (`implements`)

```ts
interface Serializable {
  serialize(): string;
}

class User implements Serializable {
  serialize() {
    return JSON.stringify(this);
  }
}
```

---

## Type Alias

`type` tạo ra **tên mới** cho bất kỳ kiểu nào — linh hoạt hơn interface.

### Dùng cho Union & Intersection

```ts
// Union — một trong nhiều kiểu
type ID = string | number;
type Status = "active" | "inactive" | "pending";

// Intersection — kết hợp tất cả
type AdminUser = User & { permissions: string[] };
type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date };
```

### Dùng cho Primitives & Tuples

```ts
// Primitive alias
type PositiveNumber = number; // Không enforce ở runtime, nhưng rõ ý định
type NonEmptyString = string;

// Tuple
type Coordinate = [x: number, y: number];
type RGB = [red: number, green: number, blue: number];
type Entry<K, V> = [key: K, value: V];
```

### Dùng cho Function Types

```ts
type Handler = (event: Event) => void;
type AsyncHandler<T> = (req: Request) => Promise<T>;
type Predicate<T> = (item: T) => boolean;
type Comparator<T> = (a: T, b: T) => number;
```

---

## So sánh trực tiếp

| Tính năng                | `interface`  |       `type`        |
| ------------------------ | :----------: | :-----------------: |
| Object shape             |      ✅      |         ✅          |
| Mở rộng                  | ✅ `extends` | ✅ `&` intersection |
| Declaration Merging      |      ✅      |         ❌          |
| Union types              |      ❌      |         ✅          |
| Primitive alias          |      ❌      |         ✅          |
| Tuples                   |      ❌      |         ✅          |
| Function types           | ✅ (verbose) |  ✅ (ngắn gọn hơn)  |
| `implements` trong class |      ✅      |         ✅          |
| Mapped types             |      ❌      |         ✅          |

---

## Nguyên tắc chọn lựa

> **Dùng `interface` khi:**
>
> - Định nghĩa "hình dạng" của object/class
> - Cần mở rộng (extends) nhiều lần
> - Viết library hoặc API public (người dùng có thể Declaration Merge)
>
> **Dùng `type` khi:**
>
> - Cần Union, Intersection, Tuple
> - Alias cho primitive
> - Function type signatures
> - Computed/Mapped types

---

## Utility Types tích hợp sẵn

TypeScript cung cấp sẵn các Utility Types cực kỳ hữu ích:

```ts
Partial<T>; // Tất cả properties trở thành optional
Required<T>; // Tất cả properties trở thành required
Readonly<T>; // Tất cả properties trở thành readonly
Pick<T, Keys>; // Chọn một số properties
Omit<T, Keys>; // Loại bỏ một số properties
Record<K, V>; // Object với keys kiểu K, values kiểu V
Exclude<T, U>; // Loại bỏ kiểu U khỏi union T
Extract<T, U>; // Lấy phần chung của T và U
NonNullable<T>; // Loại bỏ null và undefined
ReturnType<T>; // Lấy kiểu trả về của function
Parameters<T>; // Lấy kiểu tham số của function
```

---

## 📂 File ví dụ

- [`example.ts`](./example.ts) — interface, type, extends, implements, utility types, real-world patterns
