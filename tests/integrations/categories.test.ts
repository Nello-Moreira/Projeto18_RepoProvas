import supertest from 'supertest';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import ISession from '../../src/protocols/Session';

import { createUser } from '../factories/user';
import { createCategory } from '../factories/category';

import {
	deleteAllCategories,
	insertCategory,
} from '../repositories/categories';
import { closeConnection } from '../repositories/connection';
import {
	deleteAllSessions,
	deleteAllUsers,
	insertSession,
	insertUser,
} from '../repositories/users';

const route = '/exams/categories';

describe('Tests for get /categories', () => {
	const user = createUser();
	let session: ISession;
	const category = createCategory();

	beforeAll(async () => {
		await init();
		await deleteAllCategories();
		await deleteAllSessions();
		await deleteAllUsers();

		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;

		session = await insertSession(user);

		const insertedCategory = await insertCategory(category);
		category.id = insertedCategory.id;
	});

	afterEach(async () => {
		await deleteAllCategories();
	});

	afterAll(async () => {
		await deleteAllSessions();
		await deleteAllUsers();
		await closeConnection();
	});

	it('should return status code 200 and an array of categories', async () => {
		const response = await supertest(server)
			.get(route)
			.set('authorization', `Bearer ${session.token}`);
		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toEqual(category);
	});

	it('should return status code 204 when there are no categories', async () => {
		const response = await supertest(server)
			.get(route)
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.noContent);
	});
});
