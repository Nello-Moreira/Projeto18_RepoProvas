/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn,
} from 'typeorm';
import Subject from './Subject';

interface Teacher{
	id:number;
	name: string;
	examsQuantity: number;
}

@Entity('courses')
export default class Course {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@OneToMany(() => Subject, (subject) => subject.course)
	@JoinColumn()
		subjects: Subject[];

	getCourse() {
		return {
			id: this.id,
			name: this.name,
		};
	}

	getSubjects() {
		return this.subjects.map((subject) => subject.getSubject());
	}

	getTeachers() {
		function unique(array:Teacher[]) {
			const uniqueSet = new Set();
			return array.filter((item:Teacher) => (
				uniqueSet.has(item.id) ? false : uniqueSet.add(item.id)
			));
		}

		function sortFn(a:Teacher, b:Teacher) {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		}

		const allSubjectsTeachers = this.subjects.map(
			(subject) => subject.teachers.map(
				(teacher) => teacher.getTeacher()
			)
		).flat(1);

		const uniqueTeachers = unique(allSubjectsTeachers);
		return uniqueTeachers.sort(sortFn);
	}
}
