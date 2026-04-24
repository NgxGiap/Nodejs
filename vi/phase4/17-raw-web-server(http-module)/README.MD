# 17 — Raw Web Server (http module)

## Tại sao học Raw HTTP?

Framework như Express, Fastify đều xây dựng **trên nền** `http` module. Hiểu raw HTTP giúp bạn:

- Biết framework thực sự làm gì bên dưới
- Debug lỗi sâu hơn
- Xây dựng server siêu nhẹ khi không cần framework

---

## Tạo Server cơ bản

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // req: IncomingMessage — thông tin request
  // res: ServerResponse  — object để gửi response
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello!" }));
});

server.listen(3000, () => {
  console.log("Server: http://localhost:3000");
});
```

---

## Request Object (`req`)

```js
req.method; // "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
req.url; // "/api/users?page=1&limit=10"
req.headers; // { "content-type": "...", "authorization": "..." }
req.headers["content-type"];
req.socket.remoteAddress; // IP của client
```

### Đọc Body (Stream)

Request body đến theo dạng **stream** — phải tự thu thập:

```js
async function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}
```

---

## Response Object (`res`)

```js
// Gửi status + headers (phải gọi TRƯỚC khi write/end)
res.writeHead(201, {
  "Content-Type": "application/json; charset=utf-8",
  "X-Request-Id": "abc123",
});

// Ghi response body
res.write(chunk); // Ghi từng phần (streaming)
res.end(data); // Kết thúc — PHẢI gọi!

// Hoặc set header riêng lẻ (trước writeHead)
res.setHeader("Content-Type", "application/json");
res.statusCode = 404;
res.end(body);
```

---

## Parsing URL

```js
const { URL } = require("url");

// req.url chỉ có path + query — phải thêm base để parse
const url = new URL(req.url, `http://localhost:3000`);

url.pathname; // "/api/users"
url.searchParams.get("page"); // "2"
url.searchParams.get("limit"); // "10"
```

---

## Routing thủ công

```js
const { method } = req;
const pathname = new URL(req.url, base).pathname;

if (method === "GET" && pathname === "/api/users") {
  /* ... */
}
if (method === "POST" && pathname === "/api/users") {
  /* ... */
}

// Dynamic route: /api/users/:id
const match = pathname.match(/^\/api\/users\/(\d+)$/);
if (match) {
  const id = parseInt(match[1]);
  // ...
}
```

---

## 📂 File ví dụ

- [`example.js`](./example.js) — REST API đầy đủ CRUD, routing, body parsing, CORS, error handling
- **Test bằng curl:**

```bash
# Lấy danh sách
curl http://localhost:3000/api/users

# Lấy theo ID
curl http://localhost:3000/api/users/1

# Tìm kiếm
curl "http://localhost:3000/api/users?search=an"

# Tạo mới
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Chi","email":"chi@example.com"}'

# Cập nhật
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"An Updated"}'

# Xóa
curl -X DELETE http://localhost:3000/api/users/1
```
