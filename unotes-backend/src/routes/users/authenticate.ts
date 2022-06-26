import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const authenticateBodySchema = Type.Object({
  email: Type.String({
    description: 'Email user',
  }),
  password: Type.String({
    description: 'Password user',
  }),
});

const authenticateResponseSchema = {
  200: Type.Object(
    {
      username: Type.String({ description: 'Username user' }),
    },
    {
      description: 'Sukses authenticate',
    }
  ),
};

export const authenticateSchema: FastifySchema = {
  tags: ['Users'],
  description: 'Mengautentikasi user ke dalam website',
  body: authenticateBodySchema,
  response: authenticateResponseSchema,
};

export type AuthenticateSchema = HandlerGeneric<{
  Body: Static<typeof authenticateBodySchema>;
  Reply: ResponseSchema<typeof authenticateResponseSchema>;
}>;

export const authenticateHandler: CustomRouteHandler<AuthenticateSchema> =
  async function (req, res) {
    const u = await db.user
      .findFirst({
        where: {
          email: req.body.email,
        },
      })
      .then((u) => {
        if (!u) {
          this.log.info(`User ${req.body.email} tidak terdaftar`);
          return undefined;
        }

        return u;
      })
      .catch((err) => {
        this.log.error(`Gagal mengautentikasi user ${req.body.email}`);
        this.log.trace(err);

        return undefined;
      });

    if (!u) {
      return res.code(500).send();
    }

    return res.code(200).send({ username: u.username });
  };
