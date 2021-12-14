import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../enums/statusCodes';

async function tokenMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const token = request.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		return response.sendStatus(HttpStatusCodes.unauthorized);
	}

	/*

    you need to implement a token validation here and delete next declaration. For example:

	const invalidToken = isInvalidToken({ token });

	*/

	const isInvalidToken = () => {
		// eslint-disable-next-line no-console
		console.warn('you need to implement a method for token validation');
		return true;
	};
	const invalidToken = isInvalidToken();

	if (invalidToken) {
		return response.sendStatus(HttpStatusCodes.unauthorized);
	}

	/*

	you may implement a function to get session here. For example:

	const session = await userRepository.searchSession({ token });

	if (!session) {
		return response.sendStatus(500);
	}

	if (session.rowCount === 0) {
		return response.sendStatus(401);
	}

	response.locals = { userId: session.rows[0].userId };

	*/

	return next();
}

export default tokenMiddleware;
