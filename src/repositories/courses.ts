import { getRepository } from 'typeorm';
import Course from './entities/Course';

async function findCourses() {
	return getRepository(Course).find();
}

async function findCourseSubjects(courseId: number) {
	return getRepository(Course).findOne({ where: { id: courseId }, relations: ['subjects'] });
}

export default { findCourses, findCourseSubjects };
