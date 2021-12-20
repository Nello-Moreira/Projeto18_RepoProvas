import NoContentError from '../errors/NoContent';
import NotFoundError from '../errors/NotFound';
import teachersRepository from '../repositories/teachers';

async function findTeacherExams(teacherId: number) {
	const teacher = await teachersRepository.findTeacherById(teacherId);

	if (!teacher) {
		throw new NotFoundError(`There are no teachers with id ${teacherId}`);
	}

	const exams = teacher.getExams();

	if (exams.length === 0) {
		throw new NoContentError('There are no exams for this professor');
	}

	return exams;
}

export default { findTeacherExams };
