---
name: unit-test
description: Use when writing unit tests, reviewing test code, or discussing test strategies. Applies Arrange-Act-Assert pattern based on complexity and ensures precise test descriptions.
---

# Unit Test Expert

## Writing Tests

### Test Style Selection

Choose style based on complexity:

**Compact style** - for simple pure functions:
```javascript
it('adds two positive numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

**AAA pattern** - for complex tests with setup or multiple steps:
```javascript
it('returns error when user not found', () => {
  // Arrange
  const userId = 'non-existent-id';
  const repository = createMockRepository({ users: [] });

  // Act
  const result = repository.findUser(userId);

  // Assert
  expect(result).toBeNull();
  expect(repository.queryCount).toBe(1);
});
```

**Use AAA when:**
- Complex setup required
- Multiple assertions needed
- Debugging is likely
- Test logic isn't immediately obvious

### Test Descriptions

Test descriptions must be precise enough to understand the test without reading the code:

**Good descriptions:**
- `'returns null when user ID does not exist'`
- `'throws ValidationError when email format is invalid'`
- `'calculates total with 10% discount for orders over $100'`

**Poor descriptions:**
- `'works correctly'`
- `'handles edge case'`
- `'test error'`

**Pattern:** `'<action> when <condition>'` or `'<expected outcome> for <input scenario>'`

## Reviewing Tests

When reviewing tests, focus on:

### 1. Case Coverage
- Are happy path scenarios covered?
- Are edge cases tested (empty, null, boundary values)?
- Are error conditions handled?
- Are async scenarios properly tested?

### 2. Description Accuracy
- Does the description match what the test actually verifies?
- Would someone understand the test's purpose from the description alone?
- Is the description specific enough to distinguish from other tests?

### 3. Test Quality
- Is the test testing one thing (single responsibility)?
- Are assertions meaningful and specific?
- Is the test deterministic (no flaky tests)?
- Are mocks/stubs used appropriately?
