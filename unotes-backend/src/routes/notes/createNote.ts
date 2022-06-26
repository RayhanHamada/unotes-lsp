import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const createNoteBodySchema = Type.Object({
  user_id: Type.Number({ description: 'User id pemilik catatan' }),
  name: Type.String({ description: 'Nama catatan' }),
  content: Type.String({ description: 'Konten catatan' }),
});

const createNoteResponseSchema = {
  200: Type.Object(
    {
      id: Type.Number({ description: 'Id catatan' }),
    },
    {
      description: 'Sukses membuat catatan',
    }
  ),
};

export const createNoteSchema: FastifySchema = {
  tags: ['Notes'],
  description: 'Membuat Note',
  body: createNoteBodySchema,
  response: createNoteResponseSchema,
};

export type CreateNoteSchema = HandlerGeneric<{
  Body: Static<typeof createNoteBodySchema>;
  Reply: ResponseSchema<typeof createNoteResponseSchema>;
}>;

export const createNoteHandler: CustomRouteHandler<CreateNoteSchema> =
  async function (req, res) {
    const note = await db.note
      .create({
        data: {
          userId: req.body.user_id,
          name: req.body.name,
          content: req.body.content,
        },
      })
      .then((v) => {
        this.log.info(`Catatan ${v.name} dibuat !`);

        return v;
      })
      .catch((err) => {
        this.log.error(`gagal membuat catatan ${req.body.name}`);
        this.log.trace(err);

        return undefined;
      });

    if (!note) {
      return res.code(500).send();
    }

    return res.code(200).send({ id: note.id });
  };
