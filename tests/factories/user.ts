import faker from 'faker';
import jwt from 'jsonwebtoken';
import IUser from '../../src/protocols/User';
import ISession from '../../src/protocols/Session';

function createUser(name:string = null):IUser {
	let newName = faker.name.firstName();

	if (name) {
		while (name === newName) {
			newName = faker.name.firstName();
		}
	}

	return {
		name: newName,
		email: faker.internet.email(newName),
		password: faker.internet.password(6),
	};
}

function createSession(user:IUser):ISession {
	const token = jwt.sign(
		{ name: user.name },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);

	return {
		userId: user.id,
		token,
	};
}

export {
	createUser, createSession,
};
