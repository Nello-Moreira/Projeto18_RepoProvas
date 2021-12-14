import express from 'express';
import examsController from '../controllers/exams';

const examsRouter = express.Router();

examsRouter.post('/', examsController.sendExams);

export default examsRouter;
