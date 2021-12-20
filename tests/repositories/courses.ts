import { getConnection, getRepository } from 'typeorm';
import Course from '../../src/repositories/entities/Course';
import Exam from '../../src/repositories/entities/Exam';
import Subject from '../../src/repositories/entities/Subject';

async function deleteAllCourses() {
	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Exam)
		.where('id >= :id', { id: 1 })
		.execute();

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

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Course)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertCourse(name:string) {
	const newCourse = getRepository(Course).create({ name });
	return getRepository(Course).save(newCourse);
}

export { deleteAllCourses, insertCourse };
