import { Request, Response, NextFunction } from 'express';

import HttpStatusCodes from '../enums/statusCodes';
import ConflictError from '../errors/Conflict';

async function signUp(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof ConflictError) {
			return response.sendStatus(HttpStatusCodes.conflict);
		}

		return next(error);
	}
}

export default { signUp };
