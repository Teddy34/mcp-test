import { describe, it, expect } from 'vitest';
import { definitions, execute } from './index.js';

describe('tools index', () => {
  describe('definitions', () => {
    it('contains echo and add tools', () => {
      const names = definitions.map((t) => t.name);
      expect(names).toContain('echo');
      expect(names).toContain('add');
    });
  });

  describe('execute', () => {
    it('executes echo tool', () => {
      expect(execute('echo', { message: 'test' })).toBe('Echo: test');
    });

    it('executes add tool', () => {
      expect(execute('add', { a: 2, b: 3 })).toBe('The sum of 2 and 3 is 5');
    });

    it('throws for unknown tool', () => {
      expect(() => execute('unknown', {})).toThrow('Unknown tool: unknown');
    });
  });
});
