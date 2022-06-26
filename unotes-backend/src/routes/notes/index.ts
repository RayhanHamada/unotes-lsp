import { FastifyPluginAsync } from 'fastify';
import {
  createNoteHandler,
  CreateNoteSchema,
  createNoteSchema,
} from 'src/routes/notes/createNote';
import {
  deleteNoteHandler,
  deleteNoteSchema,
  DeleteNoteSchema,
} from 'src/routes/notes/deleteNote';
import {
  getNoteHandler,
  getNoteSchema,
  GetNoteSchema,
} from 'src/routes/notes/getNote';
import {
  updateNoteHandler,
  updateNoteSchema,
  UpdateNoteSchema,
} from 'src/routes/notes/updateNote';

export const noteRoutes: FastifyPluginAsync = async function (app) {
  app.post<CreateNoteSchema>(
    '',
    {
      schema: createNoteSchema,
    },
    createNoteHandler
  );

  app.get<GetNoteSchema>(
    '/:id',
    {
      schema: getNoteSchema,
    },
    getNoteHandler
  );

  app.delete<DeleteNoteSchema>(
    '/:id',
    {
      schema: deleteNoteSchema,
    },
    deleteNoteHandler
  );

  app.put<UpdateNoteSchema>(
    '/:id',
    {
      schema: updateNoteSchema,
    },
    updateNoteHandler
  );
};
