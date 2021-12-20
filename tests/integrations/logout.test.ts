import supertest from 'supertest';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import Session from '../../src/repositories/entities/Session';

import { createUser } from '../factories/user';
import {
	insertUser, deleteAllUsers, deleteAllSessions, insertSession,
} from '../repositories/users';
import { closeConnection } from '../repositories/connection';

const route = '/logout';

describe('Tests for post /logout', () => {
	const user = createUser();
	let session:Session;

	beforeAll(async () => {
		await init();
		await deleteAllSessions();
		await deleteAllUsers();
		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;
		session = await insertSession(user);
	});

	afterEach(async () => {
		await deleteAllSessions();
		await deleteAllUsers();
		await insertUser(user);
	});

	afterAll(async () => {
		await deleteAllSessions();
		await deleteAllUsers();

		await closeConnection();
	});

	it('should return status code 200 when user is logged out', async () => {
		const response = await supertest(server)
			.post(route)
			.send({})
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.ok);
	});
});
