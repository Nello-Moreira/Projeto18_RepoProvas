import createNewName from './newName';

import ITeacher from '../../src/protocols/Teacher';

function createTeacher(name:string = null):ITeacher {
	const newName = createNewName(name);

	return {
		id: null,
		name: newName,
	};
}

export { createTeacher };
