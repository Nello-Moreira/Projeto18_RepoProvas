import supertest from 'supertest';
import server, { init } from '../../src/server';
import HttpStatusCodes from '../../src/enums/statusCodes';
import ISession from '../../src/protocols/Session';
import ISubject from '../../src/protocols/Subject';
import IExam from '../../src/protocols/Exam';

import { createCourse } from '../factories/course';
import { createUser } from '../factories/user';
import { createSeason } from '../factories/season';
import { createSubject } from '../factories/subject';
import { createTeacher } from '../factories/teacher';
import { createExam } from '../factories/exam';
import { createCategory } from '../factories/category';
import {
	insertUser, deleteAllUsers, insertSession, deleteAllSessions,
} from '../repositories/users';
import { closeConnection } from '../repositories/connection';
import { insertCourse, deleteAllCourses } from '../repositories/courses';
import { deleteAllSeasons, insertSeason } from '../repositories/seasons';
import { deleteAllSubjects, insertSubject } from '../repositories/subjects';
import { deleteAllTeachers, insertTeacher } from '../repositories/teachers';
import { insertCategory } from '../repositories/categories';
import { deleteAllExams, insertExam } from '../repositories/exams';

const route = '/subjects/:id';

describe('Tests for get /subjects/:id', () => {
	const user = createUser();
	let course = createCourse();
	let season = createSeason();
	let teacher = createTeacher();
	let category = createCategory();
	let session:ISession;
	let subject:ISubject;
	let exam:IExam;

	beforeAll(async () => {
		await init();
		await deleteAllSubjects();
		await deleteAllCourses();
		await deleteAllSeasons();
		await deleteAllSessions();
		await deleteAllUsers();

		const insertedUser = await insertUser(user);
		user.id = insertedUser.id;

		session = await insertSession(user);
		season = await insertSeason(season);
		course = await insertCourse(course);
		category = await insertCategory(category);

		subject = createSubject(course, season);
		subject = await insertSubject(subject);

		teacher = await insertTeacher(teacher, subject);

		exam = createExam(subject, category, teacher);
		exam = await insertExam(exam);
	});

	afterEach(async () => {
		await deleteAllExams();
	});

	afterAll(async () => {
		await deleteAllTeachers();
		await deleteAllSubjects();
		await deleteAllCourses();
		await deleteAllSeasons();
		await deleteAllSessions();
		await deleteAllUsers();

		await closeConnection();
	});

	it('should return status code 200 and an array of exams', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', `${subject.id}`))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.ok);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toEqual({
			id: exam.id,
			name: exam.name,
			fileUrl: exam.fileUrl,
			category: category.name,
			professor: teacher.name,
		});
	});

	it('should return status code 400 for invalid subject id', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', '0'))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.badRequest);
	});

	it('should return status code 404 when there is no subject with provided id', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', `${subject.id + 1}`))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.notFound);
	});

	it('should return status code 204 when there are no exams', async () => {
		const response = await supertest(server)
			.get(route.replace(':id', `${subject.id}`))
			.set('authorization', `Bearer ${session.token}`);

		expect(response.status).toBe(HttpStatusCodes.noContent);
	});
});
