import { describe, it, expect } from 'vitest';
import { prompt, execute } from './helpful-assistant.js';

describe('helpful-assistant prompt', () => {
  it('contains polite constraint', () => {
    expect(prompt).toContain('polite');
  });

  it('contains concise constraint', () => {
    expect(prompt).toContain('concise');
  });

  it('execute returns the prompt', () => {
    expect(execute()).toBe(prompt);
  });
});
