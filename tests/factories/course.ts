import createNewName from './newName';

import ICourse from '../../src/protocols/Course';

function createCourse(name:string = null):ICourse {
	const newName = createNewName(name);

	return {
		name: newName,
	};
}

export { createCourse };
