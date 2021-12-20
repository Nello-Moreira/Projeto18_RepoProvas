import supertest from 'supertest';
import { getRepository } from 'typeorm';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import Session from '../../src/repositories/entities/Session';

import { createUser } from '../factories/user';
import { insertUser, deleteAllUsers, deleteAllSessions } from '../repositories/users';
import { closeConnection } from '../repositories/connection';

const route = '/login';

describe('Tests for post /login', () => {
	const user = createUser();

	beforeAll(async () => {
		await init();
		await deleteAllSessions();
		await deleteAllUsers();
	});

	afterEach(async () => {
		await deleteAllSessions();
		await deleteAllUsers();

		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;
	});

	afterAll(async () => {
		await deleteAllSessions();
		await deleteAllUsers();

		await closeConnection();
	});

	it('should return status code 404 when there is no user', async () => {
		const response = await supertest(server).post(route).send({
			email: user.email,
			password: user.password,
		});

		expect(response.status).toBe(HttpStatusCodes.notFound);
	});

	it('should return status code 404 when the password is incorrect', async () => {
		const response = await supertest(server).post(route).send({
			email: user.email,
			password: 'incorrect',
		});
		expect(response.status).toBe(HttpStatusCodes.notFound);
	});

	it('should return status code 400 when an invalid body is provided', async () => {
		const response = await supertest(server).post(route).send({
			email: '',
			password: user.password,
		});
		expect(response.status).toBe(HttpStatusCodes.badRequest);
	});

	it('should return status code 200 and a token when login is successful', async () => {
		const response = await supertest(server).post(route).send({
			email: user.email,
			password: user.password,
		});

		const inserted = await getRepository(Session).find({ userId: user.id });

		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toHaveProperty('token');
		expect(inserted).toHaveLength(1);
	});
});
