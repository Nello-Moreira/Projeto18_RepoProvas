import bcrypt from 'bcrypt';

function hashPassword(password:string):string {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}

function isCorrectPassword(
	{ password, hashedPassword }:{ password:string, hashedPassword:string }
):boolean {
	return bcrypt.compareSync(password, hashedPassword);
}

export { hashPassword, isCorrectPassword };
