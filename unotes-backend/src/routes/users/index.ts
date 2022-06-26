import { FastifyPluginAsync } from 'fastify';
import {
  registerHandler,
  RegisterSchema,
  registerSchema,
} from 'src/routes/users/register';

export const userRoutes: FastifyPluginAsync = async function (app) {
  app.post<RegisterSchema>(
    '/register',
    {
      schema: registerSchema,
    },
    registerHandler
  );
};
