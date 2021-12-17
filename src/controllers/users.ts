import { Request, Response, NextFunction } from 'express';

import usersService from '../services/users';

import HttpStatusCodes from '../enums/statusCodes';
import NotFoundError from '../errors/NotFound';
import ConflictError from '../errors/Conflict';
import { isInvalidSignUp } from '../validation/users';

async function login(request: Request, response: Response, next: NextFunction) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NotFoundError) {
			return response.sendStatus(HttpStatusCodes.notFound);
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
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NotFoundError) {
			return response.sendStatus(HttpStatusCodes.notFound);
		}

		return next(error);
	}
}

async function signUp(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const signUpBody = request.body;

	const signUpError = isInvalidSignUp(signUpBody);

	if (signUpError) {
		return response.status(HttpStatusCodes.badRequest).send(signUpError.message);
	}

	try {
		await usersService.signUp(signUpBody);

		return response.sendStatus(HttpStatusCodes.ok);
	} catch (error) {
		if (error instanceof ConflictError) {
			return response.status(HttpStatusCodes.conflict).send(error.message);
		}

		return next(error);
	}
}

export default { login, logout, signUp };
