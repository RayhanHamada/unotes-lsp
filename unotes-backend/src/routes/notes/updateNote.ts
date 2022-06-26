import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const updateNoteParamsSchema = Type.Object({
  id: Type.Number({ description: `Id catatan yang ingin diperbarui` }),
});

const updateNoteBodySchema = Type.Object({
  name: Type.String({ description: 'Nama catatan' }),
  content: Type.String({ description: 'Konten catatan' }),
});

const updateNoteResponseSchema = {
  200: Type.Object(
    {
      id: Type.Number({ description: 'Id catatan' }),
    },
    {
      description: 'Sukses memperbarui catatan',
    }
  ),
};

export const updateNoteSchema: FastifySchema = {
  tags: ['Notes'],
  description: 'Membuat Note',
  params: updateNoteParamsSchema,
  body: updateNoteBodySchema,
  response: updateNoteResponseSchema,
};

export type UpdateNoteSchema = HandlerGeneric<{
  Params: Static<typeof updateNoteParamsSchema>;
  Body: Static<typeof updateNoteBodySchema>;
  Reply: ResponseSchema<typeof updateNoteResponseSchema>;
}>;

export const updateNoteHandler: CustomRouteHandler<UpdateNoteSchema> =
  async function (req, res) {
    const note = await db.note
      .update({
        where: {
          id: req.params.id,
        },
        data: {
          ...req.body,
        },
      })
      .then((v) => {
        this.log.info(`Catatan ${v.id} diperbarui !`);

        return v;
      })
      .catch((err) => {
        this.log.error(`gagal memperbarui catatan ${req.body.name}`);
        this.log.trace(err);

        return undefined;
      });

    if (!note) {
      return res.code(500).send();
    }

    return res.code(200).send({ id: note.id });
  };
