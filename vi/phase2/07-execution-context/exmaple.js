/**
 * =========================================
 * 1. Call Stack (LIFO)
 * =========================================
 */

function a() {
  console.log("A");
  b();
  console.log("A end");
}

function b() {
  console.log("B");
}

a();

/**
 * =========================================
 * 2. Macrotask: setTimeout
 * =========================================
 */

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");

/**
 * =========================================
 * 3. Microtask: Promise
 * =========================================
 */

console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

/**
 * =========================================
 * 4. Microtask vs Macrotask
 * =========================================
 */

console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

/**
 * =========================================
 * 5. Multiple Tasks
 * =========================================
 */

console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 2");
});

console.log("End");

/**
 * =========================================
 * 6. Nested Tasks
 * =========================================
 */

console.log("Start");

setTimeout(() => {
  console.log("Timeout");

  Promise.resolve().then(() => {
    console.log("Promise inside Timeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

/**
 * =========================================
 * 7. Advanced Event Loop
 * =========================================
 */

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

Promise.resolve().then(() => {
  setTimeout(() => {
    console.log("4");
  }, 0);
});

console.log("5");

/**
 * =========================================
 * 8. process.nextTick
 * =========================================
 */

console.log("Start");

process.nextTick(() => {
  console.log("nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");