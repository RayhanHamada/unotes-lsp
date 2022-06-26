import { FastifyPluginAsync } from 'fastify';
import {
  authenticateHandler,
  AuthenticateSchema,
  authenticateSchema,
} from 'src/routes/users/authenticate';
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

  app.post<AuthenticateSchema>(
    '/authenticate',
    {
      schema: authenticateSchema,
    },
    authenticateHandler
  );
};
