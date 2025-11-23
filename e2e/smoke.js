#!/usr/bin/env node

import { spawn } from 'child_process';

// Test client for MCP server
class McpTestClient {
  constructor() {
    this.server = null;
    this.messageId = 1;
    this.pending = new Map();
  }

  start() {
    return new Promise((resolve) => {
      this.server = spawn('node', ['../index.js'], { cwd: import.meta.dirname });

      this.server.stdout.on('data', (data) => {
        data
          .toString()
          .split('\n')
          .filter((line) => line.trim())
          .forEach((line) => {
            try {
              const response = JSON.parse(line);
              const resolver = this.pending.get(response.id);
              if (resolver) {
                this.pending.delete(response.id);
                resolver(response);
              }
            } catch {
              // ignore non-JSON output
            }
          });
      });

      this.server.stderr.on('data', () => {});

      setTimeout(resolve, 500);
    });
  }

  stop() {
    if (this.server) {
      this.server.kill();
    }
  }

  request(method, params = {}) {
    return new Promise((resolve) => {
      const id = this.messageId++;
      this.pending.set(id, resolve);
      const message = { jsonrpc: '2.0', id, method, params };
      this.server.stdin.write(JSON.stringify(message) + '\n');
    });
  }
}

// Test runner
const tests = [];
const test = (name, fn) => tests.push({ name, fn });

// Assertions
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const assertEquals = (actual, expected, message) => {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${expected}, got ${actual}`);
  }
};

const assertContains = (obj, key, message) => {
  if (!(key in obj)) {
    throw new Error(`${message}: missing key ${key}`);
  }
};

// ============ TESTS ============

test('initialize - returns server info', async (client) => {
  const res = await client.request('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test-client', version: '1.0.0' },
  });
  assertContains(res, 'result', 'should have result');
  assertEquals(res.result.serverInfo.name, 'example-mcp-server', 'server name');
});

test('tools/list - returns echo and add tools', async (client) => {
  const res = await client.request('tools/list');
  const names = res.result.tools.map((t) => t.name);
  assert(names.includes('echo'), 'should include echo tool');
  assert(names.includes('add'), 'should include add tool');
});

test('tools/call echo - echoes message', async (client) => {
  const res = await client.request('tools/call', {
    name: 'echo',
    arguments: { message: 'Hello MCP!' },
  });
  assertEquals(res.result.content[0].text, 'Echo: Hello MCP!', 'echo response');
});

test('tools/call add - adds numbers', async (client) => {
  const res = await client.request('tools/call', {
    name: 'add',
    arguments: { a: 10, b: 32 },
  });
  assertEquals(res.result.content[0].text, 'The sum of 10 and 32 is 42', 'add response');
});

test('prompts/list - returns all prompts', async (client) => {
  const res = await client.request('prompts/list');
  const names = res.result.prompts.map((p) => p.name);
  assert(names.includes('code-review'), 'should include code-review');
  assert(names.includes('helpful-assistant'), 'should include helpful-assistant');
  assert(names.includes('pirate-mode'), 'should include pirate-mode');
});

test('prompts/get pirate-mode - returns pirate prompt', async (client) => {
  const res = await client.request('prompts/get', { name: 'pirate-mode' });
  const text = res.result.messages[0].content.text;
  assert(text.includes('Ahoy'), 'should contain Ahoy');
  assert(text.includes('matey'), 'should contain matey');
});

test('resources/list - returns server-info resource', async (client) => {
  const res = await client.request('resources/list');
  const uris = res.result.resources.map((r) => r.uri);
  assert(uris.includes('info://server'), 'should include server-info');
});

test('resources/read info://server - returns server metadata', async (client) => {
  const res = await client.request('resources/read', { uri: 'info://server' });
  const content = JSON.parse(res.result.contents[0].text);
  assertEquals(content.name, 'example-mcp-server', 'server name');
  assertContains(content, 'uptime', 'should have uptime');
  assertContains(content, 'nodeVersion', 'should have nodeVersion');
});

test('resources/read greeting://World - returns greeting', async (client) => {
  const res = await client.request('resources/read', { uri: 'greeting://World' });
  const text = res.result.contents[0].text;
  assert(text.includes('Hello, World!'), 'should greet World');
});

// ============ RUNNER ============

async function run() {
  console.log('\n=== MCP Server E2E Tests ===\n');

  const client = new McpTestClient();
  await client.start();

  let passed = 0;
  let failed = 0;

  for (const { name, fn } of tests) {
    try {
      await fn(client);
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${name}`);
      console.log(`   ${error.message}`);
      failed++;
    }
  }

  client.stop();

  console.log(`\n${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((error) => {
  console.error('Test runner error:', error);
  process.exit(1);
});
