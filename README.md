# UUID Generator API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://uuid-generator.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Generate UUID v4, v7, ULID, or nanoid identifiers. Batch up to 100 at once. Sortable, compact, or random formats. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "uuid-generator": {
      "url": "https://uuid-generator.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://uuid-generator.api.klymax402.com/api/generate" \
  -H "Content-Type: application/json" \
  -d '{}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `utility_generate_uuid` | POST | `/api/generate` | $0.003 | Generate unique identifiers |

### `utility_generate_uuid`

Use this when you need to generate unique identifiers for database records, API keys, or session tokens. Returns an array of IDs in the chosen format.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `format` | string | no | Format: uuidv4, uuidv7, ulid, nanoid (default: uuidv4) |
| `count` | number | no | Number to generate (default: 1, max: 100) |
| `length` | number | no | Length for nanoid (default: 21) |

Example response:

```json
{"ids":["550e8400-e29b-41d4-a716-446655440000"],"format":"uuidv4","count":1}
```

**When to use**: creating primary keys, correlation IDs, or unique file names. Use uuidv7 or ulid WHEN you need time-sortable IDs for databases. Use nanoid FOR short URL-safe tokens.

**Not for**: hashing (use `crypto_generate_hash`), password generation (use `security_check_password`), slug generation (use `text_generate_slug`).

## Example agent prompts

- "Generate unique identifiers for database records, API keys, or session tokens"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)
- Also reachable via [ATXP](https://atxp.ai) (OAuth-wrapped x402, RFC 9728 protected-resource metadata)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
