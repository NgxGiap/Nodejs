/**
 * =========================================
 * 1. try/catch + throw
 * =========================================
 */

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // 5
  console.log(divide(10, 0)); // Error
} catch (error) {
  console.error(error.message);
}


/**
 * =========================================
 * 2. JSON parse + finally
 * =========================================
 */

function parseJSON(str) {
  return JSON.parse(str);
}

try {
  console.log(parseJSON('{"name": "Giap", "age": 21}'));
  // console.log(parseJSON("invalid json")); // test lỗi
} catch (error) {
  console.error("Invalid JSON");
} finally {
  console.log("Done");
}


/**
 * =========================================
 * 3. Custom Error
 * =========================================
 */

function withdraw(balance, amount) {
  if (amount <= 0) {
    throw new Error("Invalid amount");
  }
  if (amount > balance) {
    throw new Error("Insufficient funds");
  }
  return balance - amount;
}


/**
 * =========================================
 * 4. Promise error
 * =========================================
 */

function getUserPromise() {
  return new Promise((_, reject) => {
    reject("Failed to load user");
  });
}

getUserPromise().catch(() => {
  console.log("Error occurred");
});


/**
 * =========================================
 * 5. Async/Await error
 * =========================================
 */

async function getUserAsyncError() {
  throw new Error("Failed");
}

async function handleAsyncError() {
  try {
    await getUserAsyncError();
  } catch (error) {
    console.log("Error occurred");
  }
}

handleAsyncError();


/**
 * =========================================
 * 6. Sai lầm phổ biến
 * =========================================
 */

function getUser() {
  return Promise.reject("Error");
}

try {
  getUser().then((res) => console.log(res));
} catch (err) {
  console.log("Caught"); // không chạy
}

// Phải dùng .catch
getUser().catch(() => console.log("Caught"));


/**
 * =========================================
 * 7. Defensive coding
 * =========================================
 */

function getUserName(user) {
  return user?.name ?? "Anonymous";
}


/**
 * =========================================
 * 8. Retry API
 * =========================================
 */

function fetchData(success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      success ? resolve("Data") : reject("API Error");
    }, 1000);
  });
}

async function fetchDataWithRetry() {
  try {
    const data = await fetchData(false);
    console.log(data);
  } catch {
    console.log("Retrying...");
    try {
      const data = await fetchData(true); // lần 2 thành công
      console.log(data);
    } catch {
      console.log("Final failure");
    }
  }
}


/**
 * =========================================
 * 9. Safe execute
 * =========================================
 */

function safeExecute(fn) {
  try {
    return fn();
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

const result = safeExecute(() => {
  throw new Error("Something went wrong");
});

console.log(result); // null