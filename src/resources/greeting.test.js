import { describe, it, expect } from 'vitest';
import { template, read } from './greeting.js';

describe('greeting resource', () => {
  describe('template', () => {
    it('has parameterized uri template', () => {
      expect(template.uriTemplate).toBe('greeting://{name}');
    });

    it('has text mime type', () => {
      expect(template.mimeType).toBe('text/plain');
    });
  });

  describe('read', () => {
    it('returns personalized greeting', () => {
      expect(read('World')).toBe('Hello, World! Welcome to the MCP server.');
    });

    it('handles different names', () => {
      expect(read('Alice')).toContain('Alice');
    });
  });
});
