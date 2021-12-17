import { getRepository } from 'typeorm';

import User from './entities/User';

import UserCreation from '../protocols/UserCreation';

async function findUserByEmail(email:string) {
	return getRepository(User).find({ email });
}

async function createUser(user:UserCreation):Promise<boolean> {
	await getRepository(User).insert(user);
	return true;
}

export default { createUser, findUserByEmail };
