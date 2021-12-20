import { getConnection, getRepository } from 'typeorm';
import Exam from '../../src/repositories/entities/Exam';

import IExam from '../../src/protocols/Exam';

async function deleteAllExams() {
	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Exam)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertExam(exam:IExam) {
	const newExam = getRepository(Exam).create({
		name: exam.name,
		fileUrl: exam.fileUrl,
		categoryId: exam.categoryId,
		subjectId: exam.subjectId,
		teacherId: exam.teacherId,
	});

	return getRepository(Exam).save(newExam);
}

export { deleteAllExams, insertExam };
