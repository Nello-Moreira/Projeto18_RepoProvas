import express from 'express';
import teachersController from '../controllers/teachers';

const teachersRouter = express.Router();

teachersRouter.get('/:id', teachersController.getExams);

export default teachersRouter;
