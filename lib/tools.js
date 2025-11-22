// Tool definitions - pure data
export const toolDefinitions = [
  {
    name: 'echo',
    description: 'Echoes back the input text',
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The message to echo back',
        },
      },
      required: ['message'],
    },
  },
  {
    name: 'add',
    description: 'Adds two numbers together',
    inputSchema: {
      type: 'object',
      properties: {
        a: { type: 'number', description: 'First number' },
        b: { type: 'number', description: 'Second number' },
      },
      required: ['a', 'b'],
    },
  },
];

// Pure functions for tool operations
export const echo = (message) => `Echo: ${message}`;

export const add = (a, b) => a + b;

export const formatSum = (a, b, result) =>
  `The sum of ${a} and ${b} is ${result}`;

// Text content wrapper - pure function
export const textContent = (text) => ({
  content: [{ type: 'text', text }],
});

// Tool handlers - pure functions returning content
const toolHandlers = {
  echo: ({ message }) => textContent(echo(message)),

  add: ({ a, b }) => textContent(formatSum(a, b, add(a, b))),
};

// Main dispatcher - pure function
export const handleToolCall = (name, args) => {
  const handler = toolHandlers[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return handler(args);
};

// List tools - pure function
export const listTools = () => ({ tools: toolDefinitions });
