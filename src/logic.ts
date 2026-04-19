import type { Hono } from "hono";


// ATXP: requirePayment only fires inside an ATXP context (set by atxpHono middleware).
// For raw x402 requests, the existing @x402/hono middleware handles the gate.
// If neither protocol is active (ATXP_CONNECTION unset), tryRequirePayment is a no-op.
async function tryRequirePayment(price: number): Promise<void> {
  if (!process.env.ATXP_CONNECTION) return;
  try {
    const { requirePayment } = await import("@atxp/server");
    const BigNumber = (await import("bignumber.js")).default;
    await requirePayment({ price: BigNumber(price) });
  } catch (e: any) {
    if (e?.code === -30402) throw e;
  }
}

function uuidv4(): string {
  return crypto.randomUUID();
}

function uuidv7(): string {
  const timestamp = Date.now();
  const hex = timestamp.toString(16).padStart(12, "0");
  const random = Array.from(crypto.getRandomValues(new Uint8Array(10)))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-7${random.slice(0, 3)}-${(parseInt(random.slice(3, 4), 16) & 0x3 | 0x8).toString(16)}${random.slice(4, 7)}-${random.slice(7, 19)}`;
}

function ulid(): string {
  const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const timestamp = Date.now();
  let id = "";
  let t = timestamp;
  for (let i = 9; i >= 0; i--) { id = ENCODING[t % 32] + id; t = Math.floor(t / 32); }
  const random = crypto.getRandomValues(new Uint8Array(10));
  for (let i = 0; i < 16; i++) id += ENCODING[random[i % 10] % 32];
  return id;
}

function nanoid(length: number = 21): string {
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes).map((b) => ALPHABET[b % 64]).join("");
}

export function registerRoutes(app: Hono) {
  app.post("/api/generate", async (c) => {
    await tryRequirePayment(0.001);
    const body = await c.req.json().catch(() => ({}));
    const format = (body.format || "uuidv4").toLowerCase();
    const count = Math.min(100, Math.max(1, body.count || 1));
    const len = Math.min(128, Math.max(4, body.length || 21));

    const generators: Record<string, () => string> = {
      uuidv4, uuidv7, ulid, nanoid: () => nanoid(len),
    };

    if (!generators[format]) return c.json({ error: `Unsupported format. Use: uuidv4, uuidv7, ulid, nanoid` }, 400);

    const ids = Array.from({ length: count }, () => generators[format]());
    return c.json({ format, count, ids, ...(format === "nanoid" ? { length: len } : {}) });
  });
}
