import { onReadyAsyncHookHandler, onRequestAsyncHookHandler } from 'fastify';
import constants from 'src/constants';

export const onReady: onReadyAsyncHookHandler = async function () {
  this.listen({
    port: constants.PORT,
    host: constants.IS_PROD ? '0.0.0.0' : undefined,
  })
    .then((addr) => {
      this.log.info(`Server listening at ${addr}`);
    })
    .catch((err) => {
      this.log.error(`Server failed to start`);
      this.log.trace(err);
    });
};
