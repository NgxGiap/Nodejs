// logger.js — Singleton module (minh họa module cache)
// ============================================================
// Vì CJS cache module sau lần đầu require(),
// mọi file require("./logger") đều nhận CÙNG một instance.

const LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

class Logger {
  constructor() {
    this.level = LEVELS.INFO;
    this.logs = [];
  }

  setLevel(level) {
    this.level = LEVELS[level] ?? LEVELS.INFO;
  }

  #write(level, message, meta = {}) {
    if (LEVELS[level] < this.level) return;
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(Object.keys(meta).length ? { meta } : {}),
    };
    this.logs.push(entry);
    const prefix = { DEBUG: "🔍", INFO: "ℹ️ ", WARN: "⚠️ ", ERROR: "❌" }[level];
    console.log(`${prefix} [${entry.timestamp}] ${message}`,
      Object.keys(meta).length ? meta : "");
  }

  debug(msg, meta) { this.#write("DEBUG", msg, meta); }
  info(msg, meta)  { this.#write("INFO",  msg, meta); }
  warn(msg, meta)  { this.#write("WARN",  msg, meta); }
  error(msg, meta) { this.#write("ERROR", msg, meta); }

  getHistory() { return [...this.logs]; }
  clear()      { this.logs = []; }
}

// Export một instance duy nhất — Singleton pattern
module.exports = new Logger();