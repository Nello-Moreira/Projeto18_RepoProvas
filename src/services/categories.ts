import categoriesRepository from '../repositories/categories';
import NotFoundError from '../errors/NotFound';

async function findCategory(categoryId: number) {
	const category = await categoriesRepository.findCategoryById(categoryId);

	if (!category) {
		throw new NotFoundError(`There is no category with id ${categoryId}`);
	}

	return category;
}

export default { findCategory };
