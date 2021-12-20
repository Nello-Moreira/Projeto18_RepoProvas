import createNewName from './newName';

import ITeacher from '../../src/protocols/Teacher';

function createTeacher(name:string = null):ITeacher {
	const newName = createNewName(name);

	return {
		name: newName,
	};
}

export { createTeacher };
