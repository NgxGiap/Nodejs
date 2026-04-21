/**
 * =========================================
 * 1. Class & Method
 * =========================================
 */

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }

  increaseAge() {
    this.age += 1;
  }
}

const userInstance = new User("Giap", 21);
console.log(userInstance.getInfo());


/**
 * =========================================
 * 2. Inheritance
 * =========================================
 */

class Admin extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  getInfo() {
    return `${super.getInfo()}, Role: ${this.role}`;
  }
}

const admin = new Admin("Admin", 30, "Super Admin");
console.log(admin.getInfo());


/**
 * =========================================
 * 3. this Binding
 * =========================================
 */

const userObj = {
  name: "Giap",
  greet: function () {
    console.log("Hello " + this.name);
  },
};

// Mất context
const greetLost = userObj.greet;
greetLost(); // undefined

// Fix bằng bind
const greetBound = userObj.greet.bind(userObj);
greetBound(); // Hello Giap


/**
 * =========================================
 * 4. call / apply / bind
 * =========================================
 */

function greet(city, country) {
  console.log(this.name + " from " + city + ", " + country);
}

const userContext = { name: "Giap" };

greet.call(userContext, "Hanoi", "Vietnam");
greet.apply(userContext, ["Hanoi", "Vietnam"]);

const boundGreet = greet.bind(userContext);
boundGreet("Hanoi", "Vietnam");


/**
 * =========================================
 * 5. this trong Class
 * =========================================
 */

class Counter {
  constructor() {
    this.count = 0;
  }

  increase() {
    this.count++;
    console.log(this.count);
  }
}

const counter = new Counter();

// Mất context
const fn = counter.increase;
fn(); // ❌ this = undefined → lỗi hoặc NaN

// Fix
const boundIncrease = counter.increase.bind(counter);
boundIncrease(); // 1


/**
 * =========================================
 * 6. Mini Project: BankAccount
 * =========================================
 */

class BankAccount {
  constructor(owner, balance = 0) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Invalid amount");
      return;
    }

    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Invalid amount");
      return;
    }

    if (amount > this.balance) {
      console.log("Insufficient funds");
      return;
    }

    this.balance -= amount;
    console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
  }

  getBalance() {
    return this.balance;
  }
}