// Greeting resource - demonstrates parameterized resources

export const template = {
  uriTemplate: 'greeting://{name}',
  name: 'Greeting',
  description: 'A personalized greeting message',
  mimeType: 'text/plain',
};

export const read = (name) => `Hello, ${name}! Welcome to the MCP server.`;
