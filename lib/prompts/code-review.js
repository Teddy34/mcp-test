// Code review prompt - security-focused code review

export const definition = {
  name: 'code-review',
  description: 'Reviews code with a focus on security and best practices',
  arguments: [
    { name: 'code', description: 'The code to review', required: true },
    { name: 'language', description: 'Programming language', required: false },
  ],
};

export const buildPrompt = (code, language) =>
  `You are a security-focused code reviewer. Review the following ${language} with extreme attention to:
- Security vulnerabilities (SQL injection, XSS, authentication issues)
- Code quality and maintainability
- Performance concerns
- Best practices

Code to review:
${code}

Provide a detailed review with specific line-by-line feedback.`;

const getOr = (defaultValue, key, obj) =>
  obj && obj[key] !== undefined ? obj[key] : defaultValue;

export const execute = (args) => {
  const code = getOr('[No code provided]', 'code', args);
  const language = getOr('code', 'language', args);
  return buildPrompt(code, language);
};
