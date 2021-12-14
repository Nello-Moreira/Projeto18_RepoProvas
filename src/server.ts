import '../setup/dotenvSetup';
import express from 'express';
import cors from 'cors';

import databaseErrorMiddleware from './middlewares/databaseError';

import exampleRouter from './routers/example';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/examples', exampleRouter);

server.use(databaseErrorMiddleware);

export default server;
