#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {
  listTools,
  handleToolCall,
  listPrompts,
  handleGetPrompt,
  listResources,
  listResourceTemplates,
  readResource,
} from './src/handlers/index.js';

// Adapters for point-free handler composition
const toolCallAdapter = ({ name, arguments: args }) => handleToolCall(name, args);
const promptAdapter = ({ name, arguments: args }) => handleGetPrompt(name, args);

const createServer = () =>
  new Server(
    { name: 'example-mcp-server', version: '0.1.0' },
    { capabilities: { tools: {}, prompts: {}, resources: {} } }
  );

const resourceAdapter = ({ uri }) => readResource(uri);

const registerHandlers = (server) => {
  server.setRequestHandler(ListToolsRequestSchema, listTools);
  server.setRequestHandler(ListPromptsRequestSchema, listPrompts);
  server.setRequestHandler(ListResourcesRequestSchema, listResources);
  server.setRequestHandler(ListResourceTemplatesRequestSchema, listResourceTemplates);

  server.setRequestHandler(CallToolRequestSchema, (request) =>
    Promise.resolve(request.params).then(toolCallAdapter)
  );

  server.setRequestHandler(GetPromptRequestSchema, (request) =>
    Promise.resolve(request.params).then(promptAdapter)
  );

  server.setRequestHandler(ReadResourceRequestSchema, (request) =>
    Promise.resolve(request.params).then(resourceAdapter)
  );

  return server;
};

const startServer = (server) =>
  Promise.resolve(new StdioServerTransport())
    .then(server.connect.bind(server))
    .then(() => console.error('MCP Server running on stdio'));

// Main execution
Promise.resolve()
  .then(createServer)
  .then(registerHandlers)
  .then(startServer)
  .catch((error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
