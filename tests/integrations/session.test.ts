import supertest from 'supertest';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import Session from '../../src/repositories/entities/Session';

import { createUser } from '../factories/user';
import {
	insertUser,
	deleteAllUsers,
	deleteAllSessions,
	insertSession,
} from '../repositories/users';
import { closeConnection } from '../repositories/connection';

const route = '/session';

describe('Tests for post /session', () => {
	const user = createUser();
	let session: Session;

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
	});

	afterAll(async () => {
		await deleteAllSessions();
		await deleteAllUsers();

		await closeConnection();
	});

	it('should return status code 200 and body = true when session is valid', async () => {
		const response = await supertest(server).post(route).send({
			token: session.token,
		});

		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toEqual({ valid: true });
	});

	it('should return status code 200 and body = false when session is invalid', async () => {
		const response = await supertest(server).post(route).send({
			token: session.token,
		});

		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toEqual({ valid: false });
	});

	it("should return status code 400 when token isn't provided", async () => {
		const response = await supertest(server).post(route).send({});

		expect(response.status).toBe(HttpStatusCodes.badRequest);
	});
});
