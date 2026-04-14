// ============================================================
// 10 — Xử lý lỗi
// ============================================================

// --- 1. try / catch / finally cơ bản ---
console.log("=== TRY / CATCH / FINALLY ===");

function parseJSON(jsonString) {
  try {
    const result = JSON.parse(jsonString);
    console.log("Parse thành công:", result);
    return result;
  } catch (err) {
    console.error(`Lỗi parse: ${err.message}`);
    return null;
  } finally {
    console.log("(finally luôn chạy)");
  }
}

parseJSON('{"name": "An"}');     // Thành công
parseJSON("không phải JSON");   // Lỗi

// --- 2. Custom Error Classes ---
console.log("\n=== CUSTOM ERRORS ===");

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} không tìm thấy`, 404);
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

// Phân loại lỗi bằng instanceof
function handleError(err) {
  if (err instanceof ValidationError) {
    console.error(`[Validation] Field "${err.field}": ${err.message}`);
  } else if (err instanceof NotFoundError) {
    console.error(`[NotFound] ${err.message} (${err.resource})`);
  } else if (err instanceof AppError) {
    console.error(`[AppError ${err.statusCode}] ${err.message}`);
  } else {
    console.error("[Unknown Error]", err);
  }
}

try {
  throw new ValidationError("Email không đúng định dạng", "email");
} catch (e) { handleError(e); }

try {
  throw new NotFoundError("User");
} catch (e) { handleError(e); }

// --- 3. Validation với Error ---
console.log("\n=== VALIDATION ===");

function createUser({ name, email, age }) {
  if (!name || name.trim() === "") {
    throw new ValidationError("Tên không được để trống", "name");
  }
  if (!email || !email.includes("@")) {
    throw new ValidationError("Email không hợp lệ", "email");
  }
  if (age < 18) {
    throw new ValidationError("Phải đủ 18 tuổi", "age");
  }
  return { id: Date.now(), name, email, age };
}

const testCases = [
  { name: "An", email: "an@example.com", age: 25 },
  { name: "", email: "an@example.com", age: 25 },
  { name: "Bình", email: "khong-co-at", age: 25 },
  { name: "Chi", email: "chi@example.com", age: 16 },
];

testCases.forEach(data => {
  try {
    const user = createUser(data);
    console.log("✅ Tạo user:", user.name);
  } catch (e) {
    console.error(`❌ ${e.field}: ${e.message}`);
  }
});

// --- 4. Async Error Handling ---
console.log("\n=== ASYNC ERRORS ===");

const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchUserData(id) {
  await delay(50);
  if (id <= 0) throw new ValidationError("ID phải > 0", "id");
  if (id > 100) throw new NotFoundError(`User #${id}`);
  return { id, name: `User ${id}` };
}

async function main() {
  // Xử lý từng request
  for (const id of [1, -1, 999]) {
    try {
      const user = await fetchUserData(id);
      console.log("✅ Lấy được:", user.name);
    } catch (e) {
      handleError(e);
    }
  }

  // Promise.allSettled để xử lý nhiều request cùng lúc
  const results = await Promise.allSettled([
    fetchUserData(1),
    fetchUserData(-1),
    fetchUserData(50),
  ]);

  console.log("\n--- allSettled results ---");
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      console.log(`✅ [${i}]:`, r.value.name);
    } else {
      console.log(`❌ [${i}]:`, r.reason.message);
    }
  });
}

main();