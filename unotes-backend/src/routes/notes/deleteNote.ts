import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const deleteNoteParamsSchema = Type.Object({
  id: Type.Number({ description: `Id catatan user` }),
});

const deleteNoteResponseSchema = {
  204: Type.Object(
    {},
    {
      description: `Sukses menghapus catatan`,
    }
  ),
};

export const deleteNoteSchema: FastifySchema = {
  tags: ['Users'],
  description: 'Membuat Note',
  params: deleteNoteParamsSchema,
  response: deleteNoteResponseSchema,
};

export type DeleteNoteSchema = HandlerGeneric<{
  Params: Static<typeof deleteNoteParamsSchema>;
  Reply: ResponseSchema<typeof deleteNoteResponseSchema>;
}>;

export const deleteNoteHandler: CustomRouteHandler<DeleteNoteSchema> =
  async function (req, res) {
    const note = await db.note.delete({
      where: {
        id: req.params.id,
      },
    });

    if (!note) {
      return res.code(500).send();
    }

    return res.code(204).send();
  };
