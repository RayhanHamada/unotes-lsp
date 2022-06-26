import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { onReady } from 'src/hooks';

const app = fastify({ logger: true });

/**
 * register plugin
 */
app.register(cors);

/**
 * register hooks
 */
app.addHook('onReady', onReady);

export default app;
