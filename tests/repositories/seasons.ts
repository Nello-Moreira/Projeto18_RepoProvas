import { getConnection, getRepository } from 'typeorm';

import Season from '../../src/repositories/entities/Season';

import { deleteAllSubjects } from './subjects';

async function deleteAllSeasons() {
	await deleteAllSubjects();

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Season)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertSeason(name:string) {
	const newSeason = getRepository(Season).create({ name });
	return getRepository(Season).save(newSeason);
}

export { deleteAllSeasons, insertSeason };
