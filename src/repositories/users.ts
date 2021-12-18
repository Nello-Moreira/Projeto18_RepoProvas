import { getRepository, getConnection } from 'typeorm';

import User from './entities/User';
import Session from './entities/Session';

import UserCreation from '../protocols/UserCreation';

async function findUserByEmail(email:string) {
	return getRepository(User).findOne({ email });
}

async function createUser(user:UserCreation):Promise<boolean> {
	const newUser = getRepository(User).create({
		name: user.name,
		email: user.email,
	});

	newUser.password = user.password;

	await getRepository(User).save(newUser);
	return true;
}

async function createSession(session:{ userId:number, token:string }):Promise<boolean> {
	const newSession = new Session();
	newSession.userId = session.userId;
	newSession.token = session.token;
	await getConnection().manager.save(newSession);

	return true;
}

export default { createUser, findUserByEmail, createSession };
