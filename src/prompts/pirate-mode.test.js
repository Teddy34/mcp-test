import { describe, it, expect } from 'vitest';
import { prompt, execute } from './pirate-mode.js';

describe('pirate-mode prompt', () => {
  it('contains pirate vocabulary', () => {
    expect(prompt).toContain('Ahoy');
    expect(prompt).toContain('matey');
    expect(prompt).toContain('ye');
  });

  it('execute returns the prompt', () => {
    expect(execute()).toBe(prompt);
  });
});
