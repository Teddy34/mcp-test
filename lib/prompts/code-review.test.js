import { describe, it, expect } from 'vitest';
import { buildPrompt, execute } from './code-review.js';

describe('code-review prompt', () => {
  describe('buildPrompt', () => {
    it('includes code and language in output', () => {
      const result = buildPrompt('const x = 1;', 'javascript');
      expect(result).toContain('const x = 1;');
      expect(result).toContain('javascript');
    });

    it('includes security review instructions', () => {
      const result = buildPrompt('code', 'js');
      expect(result).toContain('Security vulnerabilities');
      expect(result).toContain('SQL injection');
    });
  });

  describe('execute', () => {
    it('handles args with code and language', () => {
      const result = execute({ code: 'const x = 1;', language: 'javascript' });
      expect(result).toContain('const x = 1;');
      expect(result).toContain('javascript');
    });

    it('handles missing args with defaults', () => {
      const result = execute({});
      expect(result).toContain('[No code provided]');
      expect(result).toContain('code');
    });
  });
});
