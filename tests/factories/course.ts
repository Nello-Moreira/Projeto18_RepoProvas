import faker from 'faker';

interface Course {
	id:number;
	name:string;
}

function createCourse(name:string = null):Course {
	let newName = faker.random.alphaNumeric(20);

	if (name) {
		while (name === newName) {
			newName = faker.random.alphaNumeric(20);
		}
	}

	return {
		id: null,
		name: newName,
	};
}

export { createCourse };
