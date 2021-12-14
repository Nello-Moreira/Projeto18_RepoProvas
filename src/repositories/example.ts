import dbConnection from './connection';
import User from '../protocols/User.interface';

async function searchAllExamples(): Promise<User[]> {
	const examples = await dbConnection.query('SELECT * FROM examples');
	return examples.rows;
}

export default { searchAllExamples };
