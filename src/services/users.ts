import jwt from 'jsonwebtoken';

import usersRepository from '../repositories/users';
import { hashPassword, isCorrectPassword } from '../helpers/passwordEncrypt';

import UserCreation from '../protocols/UserCreation';
import ConflictError from '../errors/Conflict';
import NotFoundError from '../errors/NotFound';
import UserLogin from '../protocols/UserLogin';

async function signUp(user: UserCreation): Promise<boolean> {
	const existingUser = await usersRepository.findUserByEmail(user.email);

	if (existingUser) {
		throw new ConflictError('There is already a user registered with that email');
	}

	await usersRepository.createUser({
		name: user.name,
		email: user.email,
		password: hashPassword(user.password),
	});

	return true;
}

async function login(user: UserLogin): Promise<{ token:string }> {
	const existingUser = await usersRepository.findUserByEmail(user.email);

	if (!existingUser) {
		throw new NotFoundError('Incorrect email or password');
	}

	if (!isCorrectPassword({
		password: user.password,
		hashedPassword: existingUser.password,
	})) {
		throw new NotFoundError('Incorrect email or password');
	}

	const token = jwt.sign(
		{ id: existingUser.id },
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);

	await usersRepository.createSession({ userId: existingUser.id, token });
	return { token };
}

export default { signUp, login };
