// ============================================================
// 12 — Type vs Interface
// Chạy: npx ts-node example.ts
// ============================================================

// ========================
// PHẦN 1: INTERFACE
// ========================

// --- 1. Interface cơ bản ---
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional
  readonly createdAt: Date; // Không thể gán lại sau khi tạo
}

// --- 2. Interface extends ---
interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSizeMB: number;
}

interface PhysicalProduct extends Product {
  weightGram: number;
  stock: number;
}

// Dùng thử
const ebook: DigitalProduct = {
  id: 1,
  name: "TypeScript Handbook",
  price: 199000,
  createdAt: new Date(),
  downloadUrl: "https://example.com/ts-handbook.pdf",
  fileSizeMB: 4.2,
};

// ebook.createdAt = new Date(); // ❌ Lỗi — readonly

// --- 3. Declaration Merging ---
interface AppConfig {
  host: string;
  port: number;
}

// Khai báo thêm vào cùng interface — TS tự merge
interface AppConfig {
  timeout: number;
  debug?: boolean;
}

// Ứng dụng: mở rộng type của thư viện bên ngoài
// Ví dụ: thêm property vào Express Request
// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }

const config: AppConfig = {
  host: "localhost",
  port: 3000,
  timeout: 5000,
  debug: true,
};

// --- 4. Interface cho Class ---
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Validatable {
  validate(): boolean;
  getErrors(): string[];
}

class UserModel implements Serializable, Validatable {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}

  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name, email: this.email });
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
    this.email = parsed.email;
  }

  validate(): boolean {
    return this.name.length > 0 && this.email.includes("@");
  }

  getErrors(): string[] {
    const errors: string[] = [];
    if (!this.name) errors.push("Tên không được trống");
    if (!this.email.includes("@")) errors.push("Email không hợp lệ");
    return errors;
  }
}

console.log("=== CLASS IMPLEMENTS ===");
const userModel = new UserModel(1, "An", "an@example.com");
console.log("Valid:", userModel.validate());
console.log("Serialized:", userModel.serialize());

const badUser = new UserModel(2, "", "not-an-email");
console.log("Errors:", badUser.getErrors());

// ========================
// PHẦN 2: TYPE ALIAS
// ========================

// --- 5. Type cho Union ---
type ID = string | number;
type HttpStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;
type UserRole = "guest" | "user" | "moderator" | "admin";
type Environment = "development" | "staging" | "production";

function getPermissions(role: UserRole): string[] {
  const permissionMap: Record<UserRole, string[]> = {
    guest: ["read"],
    user: ["read", "create"],
    moderator: ["read", "create", "update", "moderate"],
    admin: ["read", "create", "update", "delete", "admin"],
  };
  return permissionMap[role];
}

console.log("\n=== TYPE UNION ===");
console.log("admin permissions:", getPermissions("admin"));
console.log("guest permissions:", getPermissions("guest"));

// --- 6. Type Intersection ---
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDeletable = {
  deletedAt: Date | null;
  isDeleted: boolean;
};

// Kết hợp nhiều type
type BaseEntity = { id: number } & Timestamps & SoftDeletable;

type User = BaseEntity & {
  name: string;
  email: string;
  role: UserRole;
};

type Post = BaseEntity & {
  title: string;
  content: string;
  authorId: number;
  published: boolean;
};

// Helper tạo BaseEntity
function createBase(id: number): BaseEntity {
  return {
    id,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    isDeleted: false,
  };
}

// --- 7. Type cho Function ---
type Predicate<T> = (item: T) => boolean;
type Transformer<T, U> = (input: T) => U;
type Comparator<T> = (a: T, b: T) => number;
type AsyncOperation<T, R> = (input: T) => Promise<R>;

// Dùng thực tế
const isActive: Predicate<User> = (u) => !u.isDeleted;
const toDisplayName: Transformer<User, string> = (u) => `${u.name} (${u.role})`;
const byName: Comparator<User> = (a, b) => a.name.localeCompare(b.name);

// --- 8. Type Tuple ---
type Coordinate = [x: number, y: number];
type Range = [min: number, max: number];
type KeyValue<K, V> = [key: K, value: V];

function clamp(value: number, [min, max]: Range): number {
  return Math.min(Math.max(value, min), max);
}

console.log("\n=== TYPE TUPLE ===");
console.log(clamp(150, [0, 100])); // 100
console.log(clamp(-5, [0, 100])); // 0
console.log(clamp(50, [0, 100])); // 50

// ========================
// PHẦN 3: UTILITY TYPES
// ========================

console.log("\n=== UTILITY TYPES ===");

interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  bio?: string;
}

// Partial — tất cả optional (dùng cho update/patch)
type UpdateUserDTO = Partial<Omit<FullUser, "id">>;

// Required — tất cả required
type StrictUser = Required<FullUser>;

// Pick — chọn fields (dùng cho API response)
type UserPublicProfile = Pick<FullUser, "id" | "name" | "bio">;
type UserCredentials = Pick<FullUser, "email" | "password">;

// Omit — bỏ fields (bỏ password khi trả về client)
type SafeUser = Omit<FullUser, "password">;

// Record — object với key/value types
type RolePermissions = Record<UserRole, string[]>;
type UserCache = Record<number, SafeUser>;

// ReturnType — lấy kiểu trả về của function
function fetchUser(id: number) {
  return { id, name: "An", email: "an@example.com", role: "user" as UserRole };
}
type FetchedUser = ReturnType<typeof fetchUser>;

// Parameters — lấy kiểu tham số
type FetchUserParams = Parameters<typeof fetchUser>; // [id: number]

// Demo
const updateData: UpdateUserDTO = { name: "An Đã Sửa", bio: "Developer" };
const publicProfile: UserPublicProfile = { id: 1, name: "An", bio: "Dev" };

console.log("Update DTO:", updateData);
console.log("Public Profile:", publicProfile);

// NonNullable — loại bỏ null/undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string
