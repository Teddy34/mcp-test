// Add tool - adds two numbers together

export const definition = {
  name: 'add',
  description: 'Adds two numbers together',
  inputSchema: {
    type: 'object',
    properties: {
      a: { type: 'number', description: 'First number' },
      b: { type: 'number', description: 'Second number' },
    },
    required: ['a', 'b'],
  },
};

export const add = (a, b) => a + b;

export const formatSum = (a, b, result) =>
  `The sum of ${a} and ${b} is ${result}`;

export const execute = ({ a, b }) => formatSum(a, b, add(a, b));
