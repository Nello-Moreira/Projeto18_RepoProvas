import { Request, Response, NextFunction } from 'express';

import subjectsService from '../services/subjects';

import HttpStatusCodes from '../enums/statusCodes';
import NoContentError from '../errors/NoContent';
import NotFoundError from '../errors/NotFound';

async function getExams(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const subjectId = Number(request.params.id);

	// eslint-disable-next-line no-restricted-globals
	if (isNaN(subjectId) || subjectId < 1) {
		return response.status(HttpStatusCodes.badRequest).send('Invalid course id');
	}

	try {
		const exams = await subjectsService.findSubjectExams(subjectId);

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
