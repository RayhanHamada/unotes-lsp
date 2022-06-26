import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const registerBodySchema = Type.Object({
  username: Type.String({
    description: 'Nama panggilan user',
  }),
  email: Type.String({
    description: 'Email user',
  }),
  password: Type.String({
    description: 'Password user',
  }),
});

const registerResponseSchema = {
  400: Type.Object(
    {
      error: Type.Literal('Bad Request'),
      message: Type.String(),
      statusCode: Type.Literal(400),
    },
    {
      description: 'Bad Request',
    }
  ),

  500: Type.Object(
    {
      error: Type.Literal('Internal Server Error'),
      message: Type.String(),
      statusCode: Type.Literal(500),
    },
    {
      description: 'Internal Server Error',
    }
  ),
};

export const registerSchema: FastifySchema = {
  tags: ['Users'],
  description: 'Mendaftarkan user ke database',
  body: registerBodySchema,
  response: registerResponseSchema,
};

export type RegisterSchema = HandlerGeneric<{
  Body: Static<typeof registerBodySchema>;
  Reply: ResponseSchema<typeof registerResponseSchema>;
}>;

export const registerHandler: CustomRouteHandler<RegisterSchema> =
  async function (req, res) {
    const u = await db.user
      .create({
        data: {
          ...req.body,
        },
      })
      .then((u) => {
        this.log.info(`User ${u.username} terdaftar`);
        return u;
      })
      .catch((err) => {
        this.log.error(`Gagal mendaftarkan user ${req.body.username}`);
        this.log.trace(err);

        return undefined;
      });

    if (!u) {
      return res.code(500).send();
    }

    return res.code(204).send();
  };
