import examsRepository, { PostedExam } from '../repositories/exams';
import subjectsService from './subjects';
import teachersService from './teachers';
import categoriesService from './categories';

import ConflictError from '../errors/Conflict';

async function insertExam(exam:PostedExam) {
	const existingExam = await examsRepository.findExamByFileUrl(exam.fileUrl);

	if (existingExam) {
		throw new ConflictError('This file already exists');
	}

	await subjectsService.findSubject(exam.subjectId);
	await teachersService.findTeacher(exam.professorId);
	await categoriesService.findCategory(exam.categoryId);

	return examsRepository.insertExam(exam);
}

export default { insertExam };
