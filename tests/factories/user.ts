import faker from 'faker';

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
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

export { createUser };
