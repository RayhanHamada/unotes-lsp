import { SwaggerOptions } from '@fastify/swagger';

export const swaggerConfig: SwaggerOptions = {
  routePrefix: '/',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'UNotes REST API',
      version: '0.0.0',
      description: 'UNotes REST API',
    },
    produces: ['application/json'],
    consumes: ['application/json'],
    schemes: ['http', 'https'],
  },
  uiConfig: {
    docExpansion: 'list',
    // deepLinking: false,
  },
};
