/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne,
} from 'typeorm';
import User from './User';

@Entity('sessions')
export default class Session {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ name: 'user_id' })
		userId: number;

	@Column()
		token: string;

	@ManyToOne(() => User, (user) => user.sessions)
	@JoinColumn({ name: 'user_id' })
		user: User;
}
