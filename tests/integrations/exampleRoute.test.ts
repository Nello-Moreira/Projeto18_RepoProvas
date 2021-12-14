import supertest from 'supertest';
import server from '../../src/server';
import dbConnection from '../../src/repositories/connection';

describe('Tests for get /examples', () => {
	it('should return status code XXX when something happens', async () => {
		const response = await supertest(server).get('/examples');
		expect(response.status).toBe(500);
	});
});
