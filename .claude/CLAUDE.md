# MCP Test Server

## Project Overview

This is an MCP (Model Context Protocol) server implementation using stdio transport.

## Tech Stack

- Node.js (ES modules)
- @modelcontextprotocol/sdk

## Project Structure

- `index.js` - Main MCP server entry point
- `src/` - Core modules with collocated unit tests
  - `handlers/` - MCP protocol routing
    - `tools.handler.js` - Routes tool requests
    - `prompts.handler.js` - Routes prompt requests
    - `resources.handler.js` - Routes resource requests
  - `tools/` - Tool implementations (business logic)
    - `echo.js` - Echo tool
    - `add.js` - Add tool
  - `prompts/` - Prompt implementations
    - `code-review.js` - Security-focused code review
    - `helpful-assistant.js` - Polite, concise assistant
    - `pirate-mode.js` - Pirate speak mode
  - `resources/` - Resource implementations (readable data)
    - `server-info.js` - Server metadata
    - `greeting.js` - Parameterized greeting
  - `connectors/` - External resource access (DB, APIs)
- `e2e/` - End-to-end tests
  - `interactive.js` - Interactive client for debugging
  - `smoke.js` - Automated smoke test

## Running

```bash
# Start server (used by MCP clients)
node index.js

# Run unit tests
npm test

# Interactive e2e testing
node e2e/interactive.js

# Automated e2e test
node e2e/smoke.js
```

## MCP Features

### Tools
- `echo` - Echoes back input text
- `add` - Adds two numbers

### Prompts
- `code-review` - Security-focused code review
- `helpful-assistant` - Polite, concise assistant
- `pirate-mode` - Pirate speak mode

### Resources
- `info://server` - Server metadata (static)
- `greeting://{name}` - Personalized greeting (template)

## Development Notes

### Testing Strategy

Choose test style based on complexity:

**Compact style** - for simple pure functions:
```javascript
it('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

**AAA pattern** - for complex tests with setup or multiple steps:
```javascript
it('handles tool call with arguments', () => {
  // Arrange
  const name = 'echo';
  const args = { message: 'test' };

  // Act
  const result = handleToolCall(name, args);

  // Assert
  expect(result.content[0].text).toBe('Echo: test');
});
```

Use AAA when: complex setup, multiple assertions, debugging is likely, or test logic isn't immediately obvious.
