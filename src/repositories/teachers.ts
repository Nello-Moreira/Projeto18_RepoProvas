import { getRepository } from 'typeorm';
import Teacher from './entities/Teacher';

async function findTeacherExams(teacherId: number) {
	return getRepository(Teacher).findOne({
		where: { id: teacherId },
		relations: ['exams', 'exams.subject'],
	});
}

async function findTeacherById(teacherId: number) {
	return getRepository(Teacher).findOne({
		id: teacherId,
	});
}

export default { findTeacherExams, findTeacherById };
