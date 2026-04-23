/**
 * =========================================
 * 1. Generic Function (Identity)
 * =========================================
 */

function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello Generics"));
console.log(identity<number>(42));

/**
 * =========================================
 * 2. Generic Array
 * =========================================
 */

function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(getFirst([1, 2, 3]));
console.log(getFirst(["a", "b"]));

/**
 * =========================================
 * 3. Generic with Object (keyof)
 * =========================================
 */

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Giap", age: 21 };
console.log(getValue(user, "name"));

/**
 * =========================================
 * 4. Generic Interface
 * =========================================
 */

interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 123 };

console.log(stringBox, numberBox);

/**
 * =========================================
 * 5. Generic API Response
 * =========================================
 */

type APIResponse<T> = {
  data: T;
  error: string | null;
};

type User = {
  name: string;
};

const response: APIResponse<User> = {
  data: { name: "Giap" },
  error: null,
};

console.log(response);

/**
 * =========================================
 * 6. Merge Object (Advanced Generic)
 * =========================================
 */

function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const merged = merge({ name: "Giap" }, { age: 21 });
console.log(merged);

/**
 * =========================================
 * 7. Constraint (extends)
 * =========================================
 */

function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength("hello"));
console.log(getLength([1, 2, 3]));

/**
 * =========================================
 * 8. Default Generic
 * =========================================
 */

type Result<T = string> = {
  success: boolean;
  data: T;
};

const result1: Result = {
  success: true,
  data: "default string",
};

const result2: Result<number> = {
  success: true,
  data: 123,
};

console.log(result1, result2);

/**
 * =========================================
 * 9. Replace any with Generic
 * =========================================
 */

function wrap<T>(value: T): { value: T } {
  return { value };
}

const wrapped = wrap(123);
console.log(wrapped);
