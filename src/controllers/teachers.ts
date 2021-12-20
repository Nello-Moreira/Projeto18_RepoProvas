import { Request, Response, NextFunction } from 'express';

import teachersService from '../services/teachers';

import HttpStatusCodes from '../enums/statusCodes';
import NoContentError from '../errors/NoContent';
import NotFoundError from '../errors/NotFound';

async function getExams(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const teacherId = Number(request.params.id);

	// eslint-disable-next-line no-restricted-globals
	if (isNaN(teacherId) || teacherId < 1) {
		return response.status(HttpStatusCodes.badRequest).send('Invalid course id');
	}

	try {
		const exams = await teachersService.findTeacherExams(teacherId);

		return response.status(HttpStatusCodes.ok).send(exams);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}
		if (error instanceof NotFoundError) {
			return response.status(HttpStatusCodes.notFound).send(error.message);
		}
		return next(error);
	}
}

export default { getExams };
