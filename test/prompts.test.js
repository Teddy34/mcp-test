import { describe, it, expect } from 'vitest';
import {
  buildCodeReviewPrompt,
  helpfulAssistantPrompt,
  pirateModePrompt,
  userMessage,
  handleGetPrompt,
  listPrompts,
  promptDefinitions,
} from '../lib/prompts.js';

describe('prompts', () => {
  describe('buildCodeReviewPrompt', () => {
    it('includes code and language in output', () => {
      const result = buildCodeReviewPrompt('const x = 1;', 'javascript');
      expect(result).toContain('const x = 1;');
      expect(result).toContain('javascript');
    });

    it('includes security review instructions', () => {
      const result = buildCodeReviewPrompt('code', 'js');
      expect(result).toContain('Security vulnerabilities');
      expect(result).toContain('SQL injection');
    });
  });

  describe('helpfulAssistantPrompt', () => {
    it('contains polite constraint', () => {
      expect(helpfulAssistantPrompt).toContain('polite');
    });

    it('contains concise constraint', () => {
      expect(helpfulAssistantPrompt).toContain('concise');
    });
  });

  describe('pirateModePrompt', () => {
    it('contains pirate vocabulary', () => {
      expect(pirateModePrompt).toContain('Ahoy');
      expect(pirateModePrompt).toContain('matey');
      expect(pirateModePrompt).toContain('ye');
    });
  });

  describe('userMessage', () => {
    it('wraps text in user message structure', () => {
      expect(userMessage('hello')).toEqual({
        messages: [
          {
            role: 'user',
            content: { type: 'text', text: 'hello' },
          },
        ],
      });
    });
  });

  describe('handleGetPrompt', () => {
    it('handles code-review prompt with args', () => {
      const result = handleGetPrompt('code-review', {
        code: 'const x = 1;',
        language: 'javascript',
      });
      expect(result.messages[0].content.text).toContain('const x = 1;');
      expect(result.messages[0].content.text).toContain('javascript');
    });

    it('handles code-review prompt with defaults', () => {
      const result = handleGetPrompt('code-review', {});
      expect(result.messages[0].content.text).toContain('[No code provided]');
      expect(result.messages[0].content.text).toContain('code');
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

  describe('listPrompts', () => {
    it('returns prompts wrapped in object', () => {
      expect(listPrompts()).toEqual({ prompts: promptDefinitions });
    });

    it('contains all three prompts', () => {
      const { prompts } = listPrompts();
      const names = prompts.map((p) => p.name);
      expect(names).toEqual(['code-review', 'helpful-assistant', 'pirate-mode']);
    });
  });
});
