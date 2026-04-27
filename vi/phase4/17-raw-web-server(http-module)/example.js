// ============================================================
// 17 — Raw Web Server (không dùng bất kỳ framework nào)
// Chạy: node example.js
// Test: curl http://localhost:3000/api/users
// ============================================================

const http = require("http");

const PORT = 3000;
const BASE = `http://localhost:${PORT}`;

// ========================
// IN-MEMORY DATABASE
// ========================

let users = [
  { id: 1, name: "An",   email: "an@example.com",   role: "admin", createdAt: new Date().toISOString() },
  { id: 2, name: "Bình", email: "binh@example.com", role: "user",  createdAt: new Date().toISOString() },
  { id: 3, name: "Chi",  email: "chi@example.com",  role: "user",  createdAt: new Date().toISOString() },
];
let nextId = 4;

// ========================
// HELPERS
// ========================

// Gửi JSON response
function sendJSON(res, statusCode, data) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    "Content-Type":                "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods":"GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
    "X-Powered-By":                "Node.js Raw HTTP",
  });
  res.end(body);
}

// Response helpers
const ok       = (res, data, msg = "OK")      => sendJSON(res, 200, { success: true,  message: msg, data });
const created  = (res, data)                  => sendJSON(res, 201, { success: true,  message: "Created", data });
const noContent= (res)                        => { res.writeHead(204); res.end(); };
const badReq   = (res, msg)                   => sendJSON(res, 400, { success: false, message: msg });
const notFound = (res, msg = "Not Found")     => sendJSON(res, 404, { success: false, message: msg });
const conflict = (res, msg)                   => sendJSON(res, 409, { success: false, message: msg });
const serverErr= (res, msg = "Internal Error")=> sendJSON(res, 500, { success: false, message: msg });

// Đọc request body (stream → JSON)
function readBody(req) {
  return new Promise((resolve, reject) => {
    if (!["POST", "PUT", "PATCH"].includes(req.method)) {
      return resolve({});
    }
    let raw = "";
    req.on("data",  chunk => raw += chunk.toString());
    req.on("end",   () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); }
      catch { reject(new Error("Body không phải JSON hợp lệ")); }
    });
    req.on("error", reject);
  });
}

// Parse URL
function parseURL(req) {
  return new URL(req.url, BASE);
}

// Validation đơn giản
function validateUser(body) {
  const errors = [];
  if (!body.name  || body.name.trim()  === "") errors.push("Thiếu 'name'");
  if (!body.email || body.email.trim() === "") errors.push("Thiếu 'email'");
  if (body.email && !body.email.includes("@"))  errors.push("'email' không hợp lệ");
  return errors;
}

// ========================
// ROUTE HANDLERS
// ========================

// GET /api/users
function getUsers(req, res) {
  const { searchParams } = parseURL(req);
  const search = searchParams.get("search")?.toLowerCase();
  const role   = searchParams.get("role");
  const page   = parseInt(searchParams.get("page")  ?? "1");
  const limit  = parseInt(searchParams.get("limit") ?? "10");

  let result = [...users];

  // Filter
  if (search) result = result.filter(u =>
    u.name.toLowerCase().includes(search) ||
    u.email.toLowerCase().includes(search)
  );
  if (role) result = result.filter(u => u.role === role);

  // Pagination
  const total = result.length;
  const start = (page - 1) * limit;
  const items = result.slice(start, start + limit);

  ok(res, {
    items,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
}

// GET /api/users/:id
function getUserById(req, res, id) {
  const user = users.find(u => u.id === id);
  if (!user) return notFound(res, `User #${id} không tồn tại`);
  ok(res, user);
}

// POST /api/users
async function createUser(req, res) {
  const body   = await readBody(req);
  const errors = validateUser(body);
  if (errors.length) return badReq(res, errors.join("; "));

  if (users.some(u => u.email === body.email.trim())) {
    return conflict(res, `Email '${body.email}' đã tồn tại`);
  }

  const newUser = {
    id:        nextId++,
    name:      body.name.trim(),
    email:     body.email.trim().toLowerCase(),
    role:      body.role ?? "user",
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  created(res, newUser);
}

// PUT /api/users/:id
async function updateUser(req, res, id) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return notFound(res, `User #${id} không tồn tại`);

  const body = await readBody(req);

  // Email conflict check (bỏ qua chính nó)
  if (body.email && users.some(u => u.email === body.email && u.id !== id)) {
    return conflict(res, `Email '${body.email}' đã được dùng bởi user khác`);
  }

  // Merge — id và createdAt không thay đổi
  users[index] = {
    ...users[index],
    ...(body.name  && { name:  body.name.trim() }),
    ...(body.email && { email: body.email.trim().toLowerCase() }),
    ...(body.role  && { role:  body.role }),
    updatedAt: new Date().toISOString(),
  };

  ok(res, users[index], "Cập nhật thành công");
}

// DELETE /api/users/:id
function deleteUser(req, res, id) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return notFound(res, `User #${id} không tồn tại`);

  const [deleted] = users.splice(index, 1);
  ok(res, deleted, "Xóa thành công");
}

// GET /api/stats
function getStats(req, res) {
  const byRole = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});

  ok(res, {
    total: users.length,
    byRole,
    server: {
      uptime:  Math.floor(process.uptime()) + "s",
      memory:  (process.memoryUsage().heapUsed / 1024 ** 2).toFixed(1) + "MB",
      nodeVersion: process.version,
    },
  });
}

// ========================
// ROUTER
// ========================

async function router(req, res) {
  const { method } = req;
  const { pathname } = parseURL(req);

  // Log mỗi request
  console.log(`[${new Date().toLocaleTimeString("vi-VN")}] ${method} ${pathname}`);

  // CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" });
    return res.end();
  }

  // GET /
  if (method === "GET" && pathname === "/") {
    return ok(res, {
      name: "HN2 Raw HTTP API",
      version: "1.0.0",
      endpoints: [
        "GET    /api/users           — Danh sách (hỗ trợ ?search, ?role, ?page, ?limit)",
        "GET    /api/users/:id       — Lấy một user",
        "POST   /api/users           — Tạo user mới",
        "PUT    /api/users/:id       — Cập nhật user",
        "DELETE /api/users/:id       — Xóa user",
        "GET    /api/stats           — Thống kê server",
      ],
    });
  }

  // GET /api/stats
  if (method === "GET" && pathname === "/api/stats") {
    return getStats(req, res);
  }

  // /api/users (collection)
  if (pathname === "/api/users") {
    if (method === "GET")  return getUsers(req, res);
    if (method === "POST") return createUser(req, res);
  }

  // /api/users/:id (document)
  const match = pathname.match(/^\/api\/users\/(\d+)$/);
  if (match) {
    const id = parseInt(match[1]);
    if (method === "GET")    return getUserById(req, res, id);
    if (method === "PUT")    return updateUser(req, res, id);
    if (method === "DELETE") return deleteUser(req, res, id);
  }

  // 404
  notFound(res, `Route '${method} ${pathname}' không tồn tại`);
}

// ========================
// SERVER
// ========================

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    console.error("Unhandled error:", err.message);
    serverErr(res, err.message);
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} đang bị chiếm. Thử: PORT=3001 node example.js`);
  } else {
    console.error("Server error:", err);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
  console.log(`\n📌 Thử ngay:\n`);
  console.log(`  curl http://localhost:${PORT}/`);
  console.log(`  curl http://localhost:${PORT}/api/users`);
  console.log(`  curl http://localhost:${PORT}/api/users/1`);
  console.log(`  curl "http://localhost:${PORT}/api/users?search=an&role=user"`);
  console.log(`  curl -X POST http://localhost:${PORT}/api/users \\`);
  console.log(`    -H "Content-Type: application/json" \\`);
  console.log(`    -d '{"name":"Dũng","email":"dung@example.com"}'`);
  console.log(`  curl -X PUT http://localhost:${PORT}/api/users/2 \\`);
  console.log(`    -H "Content-Type: application/json" \\`);
  console.log(`    -d '{"name":"Bình Updated","role":"admin"}'`);
  console.log(`  curl -X DELETE http://localhost:${PORT}/api/users/3`);
  console.log(`  curl http://localhost:${PORT}/api/stats`);
  console.log(`\nCTRL+C để dừng\n`);
});