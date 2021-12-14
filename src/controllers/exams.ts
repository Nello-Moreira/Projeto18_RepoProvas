import { Request, Response, NextFunction } from 'express';

import HttpStatusCodes from '../enums/statusCodes';

async function sendExams(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		return next(error);
	}
}

export default { sendExams };
