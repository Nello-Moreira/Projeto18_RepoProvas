import { getRepository } from 'typeorm';
import Course from './entities/Course';

async function findCourses() {
	return getRepository(Course).find();
}

export default { findCourses };
