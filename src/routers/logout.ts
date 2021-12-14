import express from 'express';
import logoutController from '../controllers/logout';

const logoutRouter = express.Router();

logoutRouter.post('/', logoutController.logout);

export default logoutRouter;
