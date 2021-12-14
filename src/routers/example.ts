import express from 'express';
import example from '../controllers/example';

const exampleRouter = express.Router();

exampleRouter.get('/', example.getRoute);

export default exampleRouter;
