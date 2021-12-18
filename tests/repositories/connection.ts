import { getConnection } from 'typeorm';

export async function closeConnection() {
	await getConnection().close();
}
