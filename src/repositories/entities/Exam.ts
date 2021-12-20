/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import Category from './Category';
import Subject from './Subject';
import Teacher from './Teacher';

@Entity('exams')
export default class Exam {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column({ name: 'file_url' })
		fileUrl: string;

	@Column({ name: 'category_id' })
		categoryId: number;

	@Column({ name: 'subject_id' })
		subjectId: number;

	@Column({ name: 'teacher_id' })
		teacherId: number;

	@ManyToOne(() => Category, { eager: true })
	@JoinColumn({ name: 'category_id' })
		category: Category;

	@ManyToOne(() => Teacher, (teacher) => teacher.exams)
	@JoinColumn({ name: 'teacher_id' })
		teacher: Teacher;

	@ManyToOne(() => Subject, (subject) => subject.exams)
	@JoinColumn({ name: 'subject_id' })
		subject: Subject;

	getExam() {
		return {
			id: this.id,
			name: this.name,
			fileUrl: this.fileUrl,
			category: this.category.getCategory().name,
			teacher: this.teacher?.getTeacherName().name || null,
			subject: this.subject?.getSubjectName().name || null,
		};
	}

	getExamWithTeacher() {
		return {
			id: this.id,
			name: this.name,
			fileUrl: this.fileUrl,
			category: this.category.getCategory().name,
			teacher: this.teacher.getTeacherName().name,
		};
	}

	getExamWithSubject() {
		return {
			id: this.id,
			name: this.name,
			fileUrl: this.fileUrl,
			category: this.category.getCategory().name,
			subject: this.subject.getSubjectName().name,
		};
	}
}
