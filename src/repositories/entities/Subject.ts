/* eslint-disable import/no-cycle */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
} from 'typeorm';
import Course from './Course';
import Exam from './Exam';
import Season from './Season';
import Teacher from './Teacher';

@Entity('subjects')
export default class Subject {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column({ name: 'course_id' })
		courseId: number;

	@Column({ name: 'season_id' })
		seasonId: number;

	@ManyToOne(() => Course, (course) => course.subjects)
	@JoinColumn({ name: 'course_id' })
		course: Course;

	@ManyToOne(() => Season, { eager: true })
	@JoinColumn({ name: 'season_id' })
		season: Season;

	@ManyToMany(() => Teacher, (teacher) => teacher.subjects)
	@JoinTable({
		name: 'teachers_subjects',
		joinColumn: {
			name: 'subject_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'teacher_id',
			referencedColumnName: 'id',
		},
	})
		teachers: Teacher[];

	@OneToMany(() => Exam, (exam) => exam.subject, { eager: true })
		exams: Exam[];

	getSubject() {
		return {
			id: this.id,
			name: this.name,
			season: this.season.getSeason(),
			examsQuantity: this.exams.length,
		};
	}

	getSubjectName() {
		return {
			name: this.name,
		};
	}
}
