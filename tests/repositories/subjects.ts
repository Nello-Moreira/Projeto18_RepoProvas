import { getConnection, getRepository } from 'typeorm';

import Subject from '../../src/repositories/entities/Subject';
import ISubjects from '../../src/protocols/Subject';

import { deleteAllExams } from './exams';

async function deleteAllSubjects() {
	await deleteAllExams();

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from('teachers_subjects')
		.where('id >= :id', { id: 1 })
		.execute();

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Subject)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertSubject(subject:ISubjects) {
	const newSubject = getRepository(Subject).create(subject);
	return getRepository(Subject).save(newSubject);
}

export { deleteAllSubjects, insertSubject };
