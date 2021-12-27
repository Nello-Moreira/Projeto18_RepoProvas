import jwt from 'jsonwebtoken';

import usersRepository from '../repositories/users';

import UserCreation from '../protocols/UserCreation';
import ConflictError from '../errors/Conflict';
import NotFoundError from '../errors/NotFound';
import UserLogin from '../protocols/UserLogin';
import ISession from '../protocols/Session';

async function signUp(user: UserCreation): Promise<boolean> {
	const existingUser = await usersRepository.findUserByEmail(user.email);

	if (existingUser) {
		throw new ConflictError(
			'There is already a user registered with that email'
		);
	}

	await usersRepository.createUser(user);

	return true;
}

async function login(
	user: UserLogin
): Promise<{ name: string; token: string }> {
	const existingUser = await usersRepository.findUserByEmail(user.email);

	if (!existingUser) {
		throw new NotFoundError('Incorrect email or password');
	}

	if (!existingUser.isCorrectPassword(user.password)) {
		throw new NotFoundError('Incorrect email or password');
	}

	const token = jwt.sign({ name: existingUser.name }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});

	await usersRepository.createSession({ userId: existingUser.id, token });
	return { name: existingUser.name, token };
}

async function logout(token: string): Promise<boolean> {
	await usersRepository.deleteSession(token);
	return true;
}

async function getSession(token: string): Promise<ISession> {
	try {
		jwt.verify(token, process.env.JWT_SECRET);

		const activeSession = await usersRepository.findSessionByToken(token);

		if (!activeSession) {
			return { id: null, userId: null, token: null };
		}

		return activeSession;
	} catch (error) {
		await usersRepository.deleteSession(token);
		return { id: null, userId: null, token: null };
	}
}

export default {
	signUp,
	login,
	logout,
	getSession,
};
