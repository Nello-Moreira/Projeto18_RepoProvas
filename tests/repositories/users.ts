import { getConnection, getRepository } from 'typeorm';

import User from '../../src/repositories/entities/User';
import Session from '../../src/repositories/entities/Session';

async function insertUser(user:{ id:number, name:string, email:string, password:string }) {
	const newUser = getRepository(User).create({
		name: user.name,
		email: user.email,
	});
	newUser.password = user.password;

	await getRepository(User).save(newUser);
}

async function deleteAllUsers() {
	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(User)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function deleteAllSessions() {
	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Session)
		.where('id >= :id', { id: 1 })
		.execute();
}

export { insertUser, deleteAllUsers, deleteAllSessions };
