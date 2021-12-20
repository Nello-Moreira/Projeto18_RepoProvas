import { getConnection, getRepository } from 'typeorm';

import Category from '../../src/repositories/entities/Category';
import ICategory from '../../src/protocols/Category';

import { deleteAllExams } from './exams';

async function deleteAllCategories() {
	await deleteAllExams();

	await getConnection()
		.createQueryBuilder()
		.delete()
		.from(Category)
		.where('id >= :id', { id: 1 })
		.execute();
}

async function insertCategory(category:ICategory) {
	const newCategory = getRepository(Category).create(category);
	return getRepository(Category).save(newCategory);
}

export { deleteAllCategories, insertCategory };
