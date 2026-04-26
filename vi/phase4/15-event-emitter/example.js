const { EventEmitter } = require("events");

/**
 * =========================================
 * 1. Basic Event
 * =========================================
 */
const emitter = new EventEmitter();

emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "Giap");


/**
 * =========================================
 * 2. User Login
 * =========================================
 */
emitter.on("userLogin", (name) => {
  console.log(`User ${name} logged in.`);
});

emitter.emit("userLogin", "Giap");


/**
 * =========================================
 * 3. Multiple Listeners
 * =========================================
 */
const orderEmitter = new EventEmitter();

orderEmitter.on("orderCreated", (order) => {
  console.log(`Order created: ${order.id}`);
});

orderEmitter.on("orderCreated", (order) => {
  console.log(`Send email to: ${order.email}`);
});

orderEmitter.emit("orderCreated", {
  id: 123,
  email: "nvg021@gmail.com",
});


/**
 * =========================================
 * 4. once()
 * =========================================
 */
const initEmitter = new EventEmitter();

initEmitter.once("init", () => {
  console.log("Initialization complete.");
});

initEmitter.emit("init");
initEmitter.emit("init");


/**
 * =========================================
 * 5. Remove listeners
 * =========================================
 */
const testEmitter = new EventEmitter();

testEmitter.on("test", () => {
  console.log("Test event triggered.");
});

testEmitter.emit("test");
testEmitter.removeAllListeners("test");
testEmitter.emit("test");


/**
 * =========================================
 * 6. Custom EventEmitter
 * =========================================
 */
class MyEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((cb) => cb(data));
    }
  }
}

const myEmitter = new MyEmitter();

myEmitter.on("customEvent", (data) => {
  console.log(`Custom event: ${data}`);
});

myEmitter.emit("customEvent", "Hello custom");


/**
 * =========================================
 * 7. Real Case - Login System
 * =========================================
 */
const userLogin = new EventEmitter();

userLogin.on("login", (user) => {
  console.log(`User ${user.name} logged in`);
});

userLogin.on("login", (user) => {
  console.log(`User ID: ${user.id}`);
});

userLogin.on("login", (user) => {
  console.log(`Send email to ${user.email}`);
});

userLogin.emit("login", {
  name: "Giap",
  id: 1,
  email: "nvg021@gmail.com",
});


/**
 * =========================================
 * 8. Error Event
 * =========================================
 */
const errorEmitter = new EventEmitter();

errorEmitter.on("error", (err) => {
  console.error("Error:", err.message);
});

errorEmitter.emit("error", new Error("Something went wrong"));


/**
 * =========================================
 * 9. Async Event
 * =========================================
 */
const asyncEmitter = new EventEmitter();

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched"), 1000);
  });
}

asyncEmitter.on("fetchData", async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

asyncEmitter.emit("fetchData");


/**
 * =========================================
 * 10. Payment System (Real Case)
 * =========================================
 */
class PaymentSystem extends EventEmitter {
  paymentSuccess(data) {
    this.emit("paymentSuccess", data);
  }

  paymentFailed(error, data) {
    this.emit("paymentFailed", error, data);
  }
}

const paymentSystem = new PaymentSystem();

paymentSystem.on("paymentSuccess", (data) => {
  console.log(
    `Payment success: ${data.amount} → send email & update DB`
  );
});

paymentSystem.on("paymentFailed", (error, data) => {
  console.error(`Payment failed: ${error.message}`);

  setTimeout(() => {
    console.log("Retrying...");
    paymentSystem.paymentSuccess(data);
  }, 2000);
});

const paymentData = { amount: 100, email: "nvg021@gmail.com" };

paymentSystem.paymentSuccess(paymentData);
paymentSystem.paymentFailed(
  new Error("Insufficient funds"),
  paymentData
);