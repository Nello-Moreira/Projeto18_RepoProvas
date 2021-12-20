import { Request, Response, NextFunction } from 'express';

import coursesService from '../services/courses';

import HttpStatusCodes from '../enums/statusCodes';
import NoContentError from '../errors/NoContent';
import NotFoundError from '../errors/NotFound';

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
	const courseId = Number(request.params.id);

	// eslint-disable-next-line no-restricted-globals
	if (isNaN(courseId) || courseId < 1) {
		return response.status(HttpStatusCodes.badRequest).send('Invalid course id');
	}

	try {
		const subjects = await coursesService.findCourseSubjects(courseId);
		return response.status(HttpStatusCodes.ok).send(subjects);
	} catch (error) {
		if (error instanceof NotFoundError) {
			return response.status(HttpStatusCodes.notFound).send(error.message);
		}

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
	const courseId = Number(request.params.id);

	// eslint-disable-next-line no-restricted-globals
	if (isNaN(courseId) || courseId < 1) {
		return response.status(HttpStatusCodes.badRequest).send('Invalid course id');
	}

	try {
		const teachers = await coursesService.findCourseTeachers(courseId);

		return response.status(HttpStatusCodes.ok).send(teachers);
	} catch (error) {
		if (error instanceof NotFoundError) {
			return response.status(HttpStatusCodes.notFound).send(error.message);
		}

		if (error instanceof NoContentError) {
			return response.sendStatus(HttpStatusCodes.noContent);
		}

		return next(error);
	}
}

export default { getCourses, getSubjects, getProfessors };
