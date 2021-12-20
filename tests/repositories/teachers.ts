import { getConnection, getRepository } from 'typeorm';

import Teacher from '../../src/repositories/entities/Teacher';

import { deleteAllExams } from './exams';

async function deleteAllTeachers() {
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
		.from(Teacher)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertTeacher(name:string) {
	const newTeacher = getRepository(Teacher).create({ name });
	return getRepository(Teacher).save(newTeacher);
}

export { deleteAllTeachers, insertTeacher };
