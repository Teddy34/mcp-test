// Resources aggregator - collects all resource definitions and readers

import * as serverInfo from './server-info.js';
import * as greeting from './greeting.js';

// Static resources (fixed URI)
const staticResources = [serverInfo];

// Template resources (parameterized URI)
const templateResources = [greeting];

export const definitions = staticResources.map((r) => r.definition);

export const templates = templateResources.map((r) => r.template);

// URI pattern matchers
const parseGreetingUri = (uri) => {
  const match = uri.match(/^greeting:\/\/(.+)$/);
  return match ? { name: match[1] } : null;
};

// Read resource by URI
export const read = (uri) => {
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
