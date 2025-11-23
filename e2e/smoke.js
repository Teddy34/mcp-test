#!/usr/bin/env node

import { spawn } from 'child_process';

// Pure functions
const createMessage = (id, method, params = {}) => ({
  jsonrpc: '2.0',
  id,
  method,
  params,
});

const parseJsonLine = (line) => {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
};

const formatResponse = (response) =>
  `📥 Response: ${JSON.stringify(response, null, 2)}`;

const processLines = (data) =>
  data
    .toString()
    .split('\n')
    .filter((line) => line.trim())
    .map(parseJsonLine)
    .filter(Boolean)
    .forEach((response) => console.log(formatResponse(response)));

// Test sequence definition - pure data
const testSequence = [
  { method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'test-client', version: '1.0.0' } }, delay: 0 },
  { method: 'tools/list', params: {}, delay: 100 },
  { method: 'prompts/list', params: {}, delay: 200 },
  { method: 'resources/list', params: {}, delay: 300 },
  { method: 'tools/call', params: { name: 'echo', arguments: { message: 'Hello MCP!' } }, delay: 400 },
  { method: 'tools/call', params: { name: 'add', arguments: { a: 10, b: 32 } }, delay: 500 },
  { method: 'prompts/get', params: { name: 'pirate-mode' }, delay: 600 },
  { method: 'resources/read', params: { uri: 'info://server' }, delay: 700 },
  { method: 'resources/read', params: { uri: 'greeting://World' }, delay: 800 },
];

// Side-effect functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendMessage = (stdin, messageId) => (method, params) => {
  const message = createMessage(messageId.current++, method, params);
  console.log(`\n📤 Request: ${method}`);
  stdin.write(JSON.stringify(message) + '\n');
};

const runTestSequence = (server) => {
  const messageId = { current: 1 };
  const send = sendMessage(server.stdin, messageId);

  return Promise.resolve()
    .then(() => console.log('\n=== Testing MCP Server ===\n'))
    .then(() =>
      testSequence.reduce(
        (chain, { method, params, delay: ms }) =>
          chain
            .then(() => delay(ms))
            .then(() => send(method, params)),
        Promise.resolve()
      )
    )
    .then(() => delay(500))
    .then(() => {
      console.log('\n✅ Test complete!');
      server.kill();
      process.exit(0);
    });
};

// Main execution
const spawnServer = () => spawn('node', ['../index.js'], { cwd: import.meta.dirname });

const attachHandlers = (server) => {
  server.stdout.on('data', processLines);
  server.stderr.on('data', (data) =>
    console.error('Server:', data.toString().trim())
  );
  return server;
};

Promise.resolve(spawnServer())
  .then(attachHandlers)
  .then((server) => delay(500).then(() => server))
  .then(runTestSequence)
  .catch((error) => {
    console.error('Test error:', error);
    process.exit(1);
  });
