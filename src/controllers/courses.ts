import { Request, Response, NextFunction } from 'express';

import coursesService from '../services/courses';

import HttpStatusCodes from '../enums/statusCodes';
import NoContentError from '../errors/NoContent';

async function getCourses(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const courses = await coursesService.findCourses();

		return response.status(HttpStatusCodes.ok).send(courses);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}
		return next(error);
	}
}

async function getSubjects(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}
		return next(error);
	}
}

async function getProfessors(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		return response.sendStatus(HttpStatusCodes.notImplemented);
	} catch (error) {
		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}
		return next(error);
	}
}

export default { getCourses, getSubjects, getProfessors };
