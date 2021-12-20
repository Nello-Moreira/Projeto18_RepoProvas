import { getRepository } from 'typeorm';
import Subject from './entities/Subject';

async function findSubjectExams(subjectId: number) {
	return getRepository(Subject).findOne({
		where: { id: subjectId },
		relations: ['exams', 'exams.teacher'],
	});
}

async function findSubjectById(subjectId: number) {
	return getRepository(Subject).findOne({
		id: subjectId,
	});
}

export default { findSubjectExams, findSubjectById };
