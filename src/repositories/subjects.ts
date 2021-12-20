import { getRepository } from 'typeorm';
import Subject from './entities/Subject';

async function findSubjectById(subjectId: number) {
	return getRepository(Subject).findOne({
		where: { id: subjectId },
		relations: ['exams', 'exams.teacher'],
	});
}

export default { findSubjectById };
