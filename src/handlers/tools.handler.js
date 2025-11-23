// Tools handler - routes MCP tool requests to tool implementations

import * as echo from '../tools/echo.js';
import * as add from '../tools/add.js';

const toolList = [echo, add];

const definitions = toolList.map((t) => t.definition);

const executors = Object.fromEntries(
  toolList.map((t) => [t.definition.name, t.execute])
);

// MCP content wrapper
const textContent = (text) => ({
  content: [{ type: 'text', text }],
});

// List all available tools
export const listTools = () => ({ tools: definitions });

// Handle tool call request
export const handleToolCall = (name, args) => {
  const executor = executors[name];
  if (!executor) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return textContent(executor(args));
};
