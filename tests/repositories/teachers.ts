import { getConnection, getRepository } from 'typeorm';

import Teacher from '../../src/repositories/entities/Teacher';
import ITeacher from '../../src/protocols/Teacher';
import ISubject from '../../src/protocols/Subject';

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

async function insertTeacher(teacher:ITeacher, subject:ISubject) {
	let newTeacher = getRepository(Teacher).create(teacher);

	newTeacher = await getRepository(Teacher).save(newTeacher);

	await getConnection()
		.createQueryBuilder().insert().into('teachers_subjects')
		.values([{
			teacher_id: newTeacher.id,
			subject_id: subject.id,
		}])
		.execute();

	return newTeacher;
}

export { deleteAllTeachers, insertTeacher };
