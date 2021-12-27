import '../setup/dotenvSetup';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import dbConnect from './repositories/connection';

import databaseErrorMiddleware from './middlewares/databaseError';
import authorizationMiddleware from './middlewares/authorization';

import sessionRouter from './routers/session';
import signUpRouter from './routers/signUp';
import loginRouter from './routers/login';
import logoutRouter from './routers/logout';
import examsRouter from './routers/exams';
import subjectsRouter from './routers/subjects';
import teachersRouter from './routers/teachers';
import coursesRouter from './routers/courses';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/session', sessionRouter);

server.use('/sign-up', signUpRouter);

server.use('/login', loginRouter);

server.use(authorizationMiddleware);

server.use('/logout', logoutRouter);

server.use('/exams', examsRouter);

server.use('/subjects', subjectsRouter);

server.use('/professors', teachersRouter);

server.use('/courses', coursesRouter);

server.use(databaseErrorMiddleware);

export async function init() {
	await dbConnect();
}

export default server;
