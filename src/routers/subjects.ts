import express from 'express';
import subjectsController from '../controllers/subjects';

const subjectsRouter = express.Router();

subjectsRouter.get('/:id', subjectsController.getExams);

export default subjectsRouter;
