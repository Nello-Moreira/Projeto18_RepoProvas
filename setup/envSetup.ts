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
				`${
					env
						? `DB_USER=${username}\nDB_PASSWORD=${password}\nDB_PORT=5432\nDB_HOST=localhost\nDB_DATABASE=${databaseName}_${env}\nPORT=8080\nJWT_SECRET=educationalPurpose`
						: `DATABASE_URL=postgres://${username}:${password}@localhost:5432/${databaseName}\nPORT=8080\nJWT_SECRET=educationalPurpose`
				}`
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
