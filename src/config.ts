import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "uuid-generator",
  slug: "uuid-generator",
  description: "Generate UUIDs v4, v7, ULID, and nanoid. Batch generation support.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/generate",
      price: "$0.001",
      description: "Generate unique identifiers",
      toolName: "utility_generate_uuid",
      toolDescription: "Use this when you need to generate unique identifiers. Supports UUID v4 (random), UUID v7 (time-ordered), ULID (sortable), and nanoid (compact). Batch generation up to 100. Do NOT use for hashing — use crypto_generate_hash instead. Do NOT use for password generation — use security_check_password instead.",
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
