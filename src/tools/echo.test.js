import { describe, it, expect } from 'vitest';
import { execute } from './echo.js';

describe('echo tool', () => {
  it('prepends "Echo: " to the message', () => {
    expect(execute({ message: 'hello' })).toBe('Echo: hello');
  });

  it('handles empty string', () => {
    expect(execute({ message: '' })).toBe('Echo: ');
  });

  it('handles special characters', () => {
    expect(execute({ message: 'hello\nworld' })).toBe('Echo: hello\nworld');
  });
});
