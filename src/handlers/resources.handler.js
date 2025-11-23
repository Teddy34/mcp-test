// Resources handler - routes MCP resource requests to resource implementations

import * as serverInfo from '../resources/server-info.js';
import * as greeting from '../resources/greeting.js';

// Static resources (fixed URI)
const staticResourceList = [serverInfo];

// Template resources (parameterized URI)
const templateResourceList = [greeting];

const definitions = staticResourceList.map((r) => r.definition);
const templates = templateResourceList.map((r) => r.template);

// URI pattern matchers
const parseGreetingUri = (uri) => {
  const match = uri.match(/^greeting:\/\/(.+)$/);
  return match ? { name: match[1] } : null;
};

// List all available resources
export const listResources = () => ({ resources: definitions });

// List resource templates
export const listResourceTemplates = () => ({ resourceTemplates: templates });

// Read a specific resource by URI
export const readResource = (uri) => {
  // Static resources
  if (uri === 'info://server') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(serverInfo.read(), null, 2),
        },
      ],
    };
  }

  // Template resources
  const greetingParams = parseGreetingUri(uri);
  if (greetingParams) {
    return {
      contents: [
        {
          uri,
          mimeType: 'text/plain',
          text: greeting.read(greetingParams.name),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
};
