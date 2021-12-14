import { Request, Response, NextFunction } from 'express';
import exampleService from '../services/example';
import NoContentError from '../errors/NoContent';
import HttpStatusCodes from '../enums/statusCodes';

async function getRoute(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		await exampleService.searchExamples();

		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.notImplemented);
		}

		return next(error);
	}
}

export default { getRoute };
