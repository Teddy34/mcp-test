// Server info resource - exposes server metadata

export const definition = {
  uri: 'info://server',
  name: 'Server Info',
  description: 'Current server configuration and status',
  mimeType: 'application/json',
};

export const read = () => ({
  name: 'example-mcp-server',
  version: '0.1.0',
  uptime: process.uptime(),
  nodeVersion: process.version,
  platform: process.platform,
});
