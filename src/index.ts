/* eslint no-console: 0 */
import server, { init } from './server';

const port = process.env.PORT;

init().then(() => {
	server.listen(port, () => {
		console.log(`Server listening on port ${port}`);
		console.log(`Server running at ${process.env.NODE_ENV} mode`);
	});
});
