import createNewName from './newName';

import ISeason from '../../src/protocols/Season';

function createSeason(name:string = null):ISeason {
	const newName = createNewName(name);

	return {
		id: null,
		name: newName,
	};
}

export { createSeason };
