import NoContentError from '../errors/NoContent';
import coursesRepository from '../repositories/courses';

async function findCourses() {
	const courses = await coursesRepository.findCourses();

	if (courses.length === 0) {
		throw new NoContentError('There are no courses');
	}

	return courses;
}

export default { findCourses };
