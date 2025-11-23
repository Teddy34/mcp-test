import { describe, it, expect } from 'vitest';
import { listPrompts, handleGetPrompt } from './prompts.handler.js';
import { prompt as helpfulAssistantPrompt } from '../prompts/helpful-assistant.js';
import { prompt as pirateModePrompt } from '../prompts/pirate-mode.js';

describe('prompts handler', () => {
  describe('listPrompts', () => {
    it('returns prompts wrapped in object', () => {
      const result = listPrompts();
      expect(result).toHaveProperty('prompts');
      expect(Array.isArray(result.prompts)).toBe(true);
    });

    it('contains all three prompts', () => {
      const { prompts } = listPrompts();
      const names = prompts.map((p) => p.name);
      expect(names).toEqual(['code-review', 'helpful-assistant', 'pirate-mode']);
    });
  });

  describe('handleGetPrompt', () => {
    it('handles code-review prompt with MCP message wrapper', () => {
      const result = handleGetPrompt('code-review', {
        code: 'const x = 1;',
        language: 'javascript',
      });
      expect(result.messages[0].role).toBe('user');
      expect(result.messages[0].content.type).toBe('text');
      expect(result.messages[0].content.text).toContain('const x = 1;');
      expect(result.messages[0].content.text).toContain('javascript');
    });

    it('handles code-review prompt with defaults', () => {
      const result = handleGetPrompt('code-review', {});
      expect(result.messages[0].content.text).toContain('[No code provided]');
    });

    it('handles helpful-assistant prompt', () => {
      const result = handleGetPrompt('helpful-assistant', {});
      expect(result.messages[0].content.text).toBe(helpfulAssistantPrompt);
    });

    it('handles pirate-mode prompt', () => {
      const result = handleGetPrompt('pirate-mode', {});
      expect(result.messages[0].content.text).toBe(pirateModePrompt);
    });

    it('throws for unknown prompt', () => {
      expect(() => handleGetPrompt('unknown', {})).toThrow('Unknown prompt: unknown');
    });
  });
});
