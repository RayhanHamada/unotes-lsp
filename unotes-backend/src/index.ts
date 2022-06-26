import app from 'src/app';
import db from 'src/services/db';

const startServer = async () => {
  await db.$connect().catch((err) => {
    console.log(`Error when connect to database`);
    console.error(err);
  });

  await app.ready();
};

startServer();
