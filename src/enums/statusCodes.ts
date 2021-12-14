const enum HttpStatusCodes {
	ok = 200,
	created = 201,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	conflict = 409,
	internalError = 500,
	notImplemented = 501,
}

export default HttpStatusCodes;
