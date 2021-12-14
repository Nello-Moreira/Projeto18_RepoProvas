import { Request, Response, NextFunction } from 'express';

import HttpStatusCodes from '../enums/statusCodes';
import NotFoundError from '../errors/NotFound';

async function logout(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NotFoundError) {
			return response.sendStatus(HttpStatusCodes.notFound);
		}

		return next(error);
	}
}

export default { logout };
