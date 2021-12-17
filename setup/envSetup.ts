import fs from 'fs';

const pathToCreate = './';

interface Settings {
	username: string;
	password: string;
	databaseName: string;
}
const createEnvs = ({ username, password, databaseName }: Settings) => {
	const writeEnvsData = (env: string) => {
		try {
			fs.writeFileSync(
				`${env ? `${pathToCreate}/.${env}.env` : `${pathToCreate}/.env`}`,
				`DATABASE_URL=postgres://${username}:${password}@localhost:5432/${databaseName}${env ? `_${env}` : ''}\nPORT=8080\nJWT_SECRET=educationalPurpose`
			);
		} catch (error) {
			console.log(error);
		}
	};

	writeEnvsData('');
	writeEnvsData('development');
	writeEnvsData('test');
};

export { createEnvs };
