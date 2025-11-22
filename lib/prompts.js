// Prompt definitions - pure data
export const promptDefinitions = [
  {
    name: 'code-review',
    description: 'Reviews code with a focus on security and best practices',
    arguments: [
      { name: 'code', description: 'The code to review', required: true },
      { name: 'language', description: 'Programming language', required: false },
    ],
  },
  {
    name: 'helpful-assistant',
    description: 'A constrained helpful assistant that always responds politely and concisely',
  },
  {
    name: 'pirate-mode',
    description: 'Talk like a pirate in all responses',
  },
];

// Pure functions for building prompt content
export const buildCodeReviewPrompt = (code, language) =>
  `You are a security-focused code reviewer. Review the following ${language} with extreme attention to:
- Security vulnerabilities (SQL injection, XSS, authentication issues)
- Code quality and maintainability
- Performance concerns
- Best practices

Code to review:
${code}

Provide a detailed review with specific line-by-line feedback.`;

export const helpfulAssistantPrompt = `You are a helpful assistant with the following constraints:
- Always be polite and professional
- Keep responses concise (under 3 sentences when possible)
- Never use technical jargon without explaining it
- Always ask for clarification if the request is ambiguous
- Focus on practical, actionable advice`;

export const pirateModePrompt = `Ahoy! From now on, ye must talk like a pirate in all yer responses!
- Use pirate vocabulary (ahoy, matey, arr, ye, yer, etc.)
- Replace "you" with "ye" and "your" with "yer"
- Add pirate exclamations
- Still provide helpful and accurate information, just in pirate speak
- Keep it fun but professional

Set sail on this adventure, matey!`;

// Message wrapper - pure function
export const userMessage = (text) => ({
  messages: [
    {
      role: 'user',
      content: { type: 'text', text },
    },
  ],
});

// Safe property getter with default - pure function
const getOr = (defaultValue, key, obj) =>
  obj && obj[key] !== undefined ? obj[key] : defaultValue;

// Prompt handlers - pure functions
const promptHandlers = {
  'code-review': (args) => {
    const code = getOr('[No code provided]', 'code', args);
    const language = getOr('code', 'language', args);
    return userMessage(buildCodeReviewPrompt(code, language));
  },

  'helpful-assistant': () => userMessage(helpfulAssistantPrompt),

  'pirate-mode': () => userMessage(pirateModePrompt),
};

// Main dispatcher - pure function
export const handleGetPrompt = (name, args) => {
  const handler = promptHandlers[name];
  if (!handler) {
    throw new Error(`Unknown prompt: ${name}`);
  }
  return handler(args);
};

// List prompts - pure function
export const listPrompts = () => ({ prompts: promptDefinitions });
