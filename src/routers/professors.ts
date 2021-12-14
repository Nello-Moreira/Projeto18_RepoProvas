import express from 'express';
import professorsController from '../controllers/professors';

const professorsRouter = express.Router();

professorsRouter.get('/:id', professorsController.getExams);

export default professorsRouter;
