import { describe, it, expect } from 'vitest';
import { add, formatSum, execute } from './add.js';

describe('add tool', () => {
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

  describe('execute', () => {
    it('returns formatted sum', () => {
      expect(execute({ a: 10, b: 32 })).toBe('The sum of 10 and 32 is 42');
    });
  });
});
