import express from 'express';
import signUpController from '../controllers/signUp';

const signUpRouter = express.Router();

signUpRouter.post('/', signUpController.signUp);

export default signUpRouter;
