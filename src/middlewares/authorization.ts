import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../enums/statusCodes';
import usersService from '../services/users';

export default async function authorizationMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const token = request.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		return response
			.status(HttpStatusCodes.unauthorized)
			.send("It's necessary to provide an authorization token");
	}

	if (typeof token !== 'string') {
		return response.status(HttpStatusCodes.badRequest).send('Invalid token');
	}

	const session = await usersService.getSession(token);

	if (!session.id) {
		return response
			.status(HttpStatusCodes.unauthorized)
			.send('Invalid or expired token');
	}

	response.locals = session;

	return next();
}
