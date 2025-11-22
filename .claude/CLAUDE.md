# MCP Test Server

## Project Overview

This is an MCP (Model Context Protocol) server implementation using stdio transport.

## Tech Stack

- Node.js (ES modules)
- @modelcontextprotocol/sdk

## Project Structure

- `index.js` - Main MCP server with tools and prompts
- `test-client.js` - Interactive client for debugging
- `test-simple.js` - Automated smoke test

## Running

```bash
# Start server (used by MCP clients)
node index.js

# Interactive testing
node test-client.js

# Automated test
node test-simple.js
```

## MCP Features

### Tools
- `echo` - Echoes back input text
- `add` - Adds two numbers

### Prompts
- `code-review` - Security-focused code review
- `helpful-assistant` - Polite, concise assistant
- `pirate-mode` - Pirate speak mode

## Development Notes

<!-- Add project-specific notes, conventions, and context here -->
