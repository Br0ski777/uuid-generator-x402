import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "uuid-generator",
  slug: "uuid-generator",
  description: "Generate UUID v4, v7, ULID, or nanoid identifiers. Batch up to 100 at once. Sortable, compact, or random formats.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/generate",
      price: "$0.001",
      description: "Generate unique identifiers",
      toolName: "utility_generate_uuid",
      toolDescription: `Use this when you need to generate unique identifiers for database records, API keys, or session tokens. Returns an array of IDs in the chosen format.

1. ids -- array of generated identifiers (strings)
2. format -- the format used (uuidv4, uuidv7, ulid, nanoid)
3. count -- number of IDs generated
4. length -- character length of each ID (relevant for nanoid)

Example output: {"ids":["550e8400-e29b-41d4-a716-446655440000"],"format":"uuidv4","count":1}

Use this FOR creating primary keys, correlation IDs, or unique file names. Use uuidv7 or ulid WHEN you need time-sortable IDs for databases. Use nanoid FOR short URL-safe tokens.

Do NOT use for hashing -- use crypto_generate_hash instead. Do NOT use for password generation -- use security_check_password instead. Do NOT use for slug generation -- use text_generate_slug instead.`,
      inputSchema: {
        type: "object",
        properties: {
          format: { type: "string", description: "Format: uuidv4, uuidv7, ulid, nanoid (default: uuidv4)" },
          count: { type: "number", description: "Number to generate (default: 1, max: 100)" },
          length: { type: "number", description: "Length for nanoid (default: 21)" },
        },
        required: [],
      },
    },
  ],
};
