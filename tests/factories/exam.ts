import faker from 'faker';

import createNewName from './newName';

import IExam from '../../src/protocols/Exam';
import ISubject from '../../src/protocols/Subject';
import ICategory from '../../src/protocols/Category';
import ITeacher from '../../src/protocols/Teacher';

function createSubject(
	subject:ISubject,
	category:ICategory,
	teacher:ITeacher,
	name:string = null
):IExam {
	const newName = createNewName(name);

	return {
		id: null,
		name: newName,
		fileUrl: faker.internet.url(),
		categoryId: category.id,
		subjectId: subject.id,
		teacherId: teacher.id,
	};
}

export { createSubject };
