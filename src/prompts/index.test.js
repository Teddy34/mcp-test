import { describe, it, expect } from 'vitest';
import { definitions, execute } from './index.js';

describe('prompts index', () => {
  describe('definitions', () => {
    it('contains all three prompts', () => {
      const names = definitions.map((p) => p.name);
      expect(names).toEqual(['code-review', 'helpful-assistant', 'pirate-mode']);
    });
  });

  describe('execute', () => {
    it('executes code-review prompt', () => {
      const result = execute('code-review', { code: 'test', language: 'js' });
      expect(result).toContain('test');
      expect(result).toContain('js');
    });

    it('executes helpful-assistant prompt', () => {
      const result = execute('helpful-assistant', {});
      expect(result).toContain('polite');
    });

    it('executes pirate-mode prompt', () => {
      const result = execute('pirate-mode', {});
      expect(result).toContain('Ahoy');
    });

    it('throws for unknown prompt', () => {
      expect(() => execute('unknown', {})).toThrow('Unknown prompt: unknown');
    });
  });
});
