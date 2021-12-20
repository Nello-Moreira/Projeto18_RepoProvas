import createNewName from './newName';

import ISubject from '../../src/protocols/Subject';
import ICourse from '../../src/protocols/Course';
import ISeason from '../../src/protocols/Season';

function createSubject(course:ICourse, season:ISeason, name:string = null):ISubject {
	const newName = createNewName(name);

	return {
		name: newName,
		courseId: course.id,
		seasonId: season.id,
	};
}

export { createSubject };
