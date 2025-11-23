import { describe, it, expect } from 'vitest';
import {
  listResources,
  listResourceTemplates,
  readResource,
} from './resources.handler.js';

describe('resources handler', () => {
  describe('listResources', () => {
    it('returns resources wrapped in object', () => {
      const result = listResources();
      expect(result).toHaveProperty('resources');
      expect(Array.isArray(result.resources)).toBe(true);
    });

    it('contains server-info resource', () => {
      const { resources } = listResources();
      const uris = resources.map((r) => r.uri);
      expect(uris).toContain('info://server');
    });
  });

  describe('listResourceTemplates', () => {
    it('returns resource templates wrapped in object', () => {
      const result = listResourceTemplates();
      expect(result).toHaveProperty('resourceTemplates');
      expect(Array.isArray(result.resourceTemplates)).toBe(true);
    });

    it('contains greeting template', () => {
      const { resourceTemplates } = listResourceTemplates();
      const uriTemplates = resourceTemplates.map((t) => t.uriTemplate);
      expect(uriTemplates).toContain('greeting://{name}');
    });
  });

  describe('readResource', () => {
    it('reads server-info with MCP content wrapper', () => {
      const result = readResource('info://server');
      expect(result.contents).toHaveLength(1);
      expect(result.contents[0].mimeType).toBe('application/json');
    });

    it('reads greeting with parameter', () => {
      const result = readResource('greeting://Alice');
      expect(result.contents[0].text).toContain('Alice');
    });

    it('throws for unknown resource', () => {
      expect(() => readResource('unknown://foo')).toThrow('Unknown resource');
    });
  });
});
