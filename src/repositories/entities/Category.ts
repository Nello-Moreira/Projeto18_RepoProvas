/* eslint-disable import/no-cycle */
import {
	Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity('categories')
export default class Category {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		name: string;

	getCategory() {
		return {
			name: this.name,
		};
	}
}
