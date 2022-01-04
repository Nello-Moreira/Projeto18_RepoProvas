import { Request, Response, NextFunction } from 'express';

import examsService from '../services/exams';

import HttpStatusCodes from '../enums/statusCodes';
import { isInvalidExam } from '../validation/exams';
import ConflictError from '../errors/Conflict';
import NotFoundError from '../errors/NotFound';
import NoContentError from '../errors/NoContent';

async function sendExams(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const exam = request.body;

	const examError = isInvalidExam(exam);

	if (examError) {
		return response.status(HttpStatusCodes.badRequest).send(examError.message);
	}

	try {
		await examsService.insertExam(exam);

		return response.sendStatus(HttpStatusCodes.created);
	} catch (error) {
		if (error instanceof ConflictError) {
			return response.status(HttpStatusCodes.conflict).send(error.message);
		}

		if (error instanceof NotFoundError) {
			return response.status(HttpStatusCodes.notFound).send(error.message);
		}

		return next(error);
	}
}

async function getCategories(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const categories = await examsService.findCategories();

		return response.status(HttpStatusCodes.ok).send(categories);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}

		return next(error);
	}
}

export default { sendExams, getCategories };
