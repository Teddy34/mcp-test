import { describe, it, expect } from 'vitest';
import { definition, read } from './server-info.js';

describe('server-info resource', () => {
  describe('definition', () => {
    it('has correct uri', () => {
      expect(definition.uri).toBe('info://server');
    });

    it('has json mime type', () => {
      expect(definition.mimeType).toBe('application/json');
    });
  });

  describe('read', () => {
    it('returns server metadata', () => {
      const result = read();
      expect(result).toHaveProperty('name', 'example-mcp-server');
      expect(result).toHaveProperty('version', '0.1.0');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('nodeVersion');
      expect(result).toHaveProperty('platform');
    });
  });
});
