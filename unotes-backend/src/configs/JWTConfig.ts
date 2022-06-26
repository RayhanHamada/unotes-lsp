import { FastifyJWTOptions } from '@fastify/jwt';
import constants from 'src/constants';

export const JWTConfig: FastifyJWTOptions = {
  secret: constants.JWT_SECRET,
  sign: {
    expiresIn: 1000 * 60 * 10, // 10 minute
  },
};
