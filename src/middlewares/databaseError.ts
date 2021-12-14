/* eslint-disable no-console */
import { Request, Response } from 'express';
import HttpStatusCodes from '../enums/statusCodes';

export default function databaseErrorMiddleware(
	error: Error,
	request: Request,
	response: Response
) {
	console.error(error);
	return response.sendStatus(HttpStatusCodes.internalError);
}
