// Prompts handler - routes MCP prompt requests to prompt implementations

import { definitions, execute } from '../prompts/index.js';

// MCP message wrapper
const userMessage = (text) => ({
  messages: [
    {
      role: 'user',
      content: { type: 'text', text },
    },
  ],
});

// List all available prompts
export const listPrompts = () => ({ prompts: definitions });

// Handle get prompt request
export const handleGetPrompt = (name, args) => userMessage(execute(name, args));
