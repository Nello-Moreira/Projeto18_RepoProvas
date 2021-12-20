import supertest from 'supertest';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import ISession from '../../src/protocols/Session';
import ISubject from '../../src/protocols/Subject';

import { createCourse } from '../factories/course';
import { createUser } from '../factories/user';
import { createSeason } from '../factories/season';
import {
	insertUser, deleteAllUsers, insertSession, deleteAllSessions,
} from '../repositories/users';
import { closeConnection } from '../repositories/connection';
import { insertCourse, deleteAllCourses } from '../repositories/courses';
import { deleteAllSeasons, insertSeason } from '../repositories/seasons';
import { deleteAllSubjects, insertSubject } from '../repositories/subjects';
import { createSubject } from '../factories/subject';
import { createTeacher } from '../factories/teacher';
import { deleteAllTeachers, insertTeacher } from '../repositories/teachers';

const route = '/courses/:id/professors';

describe('Tests for get /courses/:id/professors', () => {
	const user = createUser();
	let course = createCourse();
	let season = createSeason();
	let teacher = createTeacher();
	let session:ISession;
	let subject:ISubject;

	beforeAll(async () => {
		await init();
		await deleteAllTeachers();
		await deleteAllSubjects();
		await deleteAllCourses();
		await deleteAllSeasons();
		await deleteAllSessions();
		await deleteAllUsers();

		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;

		session = await insertSession(user);
		season = await insertSeason(season);
		course = await insertCourse(course);

		subject = createSubject(course, season);
		subject = await insertSubject(subject);

		teacher = await insertTeacher(teacher, subject);
	});

	afterEach(async () => {
		await deleteAllTeachers();
	});

	afterAll(async () => {
		await deleteAllSubjects();
		await deleteAllCourses();
		await deleteAllSeasons();
		await deleteAllSessions();
		await deleteAllUsers();

		await closeConnection();
	});

	it('should return status code 200 and an array of courses', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', `${course.id}`))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toEqual({
			id: teacher.id,
			name: teacher.name,
			examsQuantity: 0,
		});
	});

	it('should return status code 400 for invalid course id', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', '0'))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.badRequest);
	});

	it('should return status code 404 when there is no course with provided id', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', `${course.id + 1}`))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.notFound);
	});

	it('should return status code 204 when there are no teachers', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', `${course.id}`))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.noContent);
	});
});
