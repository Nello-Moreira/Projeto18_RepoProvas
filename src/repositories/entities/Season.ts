/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity('seasons')
export default class Season {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	getSeason() {
		return {
			name: this.name,
		};
	}
}
