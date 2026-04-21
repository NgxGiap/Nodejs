/**
 * =========================================
 * 1. Interface - Basic
 * =========================================
 */

interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Giap",
  age: 21,
};

console.log(user);

/**
 * =========================================
 * 2. Interface - Extends
 * =========================================
 */

interface Admin extends User {
  role: string;
}

const admin: Admin = {
  name: "Admin",
  age: 30,
  role: "Super Admin",
};

console.log(admin);

/**
 * =========================================
 * 3. Interface with Class (implements)
 * =========================================
 */

interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log(`${this.name} barks: Woof!`);
  }
}

const dog = new Dog("Buddy");
dog.makeSound();

/**
 * =========================================
 * 4. Type - Union
 * =========================================
 */

type ID = string | number;

function printID(id: ID): void {
  console.log(`ID: ${id}`);
}

printID("123");
printID(456);

/**
 * =========================================
 * 5. Type - Tuple
 * =========================================
 */

type UserTuple = [string, number];

const userTuple: UserTuple = ["Giap", 21];
console.log(userTuple);

/**
 * =========================================
 * 6. Type - Function
 * =========================================
 */

type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
console.log(add(5, 3));

/**
 * =========================================
 * 7. Interface Merge
 * =========================================
 */

interface A {
  name: string;
}

interface A {
  age: number;
}

// Result:
// interface A {
//   name: string;
//   age: number;
// }

/**
 * =========================================
 * 8. Type cannot be redeclared
 * =========================================
 */

// ❌ Error:
// type B = { name: string };
// type B = { age: number };

/**
 * =========================================
 * 9. Generic Type (Real-world)
 * =========================================
 */

type APIResponse<T> = {
  data: T;
  error: string | null;
};

const response: APIResponse<User> = {
  data: {
    name: "Giap",
    age: 21,
  },
  error: null,
};

console.log(response);
