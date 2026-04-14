// ============================================================
// 09 — OOP: Classes, Inheritance, this binding
// ============================================================

// --- 1. Class cơ bản với Private Field ---
class BankAccount {
  #balance; // Private — không truy cập được từ bên ngoài

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Số tiền phải > 0");
    this.#balance += amount;
    console.log(`Nạp ${amount.toLocaleString()}đ. Số dư: ${this.getBalance()}`);
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Số dư không đủ");
    this.#balance -= amount;
    console.log(`Rút ${amount.toLocaleString()}đ. Số dư: ${this.getBalance()}`);
  }

  getBalance() {
    return this.#balance.toLocaleString("vi-VN") + "đ";
  }

  toString() {
    return `[Tài khoản của ${this.owner}: ${this.getBalance()}]`;
  }
}

console.log("=== BANK ACCOUNT ===");
const acc = new BankAccount("An", 1000000);
acc.deposit(500000);
acc.withdraw(200000);
console.log(acc.toString());
// acc.#balance; // ❌ SyntaxError: Private field

// --- 2. Inheritance (Kế thừa) ---
class SavingsAccount extends BankAccount {
  #interestRate;

  constructor(owner, initialBalance, interestRate = 0.05) {
    super(owner, initialBalance); // Gọi constructor cha
    this.#interestRate = interestRate;
  }

  applyInterest() {
    const interest = parseFloat(this.getBalance()) * this.#interestRate;
    this.deposit(interest);
    console.log(`Lãi ${(this.#interestRate * 100)}% đã được cộng vào`);
  }
}

console.log("\n=== SAVINGS ACCOUNT (kế thừa) ===");
const savings = new SavingsAccount("Bình", 10000000, 0.03);
savings.deposit(2000000);
savings.applyInterest();

// --- 3. Static Methods & Properties ---
class DateUtils {
  static DAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  static getDayName(date = new Date()) {
    return DateUtils.DAYS[date.getDay()];
  }

  static formatVN(date = new Date()) {
    return date.toLocaleDateString("vi-VN");
  }
}

console.log("\n=== STATIC METHODS ===");
console.log("Hôm nay:", DateUtils.getDayName());
console.log("Ngày:", DateUtils.formatVN());

// --- 4. bind, call, apply ---
console.log("\n=== BIND / CALL / APPLY ===");

function introduce(greeting, punctuation) {
  return `${greeting}, tôi là ${this.name} (${this.role})${punctuation}`;
}

const dev = { name: "An", role: "Developer" };
const manager = { name: "Chi", role: "Manager" };

// call: gọi ngay, args rời nhau
console.log(introduce.call(dev, "Xin chào", "!"));
console.log(introduce.call(manager, "Chào buổi sáng", "."));

// apply: gọi ngay, args là array
console.log(introduce.apply(dev, ["Hey", "~"]));

// bind: trả về hàm mới với this cố định
const devIntroduce = introduce.bind(dev);
console.log(devIntroduce("Hola", "?"));

// Ứng dụng thực tế của bind: fix this trong callback
class Timer {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  start() {
    // ❌ Không dùng bind: this sẽ là undefined trong strict mode
    // setInterval(function() { this.count++; }, 100);

    // ✅ Cách 1: Arrow function (tự kế thừa this)
    const interval = setInterval(() => {
      this.count++;
      if (this.count >= 3) {
        clearInterval(interval);
        console.log(`Timer "${this.name}" kết thúc sau ${this.count} lần tick`);
      }
    }, 50);
  }
}

const timer = new Timer("Demo");
timer.start();

// --- 5. Polymorphism (Đa hình) ---
class Shape {
  area() { return 0; }
  toString() { return `Shape với diện tích ${this.area()}`; }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return +(Math.PI * this.r ** 2).toFixed(2); }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}

console.log("\n=== POLYMORPHISM ===");
const shapes = [new Circle(5), new Rectangle(4, 6), new Circle(3)];
shapes.forEach(s => console.log(s.toString()));
// Mỗi shape tự biết tính area() của mình