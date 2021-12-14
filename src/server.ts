import '../setup/dotenvSetup';
import express from 'express';
import cors from 'cors';

import databaseErrorMiddleware from './middlewares/databaseError';

import signUpRouter from './routers/signUp';
import loginRouter from './routers/login';
import logoutRouter from './routers/logout';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/sign-up', signUpRouter);

server.use('/login', loginRouter);

server.use('/logout', logoutRouter);

server.use(databaseErrorMiddleware);

export default server;
