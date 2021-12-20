import faker from 'faker';

export default function createNewName(name: string = null) {
	let newName = faker.random.alphaNumeric(20);

	if (name) {
		while (name === newName) {
			newName = faker.random.alphaNumeric(20);
		}
	}

	return newName;
}
