import { describe, it, expect } from 'vitest';
import {
  echo,
  add,
  formatSum,
  textContent,
  handleToolCall,
  listTools,
  toolDefinitions,
} from './tools.js';

describe('tools', () => {
  describe('echo', () => {
    it('prepends "Echo: " to the message', () => {
      expect(echo('hello')).toBe('Echo: hello');
    });

    it('handles empty string', () => {
      expect(echo('')).toBe('Echo: ');
    });

    it('handles special characters', () => {
      expect(echo('hello\nworld')).toBe('Echo: hello\nworld');
    });
  });

  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('adds negative numbers', () => {
      expect(add(-5, 3)).toBe(-2);
    });

    it('adds decimals', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('handles zero', () => {
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('formatSum', () => {
    it('formats the sum message correctly', () => {
      expect(formatSum(2, 3, 5)).toBe('The sum of 2 and 3 is 5');
    });

    it('handles negative numbers in format', () => {
      expect(formatSum(-1, -2, -3)).toBe('The sum of -1 and -2 is -3');
    });
  });

  describe('textContent', () => {
    it('wraps text in content array structure', () => {
      expect(textContent('hello')).toEqual({
        content: [{ type: 'text', text: 'hello' }],
      });
    });
  });

  describe('handleToolCall', () => {
    it('handles echo tool', () => {
      const result = handleToolCall('echo', { message: 'test' });
      expect(result).toEqual({
        content: [{ type: 'text', text: 'Echo: test' }],
      });
    });

    it('handles add tool', () => {
      const result = handleToolCall('add', { a: 10, b: 32 });
      expect(result).toEqual({
        content: [{ type: 'text', text: 'The sum of 10 and 32 is 42' }],
      });
    });

    it('throws for unknown tool', () => {
      expect(() => handleToolCall('unknown', {})).toThrow('Unknown tool: unknown');
    });
  });

  describe('listTools', () => {
    it('returns tools wrapped in object', () => {
      expect(listTools()).toEqual({ tools: toolDefinitions });
    });

    it('contains echo and add tools', () => {
      const { tools } = listTools();
      const names = tools.map((t) => t.name);
      expect(names).toContain('echo');
      expect(names).toContain('add');
    });
  });
});
