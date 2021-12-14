import express from 'express';
import coursesController from '../controllers/courses';

const coursesRouter = express.Router();

coursesRouter.get('/', coursesController.getCourses);

coursesRouter.get('/:id/subjects', coursesController.getSubjects);

coursesRouter.get('/:id/professors', coursesController.getProfessors);

export default coursesRouter;
