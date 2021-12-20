import { getConnection, getRepository } from 'typeorm';

import Course from '../../src/repositories/entities/Course';
import ICourse from '../../src/protocols/Course';

import { deleteAllSubjects } from './subjects';

async function deleteAllCourses() {
	await deleteAllSubjects();

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Course)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertCourse(course:ICourse) {
	const newCourse = getRepository(Course).create(course);
	return getRepository(Course).save(newCourse);
}

export { deleteAllCourses, insertCourse };
