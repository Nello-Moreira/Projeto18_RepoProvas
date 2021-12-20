import { getRepository } from 'typeorm';
import Category from './entities/Category';

async function findCategoryById(categoryId: number) {
	return getRepository(Category).findOne({
		id: categoryId,
	});
}

export default { findCategoryById };
