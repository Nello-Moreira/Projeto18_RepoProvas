import subjectsRepository from '../repositories/subjects';

import NoContentError from '../errors/NoContent';
import NotFoundError from '../errors/NotFound';

async function findSubjectExams(subjectId: number) {
	const subject = await subjectsRepository.findSubjectById(subjectId);

	if (!subject) {
		throw new NotFoundError(`There are no subjects with id ${subjectId}`);
	}

	const exams = subject.getExams();

	if (exams.length === 0) {
		throw new NoContentError('There are no exams for this subject');
	}

	return exams;
}

export default { findSubjectExams };
