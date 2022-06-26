import { fastify } from 'fastify';
import CORS from '@fastify/cors';
import JWT from '@fastify/jwt';
import { onReady } from 'src/hooks';
import { CORSConfig, JWTConfig } from 'src/configs';

const app = fastify({ logger: true });

/**
 * register plugin
 */
app.register(CORS, CORSConfig);
app.register(JWT, JWTConfig);

/**
 * register hooks
 */
app.addHook('onReady', onReady);

export default app;
