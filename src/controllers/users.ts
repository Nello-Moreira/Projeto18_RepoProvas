import { Request, Response, NextFunction } from 'express';

import usersService from '../services/users';
import { isInvalidSignUp, isInvalidLogin } from '../validation/users';

import HttpStatusCodes from '../enums/statusCodes';
import NotFoundError from '../errors/NotFound';
import ConflictError from '../errors/Conflict';

async function signUp(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const signUpBody = request.body;

	const signUpError = isInvalidSignUp(signUpBody);

	if (signUpError) {
		return response
			.status(HttpStatusCodes.badRequest)
			.send(signUpError.message);
	}

	try {
		await usersService.signUp(signUpBody);

		return response.sendStatus(HttpStatusCodes.created);
	} catch (error) {
		if (error instanceof ConflictError) {
			return response.status(HttpStatusCodes.conflict).send(error.message);
		}

		return next(error);
	}
}

async function login(request: Request, response: Response, next: NextFunction) {
	const loginBody = request.body;

	const loginError = isInvalidLogin(loginBody);

	if (loginError) {
		return response.status(HttpStatusCodes.badRequest).send(loginError.message);
	}

	try {
		const userInfo = await usersService.login(loginBody);

		return response.status(HttpStatusCodes.ok).send(userInfo);
	} catch (error) {
		if (error instanceof NotFoundError) {
			return response.status(HttpStatusCodes.notFound).send(error.message);
		}

		return next(error);
	}
}

async function logout(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		await usersService.logout(response.locals.token);
		return response.sendStatus(HttpStatusCodes.ok);
	} catch (error) {
		return next(error);
	}
}

async function isValidSession(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { token } = request.body;

	if (!token || typeof token !== typeof '') {
		return response
			.status(HttpStatusCodes.badRequest)
			.send("It's necessary to provide a valid token");
	}

	try {
		const session = await usersService.getSession(token);

		if (session.id) {
			return response.status(HttpStatusCodes.ok).send({ valid: true });
		}
		return response.status(HttpStatusCodes.ok).send({ valid: false });
	} catch (error) {
		return next(error);
	}
}

export default {
	signUp,
	login,
	logout,
	isValidSession,
};
