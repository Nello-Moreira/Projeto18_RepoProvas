import Joi from 'joi';

import IExam from '../protocols/Exam';

const examSchema = Joi.object({
	name: Joi.string().min(1).required(),
	fileUrl: Joi.string().min(1).required(),
	categoryId: Joi.number().integer().min(1).required(),
	subjectId: Joi.number().integer().min(1).required(),
	professorId: Joi.number().integer().min(1).required(),
}).max(5);

const isInvalidExam = (input: IExam) => examSchema.validate(input).error;

export { isInvalidExam };
