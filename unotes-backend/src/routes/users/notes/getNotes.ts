import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import db from 'src/services/db';
import {
  CustomRouteHandler,
  HandlerGeneric,
  ResponseSchema,
} from 'src/typeUtils';

const getUserNotesParamsSchema = Type.Object({
  userId: Type.Number({ description: `Id user pemilik catatan` }),
});

const getUserNotesResponseSchema = {
  200: Type.Array(
    Type.Object({
      id: Type.Number({
        description: 'Id catatan',
      }),
      name: Type.String({
        description: 'Nama catatan',
      }),
      content: Type.String({
        description: 'Konten catatan',
      }),
    })
  ),
};

export const getUserNotesSchema: FastifySchema = {
  tags: ['Users', 'Notes'],
  description: 'Membuat Note',
  params: getUserNotesParamsSchema,
  response: getUserNotesResponseSchema,
};

export type GetUserNotesSchema = HandlerGeneric<{
  Params: Static<typeof getUserNotesParamsSchema>;
  Reply: ResponseSchema<typeof getUserNotesResponseSchema>;
}>;

export const getUserNotesHandler: CustomRouteHandler<GetUserNotesSchema> =
  async function (req, res) {
    const notes = await db.note
      .findMany({
        where: {
          userId: req.params.userId,
        },
      })
      .then((v) => {
        this.log.info(`Catatan untuk user ${req.params.userId} diambil !`);

        return v.map((note) => ({
          id: note.id,
          name: note.name,
          content: note.content,
        }));
      })
      .catch((err) => {
        this.log.error(
          `gagal mengambil catatan catatan user ${req.params.userId}`
        );
        this.log.trace(err);

        return undefined;
      });

    if (!notes) {
      return res.code(500).send();
    }

    return res.code(200).send(notes);
  };
