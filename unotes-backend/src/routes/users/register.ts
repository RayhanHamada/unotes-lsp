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
  204: Type.Object(
    {},
    {
      description: 'Success registering user',
    }
  ),

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
  //   Body: Static<typeof registerBodySchema>;
  Reply: ResponseSchema<typeof registerResponseSchema>;
}>;

export const registerHandler: CustomRouteHandler<RegisterSchema> =
  async function (req, res) {};
