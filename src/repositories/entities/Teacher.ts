/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany,
} from 'typeorm';
import Exam from './Exam';
import Subject from './Subject';

@Entity('teachers')
export default class Teacher {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@ManyToMany(() => Subject, (subject) => subject.teachers)
		subjects: Subject[];

	@OneToMany(() => Exam, (exam) => exam.teacher)
		exams: Exam[];

	getTeacher() {
		return {
			id: this.id,
			name: this.name,
			examsQuantity: this.exams.length,
		};
	}

	getTeacherName() {
		return {
			name: this.name,
		};
	}

	getExams() {
		return this.exams;
	}
}
