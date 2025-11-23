// Echo tool - echoes back input text

export const definition = {
  name: 'echo',
  description: 'Echoes back the input text',
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'The message to echo back',
      },
    },
    required: ['message'],
  },
};

export const execute = ({ message }) => `Echo: ${message}`;
