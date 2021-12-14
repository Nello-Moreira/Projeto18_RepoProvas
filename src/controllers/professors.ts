import { Request, Response, NextFunction } from 'express';

import HttpStatusCodes from '../enums/statusCodes';
import NoContentError from '../errors/NoContent';

async function getExams(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}
		return next(error);
	}
}

export default { getExams };
