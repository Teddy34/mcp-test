// Resources handler - routes MCP resource requests to resource implementations

import { definitions, templates, read } from '../resources/index.js';

// List all available resources
export const listResources = () => ({ resources: definitions });

// List resource templates
export const listResourceTemplates = () => ({ resourceTemplates: templates });

// Read a specific resource by URI
export const readResource = (uri) => read(uri);
