# 09 — OOP (Lập trình hướng đối tượng)

## Classes

```js
class Animal {
  #sound; // Private field (ES2022)

  constructor(name, sound) {
    this.name = name;
    this.#sound = sound;
  }

  speak() {
    return `${this.name}: ${this.#sound}`;
  }
}
```

---

## Inheritance (Kế thừa)

```js
class Dog extends Animal {
  constructor(name) {
    super(name, "Gâu gâu"); // Gọi constructor của cha
  }

  fetch() {
    return `${this.name} đi lấy bóng!`;
  }
}
```

---

## `this` binding — bind, call, apply

| Method    | Mục đích                             | Cú pháp                     |
| --------- | ------------------------------------ | --------------------------- |
| `bind()`  | Tạo hàm mới với `this` cố định       | `fn.bind(context)`          |
| `call()`  | Gọi ngay với `this` và args rời      | `fn.call(context, a, b)`    |
| `apply()` | Gọi ngay với `this` và args là array | `fn.apply(context, [a, b])` |

```js
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}

const user = { name: "An" };

greet.call(user, "Xin chào"); // "Xin chào, An!"
greet.apply(user, ["Xin chào"]); // "Xin chào, An!"
const boundGreet = greet.bind(user);
boundGreet("Xin chào"); // "Xin chào, An!"
```

---

## Static Methods & Properties

```js
class MathUtils {
  static PI = 3.14159;
  static square(n) {
    return n * n;
  }
}

MathUtils.square(5); // 25 — gọi trực tiếp từ class
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — classes, inheritance, private fields, bind/call/apply
