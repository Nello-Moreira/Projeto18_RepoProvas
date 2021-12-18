/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import bcrypt from 'bcrypt';
import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import Session from './Session';

@Entity('users')
export default class User {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	@Column()
		email: string;

	@Column({ name: 'password' })
	private _password: string;

	@OneToMany(() => Session, (session) => session.user)
		sessions: Session[];

	set password(newPassword: string) {
		this._password = bcrypt.hashSync(newPassword, 12);
	}

	isCorrectPassword(password:string) {
		return bcrypt.compareSync(password, this._password);
	}

	getUser() {
		return {
			name: this.name,
			email: this.email,
		};
	}
}
