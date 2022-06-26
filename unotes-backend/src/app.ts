import { fastify } from 'fastify';
import CORS from '@fastify/cors';
import swagger from '@fastify/swagger';

import { onReady } from 'src/hooks';
import { CORSConfig, swaggerConfig } from 'src/configs';
import { noteRoutes, userRoutes } from 'src/routes';

const app = fastify({
  logger: true,
  ajv: {
    customOptions: {
      keywords: ['kind'],
    },
  },
});

/**
 * register plugin
 */
app.register(CORS, CORSConfig);
app.register(swagger, swaggerConfig);

/**
 * register hooks
 */
app.addHook('onReady', onReady);

/**
 * register routes
 */
app.register(userRoutes, { prefix: '/users' });
app.register(noteRoutes, { prefix: '/notes' });

export default app;
