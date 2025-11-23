// Prompts aggregator - collects all prompt definitions and executors

import * as codeReview from './code-review.js';
import * as helpfulAssistant from './helpful-assistant.js';
import * as pirateMode from './pirate-mode.js';

const prompts = [codeReview, helpfulAssistant, pirateMode];

export const definitions = prompts.map((p) => p.definition);

const executors = Object.fromEntries(
  prompts.map((p) => [p.definition.name, p.execute])
);

export const execute = (name, args) => {
  const executor = executors[name];
  if (!executor) {
    throw new Error(`Unknown prompt: ${name}`);
  }
  return executor(args);
};
