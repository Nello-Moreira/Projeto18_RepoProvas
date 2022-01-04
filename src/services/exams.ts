import examsRepository, { PostedExam } from '../repositories/exams';
import subjectsService from './subjects';
import teachersService from './teachers';
import categoriesService from './categories';

import ConflictError from '../errors/Conflict';
import NoContentError from '../errors/NoContent';

async function insertExam(exam: PostedExam) {
	const existingExam = await examsRepository.findExamByFileUrl(exam.fileUrl);

	if (existingExam) {
		throw new ConflictError('This file already exists');
	}

	await subjectsService.findSubject(exam.subjectId);
	await teachersService.findTeacher(exam.professorId);
	await categoriesService.findCategory(exam.categoryId);

	return examsRepository.insertExam(exam);
}

async function findCategories() {
	const categories = await examsRepository.findCategories();

	if (categories.length === 0) {
		throw new NoContentError('There are no categories');
	}

	return categories;
}

export default { insertExam, findCategories };
