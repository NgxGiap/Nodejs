# 14 — Module System

## Module là gì?

Module là cơ chế chia nhỏ code thành các **file độc lập**, mỗi file có scope riêng — tránh ô nhiễm global scope và giúp tái sử dụng code.

```
Không có module:                Có module:
────────────────────            ──────────────────────────
global scope bị ô nhiễm        math.js → export { add }
biến trùng tên gây bug          utils.js → export { format }
khó tái sử dụng                 index.js → import từ cả hai
```

---

## CommonJS (CJS)

Hệ thống module **mặc định** của Node.js — ra đời từ đầu, vẫn là chuẩn phổ biến nhất.

### Xuất (Export)

```js
// Cách 1: Xuất nhiều thứ cùng lúc
module.exports = { add, subtract, PI };

// Cách 2: Xuất từng cái
module.exports.add = add;
module.exports.PI = 3.14;

// Cách 3: Shorthand
exports.add = add; // Lưu ý: KHÔNG được gán lại exports = {...}
```

### Nhập (Import)

```js
// Lấy toàn bộ
const math = require("./math");
math.add(1, 2);

// Destructure — lấy cụ thể
const { add, PI } = require("./math");

// Built-in module
const fs = require("fs");
const path = require("path");
```

**Đặc điểm CJS:**

- `require()` chạy **đồng bộ** — file được load và thực thi ngay lập tức
- Module được **cache** sau lần đầu load — `require()` nhiều lần vẫn trả về cùng một object
- Có thể `require()` bên trong hàm, điều kiện (dynamic)

---

## ES Modules (ESM)

Chuẩn module **chính thức** của JavaScript (ES2015) — hiện đại, được tối ưu tốt hơn.

### Kích hoạt ESM

```json
// package.json — bật cho toàn bộ project
{ "type": "module" }
```

Hoặc đặt tên file `.mjs` — Node.js tự nhận diện là ESM.

### Xuất (Export)

```js
// Named exports
export const PI = 3.14;
export function add(a, b) { return a + b; }
export class Calculator { ... }

// Default export — mỗi file chỉ có một
export default class App { ... }

// Xuất lại từ file khác (re-export)
export { add, subtract } from "./math.js";
export * from "./utils.js";
```

### Nhập (Import)

```js
// Named imports
import { add, PI } from "./math.js"; // Phải có .js extension!

// Default import
import App from "./app.js";

// Đổi tên khi import
import { add as sum } from "./math.js";

// Import tất cả vào namespace
import * as MathUtils from "./math.js";

// Dynamic import — lazy load (trả về Promise)
const module = await import("./heavy.js");
```

**Đặc điểm ESM:**

- `import` được phân tích **tĩnh** trước khi chạy → tree-shaking, tối ưu bundle tốt hơn
- **Async** theo mặc định — module được load bất đồng bộ
- Không có `__dirname`, `__filename` → phải tự tạo

---

## CJS vs ESM — Khi nào dùng cái nào?

|                        | CommonJS                    | ES Modules             |
| ---------------------- | --------------------------- | ---------------------- |
| Mặc định Node.js       | ✅                          | Cần `"type": "module"` |
| Cú pháp                | `require / exports`         | `import / export`      |
| Thực thi               | Đồng bộ                     | Bất đồng bộ            |
| Dynamic import         | ✅ `require()` ở bất kỳ đâu | `await import()`       |
| Tree-shaking           | ❌                          | ✅                     |
| `__dirname`            | ✅                          | ❌ (phải tự tạo)       |
| Dùng trong project mới | Vẫn OK                      | **Ưu tiên hơn**        |

---

## Global Objects quan trọng

### `process`

```js
process.version; // "v20.0.0"
process.platform; // "linux" | "darwin" | "win32"
process.env.NODE_ENV; // Biến môi trường
process.argv; // ["node", "script.js", ...args]
process.cwd(); // Thư mục đang chạy script
process.exit(0); // Thoát process (0 = thành công)
process.memoryUsage(); // Thông tin bộ nhớ
```

### `__dirname` và `__filename` (CJS)

```js
__dirname; // "/home/user/projects/app/src"   — thư mục chứa file
__filename; // "/home/user/projects/app/src/index.js" — đường dẫn file

// ESM tương đương:
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

---

## 📂 File ví dụ

- [`math.js`](./math.js) — module helper dùng chung
- [`logger.js`](./logger.js) — module Singleton (cache pattern)
- [`example-cjs.js`](./example-cjs.js) — CommonJS: require, module.exports, cache, globals
- [`example-esm.mjs`](./example-esm.mjs) — ES Modules: import/export, dynamic import
