import supertest from 'supertest';
import server, { init } from '../../src/server';

import { createCourse } from '../factories/course';
import { createUser, Session } from '../factories/user';

import { insertCourse, deleteAllCourses } from '../repositories/courses';
import {
	insertUser, deleteAllUsers, insertSession, deleteAllSessions,
} from '../repositories/users';

import { closeConnection } from '../repositories/connection';
import HttpStatusCodes from '../../src/enums/statusCodes';

const route = '/courses';

describe('Tests for get /courses', () => {
	const user = createUser();
	let session:Session;
	const course = createCourse();

	beforeAll(async () => {
		await init();
		await deleteAllCourses();
		await deleteAllSessions();
		await deleteAllUsers();

		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;

		const insertedSession = await insertSession(user);
		session = insertedSession;
	});

	afterEach(async () => {
		const insertedCourse = await insertCourse(course.name);
		course.id = insertedCourse.id;
	});

	afterAll(async () => {
		await deleteAllCourses();
		await closeConnection();
	});

	it('should return status code 204 when there are no courses', async () => {
		const response = await supertest(server).get(route).set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.noContent);
	});

	it('should return status code 200 and an array of courses', async () => {
		const response = await supertest(server).get(route).set('authorization', `Bearer ${session.token}`);
		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toEqual(course);
	});
});
