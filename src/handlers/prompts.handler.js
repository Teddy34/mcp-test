// Prompts handler - routes MCP prompt requests to prompt implementations

import * as codeReview from '../prompts/code-review.js';
import * as helpfulAssistant from '../prompts/helpful-assistant.js';
import * as pirateMode from '../prompts/pirate-mode.js';

const promptList = [codeReview, helpfulAssistant, pirateMode];

const definitions = promptList.map((p) => p.definition);

const executors = Object.fromEntries(
  promptList.map((p) => [p.definition.name, p.execute])
);

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
export const handleGetPrompt = (name, args) => {
  const executor = executors[name];
  if (!executor) {
    throw new Error(`Unknown prompt: ${name}`);
  }
  return userMessage(executor(args));
};
