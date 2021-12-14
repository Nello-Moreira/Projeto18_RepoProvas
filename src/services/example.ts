import exampleRepository from '../repositories/example';
import NoContentError from '../errors/NoContent';
import User from '../protocols/User.interface';

async function searchExamples(): Promise<User[]> {
	const examples = await exampleRepository.searchAllExamples();

	if (examples.length === 0) {
		throw new NoContentError('There are no examples');
	}

	return examples;
}

export default { searchExamples };
