import { describe, it, expect } from 'vitest';
import { definitions, templates, read } from './index.js';

describe('resources index', () => {
  describe('definitions', () => {
    it('contains server-info resource', () => {
      const uris = definitions.map((r) => r.uri);
      expect(uris).toContain('info://server');
    });
  });

  describe('templates', () => {
    it('contains greeting template', () => {
      const uriTemplates = templates.map((t) => t.uriTemplate);
      expect(uriTemplates).toContain('greeting://{name}');
    });
  });

  describe('read', () => {
    it('reads server-info resource', () => {
      const result = read('info://server');
      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe('info://server');
      expect(result.contents[0].mimeType).toBe('application/json');
      expect(JSON.parse(result.contents[0].text)).toHaveProperty('name');
    });

    it('reads greeting resource with parameter', () => {
      const result = read('greeting://World');
      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].uri).toBe('greeting://World');
      expect(result.contents[0].text).toContain('World');
    });

    it('throws for unknown resource', () => {
      expect(() => read('unknown://foo')).toThrow('Unknown resource');
    });
  });
});
