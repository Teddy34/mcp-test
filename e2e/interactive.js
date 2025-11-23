#!/usr/bin/env node

import { spawn } from 'child_process';
import * as readline from 'readline';

// Start the MCP server
const server = spawn('node', ['../index.js'], { cwd: import.meta.dirname });

let messageId = 1;

// Handle server responses
server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    try {
      const response = JSON.parse(line);
      console.log('\n📥 Server Response:');
      console.log(JSON.stringify(response, null, 2));
    } catch (e) {
      console.log('Non-JSON output:', line);
    }
  });
  console.log('\n> ');
});

server.stderr.on('data', (data) => {
  console.error('Server log:', data.toString());
});

// Function to send a message to the server
function sendMessage(method, params = {}) {
  const message = {
    jsonrpc: '2.0',
    id: messageId++,
    method,
    params,
  };
  console.log('\n📤 Sending:', JSON.stringify(message, null, 2));
  server.stdin.write(JSON.stringify(message) + '\n');
}

console.log('MCP Test Client');
console.log('================\n');
console.log('Commands:');
console.log('  1 - Initialize connection');
console.log('  2 - List tools');
console.log('  3 - List prompts');
console.log('  4 - Call echo tool');
console.log('  5 - Call add tool');
console.log('  6 - Get code-review prompt');
console.log('  7 - Get pirate-mode prompt');
console.log('  q - Quit\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  switch (input.trim()) {
    case '1':
      sendMessage('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: 'test-client',
          version: '1.0.0',
        },
      });
      break;

    case '2':
      sendMessage('tools/list');
      break;

    case '3':
      sendMessage('prompts/list');
      break;

    case '4':
      sendMessage('tools/call', {
        name: 'echo',
        arguments: { message: 'Hello from test client!' },
      });
      break;

    case '5':
      sendMessage('tools/call', {
        name: 'add',
        arguments: { a: 42, b: 8 },
      });
      break;

    case '6':
      sendMessage('prompts/get', {
        name: 'code-review',
        arguments: {
          code: 'function add(a, b) { return a + b; }',
          language: 'javascript',
        },
      });
      break;

    case '7':
      sendMessage('prompts/get', {
        name: 'pirate-mode',
      });
      break;

    case 'q':
      console.log('Shutting down...');
      server.kill();
      rl.close();
      process.exit(0);
      break;

    default:
      console.log('Unknown command');
  }
});

process.on('SIGINT', () => {
  server.kill();
  rl.close();
  process.exit(0);
});
