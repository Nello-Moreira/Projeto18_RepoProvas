import express from 'express';
import usersController from '../controllers/users';

const logoutRouter = express.Router();

logoutRouter.post('/', usersController.logout);

export default logoutRouter;
