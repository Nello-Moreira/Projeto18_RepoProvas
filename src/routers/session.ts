import express from 'express';
import usersController from '../controllers/users';

const sessionRouter = express.Router();

sessionRouter.post('/', usersController.isValidSession);

export default sessionRouter;
