# mcp-test

[![CI](https://github.com/Teddy34/mcp-test/actions/workflows/ci.yml/badge.svg)](https://github.com/Teddy34/mcp-test/actions/workflows/ci.yml)
![Coverage](./badges/coverage.svg)

MCP (Model Context Protocol) server implementation using stdio transport.

## Quick Start

```bash
# Install dependencies
npm install

# Run server
node index.js

# Run tests
npm test
npm run test:e2e
```

## Features

- **Tools**: `echo`, `add`
- **Prompts**: `code-review`, `helpful-assistant`, `pirate-mode`
- **Resources**: `info://server`, `greeting://{name}`

See [CLAUDE.md](.claude/CLAUDE.md) for detailed documentation.
