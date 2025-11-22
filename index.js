#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { handleToolCall, listTools } from './lib/tools.js';
import { handleGetPrompt, listPrompts } from './lib/prompts.js';

const createServer = () =>
  new Server(
    { name: 'example-mcp-server', version: '0.1.0' },
    { capabilities: { tools: {}, prompts: {} } }
  );

const registerHandlers = (server) => {
  server.setRequestHandler(ListToolsRequestSchema, () =>
    Promise.resolve(listTools())
  );

  server.setRequestHandler(CallToolRequestSchema, (request) =>
    Promise.resolve(request.params)
      .then(({ name, arguments: args }) => handleToolCall(name, args))
  );

  server.setRequestHandler(ListPromptsRequestSchema, () =>
    Promise.resolve(listPrompts())
  );

  server.setRequestHandler(GetPromptRequestSchema, (request) =>
    Promise.resolve(request.params)
      .then(({ name, arguments: args }) => handleGetPrompt(name, args))
  );

  return server;
};

const startServer = (server) =>
  Promise.resolve(new StdioServerTransport())
    .then((transport) => server.connect(transport))
    .then(() => console.error('MCP Server running on stdio'));

// Main execution
Promise.resolve(createServer())
  .then(registerHandlers)
  .then(startServer)
  .catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
