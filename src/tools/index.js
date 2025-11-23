// Tools aggregator - collects all tool definitions and executors

import * as echo from './echo.js';
import * as add from './add.js';

const tools = [echo, add];

export const definitions = tools.map((t) => t.definition);

const executors = Object.fromEntries(
  tools.map((t) => [t.definition.name, t.execute])
);

export const execute = (name, args) => {
  const executor = executors[name];
  if (!executor) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return executor(args);
};
