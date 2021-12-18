import supertest from 'supertest';
import { getRepository } from 'typeorm';
import server, { init } from '../../src/server';
import User from '../../src/repositories/entities/User';

import { createUser } from '../factories/user';

import { insertUser, deleteAllUsers } from '../repositories/users';
import { closeConnection } from '../repositories/connection';

const route = '/sign-up';

describe('Tests for post /sign-up', () => {
	const user = createUser();

	beforeAll(async () => {
		await init();
		await deleteAllUsers();
	});

	afterEach(async () => {
		await deleteAllUsers();
		await insertUser(user);
	});

	afterAll(async () => {
		await closeConnection();
	});

	it('should return status code 201 when user is created', async () => {
		const response = await supertest(server).post(route).send({
			name: user.name,
			email: user.email,
			password: user.password,
		});

		const inserted = await getRepository(User).find({ email: user.email });

		expect(response.status).toBe(201);
		expect(inserted).toHaveLength(1);
	});

	it('should return status code 409 when there is a conflict', async () => {
		const response = await supertest(server).post(route).send({
			name: user.name,
			email: user.email,
			password: user.password,
		});
		expect(response.status).toBe(409);
	});

	it('should return status code 400 when an invalid body is provided', async () => {
		const response = await supertest(server).post(route).send({
			name: user.name,
			email: '',
			password: user.password,
		});
		expect(response.status).toBe(400);
	});
});
