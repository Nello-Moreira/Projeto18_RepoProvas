import { getConnection, getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import User from '../../src/repositories/entities/User';
import Session from '../../src/repositories/entities/Session';

import IUser from '../../src/protocols/User';

async function insertUser(user:IUser) {
	const newUser = getRepository(User).create(user);
	newUser.password = user.password;

	return getRepository(User).save(newUser);
}

async function deleteAllSessions() {
	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Session)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function deleteAllUsers() {
	await deleteAllSessions();

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(User)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertSession(user:IUser) {
	const token = jwt.sign(
		{ name: user.name },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);

	const newSession = new Session();
	newSession.userId = user.id;
	newSession.token = token;
	return getConnection().manager.save(newSession);
}

export {
	insertUser,
	insertSession,
	deleteAllUsers,
	deleteAllSessions,
};
