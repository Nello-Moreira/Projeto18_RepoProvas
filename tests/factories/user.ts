import faker from 'faker';
import jwt from 'jsonwebtoken';

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
}

interface Session {
	id: number;
	userId: number;
	token: string;
}

function createUser(name:string = null):User {
	let newName = faker.name.firstName();

	if (name) {
		while (name === newName) {
			newName = faker.name.firstName();
		}
	}

	return {
		id: null,
		name: newName,
		email: faker.internet.email(newName),
		password: faker.internet.password(6),
	};
}

function createSession(user:User):Session {
	const token = jwt.sign(
		{ name: user.name },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);

	return {
		id: null,
		userId: user.id,
		token,
	};
}

export {
	createUser, createSession, User, Session,
};
