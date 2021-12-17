import usersRepository from '../repositories/users';
import { hashPassword } from '../helpers/passwordEncrypt';

import UserCreation from '../protocols/UserCreation';
import ConflictError from '../errors/Conflict';

async function signUp(user: UserCreation): Promise<boolean> {
	const existingUser = await usersRepository.findUserByEmail(user.email);

	if (existingUser.length > 0) {
		throw new ConflictError('There is already a user registered with that email');
	}

	await usersRepository.createUser({
		name: user.name,
		email: user.email,
		password: hashPassword(user.password),
	});

	return true;
}

export default { signUp };
