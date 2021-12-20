import supertest from 'supertest';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import ISession from '../../src/protocols/Session';

import { createCourse } from '../factories/course';
import { createUser } from '../factories/user';
import { insertCourse, deleteAllCourses } from '../repositories/courses';
import {
	insertUser, deleteAllUsers, insertSession, deleteAllSessions,
} from '../repositories/users';
import { closeConnection } from '../repositories/connection';

const route = '/courses';

describe('Tests for get /courses', () => {
	const user = createUser();
	let session:ISession;
	let course = createCourse();

	beforeAll(async () => {
		await init();
		await deleteAllCourses();
		await deleteAllSessions();
		await deleteAllUsers();

		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;

		session = await insertSession(user);
	});

	afterEach(async () => {
		course = await insertCourse(course);
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
