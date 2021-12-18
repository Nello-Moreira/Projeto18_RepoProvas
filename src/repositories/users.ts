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

async function deleteSession(token:string):Promise<boolean> {
	await getRepository(Session).delete({ token });
	return true;
}

async function findSessionByToken(token:string) {
	return getRepository(Session).findOne({ token });
}

export default {
	createUser,
	findUserByEmail,
	createSession,
	deleteSession,
	findSessionByToken,
};
