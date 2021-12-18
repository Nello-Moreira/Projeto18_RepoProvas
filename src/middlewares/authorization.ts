import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatusCodes from '../enums/statusCodes';
import usersRepository from '../repositories/users';

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
		return response
			.status(HttpStatusCodes.badRequest)
			.send('Invalid token');
	}

	try {
		jwt.verify(token, process.env.JWT_SECRET);

		const activeSession = await usersRepository.findSessionByToken(token);

		if (!activeSession) {
			return response
				.status(HttpStatusCodes.unauthorized)
				.send('Invalid or expired token');
		}

		response.locals = { userId: activeSession.userId };
	} catch (error) {
		usersRepository.deleteSession(token);
		return response
			.status(HttpStatusCodes.unauthorized)
			.send('Invalid or expired token');
	}

	return next();
}
