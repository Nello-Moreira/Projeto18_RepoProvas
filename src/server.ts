import '../setup/dotenvSetup';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import dbConnect from './repositories/connection';

import databaseErrorMiddleware from './middlewares/databaseError';

import signUpRouter from './routers/signUp';
import loginRouter from './routers/login';
import logoutRouter from './routers/logout';
import examsRouter from './routers/exams';
import subjectsRouter from './routers/subjects';
import professorsRouter from './routers/professors';
import coursesRouter from './routers/courses';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/sign-up', signUpRouter);

server.use('/login', loginRouter);

server.use('/logout', logoutRouter);

server.use('/exams', examsRouter);

server.use('/subjects', subjectsRouter);

server.use('/professors', professorsRouter);

server.use('/courses', coursesRouter);

server.use(databaseErrorMiddleware);

export async function init() {
	await dbConnect();
}

export default server;
