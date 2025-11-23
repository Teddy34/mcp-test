// Tools handler - routes MCP tool requests to tool implementations

import { definitions, execute } from '../tools/index.js';

// MCP content wrapper
const textContent = (text) => ({
  content: [{ type: 'text', text }],
});

// List all available tools
export const listTools = () => ({ tools: definitions });

// Handle tool call request
export const handleToolCall = (name, args) => textContent(execute(name, args));
