import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const getNoteParamsSchema = Type.Object({
  id: Type.Number({ description: `Id catatan` }),
});

const getNoteResponseSchema = {
  200: Type.Object({
    id: Type.Number({
      description: 'Id catatan',
    }),
    name: Type.String({
      description: 'Nama catatan',
    }),
    content: Type.String({
      description: 'Konten catatan',
    }),
  }),
};

export const getNoteSchema: FastifySchema = {
  tags: ['Users'],
  description: 'Membuat Note',
  params: getNoteParamsSchema,
  response: getNoteResponseSchema,
};

export type GetNoteSchema = HandlerGeneric<{
  Params: Static<typeof getNoteParamsSchema>;
  Reply: ResponseSchema<typeof getNoteResponseSchema>;
}>;

export const getNoteHandler: CustomRouteHandler<GetNoteSchema> =
  async function (req, res) {
    const note = await db.note
      .findFirst({
        where: {
          id: req.params.id,
        },
      })
      .then((note) => {
        if (!note) {
          this.log.info(`Catatan tidak ditemukan`);
          return undefined;
        }

        this.log.info(`Catatan ${note.id} berhasil diambil`);
        return note;
      })
      .catch((err) => {
        this.log.error(`gagal mengambil catatan ${req.params.id}`);
        this.log.trace(err);

        return undefined;
      });

    if (!note) {
      return res.code(500).send();
    }

    return res.code(200).send({
      id: note.id,
      content: note.content,
      name: note.name,
    });
  };
