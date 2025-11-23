import { describe, it, expect } from 'vitest';
import { listTools, handleToolCall } from './tools.handler.js';

describe('tools handler', () => {
  describe('listTools', () => {
    it('returns tools wrapped in object', () => {
      const result = listTools();
      expect(result).toHaveProperty('tools');
      expect(Array.isArray(result.tools)).toBe(true);
    });

    it('contains echo and add tools', () => {
      const { tools } = listTools();
      const names = tools.map((t) => t.name);
      expect(names).toContain('echo');
      expect(names).toContain('add');
    });
  });

  describe('handleToolCall', () => {
    it('handles echo tool with MCP content wrapper', () => {
      const result = handleToolCall('echo', { message: 'test' });
      expect(result).toEqual({
        content: [{ type: 'text', text: 'Echo: test' }],
      });
    });

    it('handles add tool with MCP content wrapper', () => {
      const result = handleToolCall('add', { a: 10, b: 32 });
      expect(result).toEqual({
        content: [{ type: 'text', text: 'The sum of 10 and 32 is 42' }],
      });
    });

    it('throws for unknown tool', () => {
      expect(() => handleToolCall('unknown', {})).toThrow('Unknown tool: unknown');
    });
  });
});
