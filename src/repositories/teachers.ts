import { getRepository } from 'typeorm';
import Teacher from './entities/Teacher';

async function findTeacherById(teacherId: number) {
	return getRepository(Teacher).findOne({
		where: { id: teacherId },
		relations: ['exams', 'exams.subject'],
	});
}

export default { findTeacherById };
