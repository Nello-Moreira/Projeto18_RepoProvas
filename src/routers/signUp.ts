import express from 'express';
import usersController from '../controllers/users';

const signUpRouter = express.Router();

signUpRouter.post('/', usersController.signUp);

export default signUpRouter;
