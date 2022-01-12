"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInvalidExam = void 0;
const joi_1 = __importDefault(require("joi"));
const examSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    fileUrl: joi_1.default.string().min(1).required(),
    categoryId: joi_1.default.number().integer().min(1).required(),
    subjectId: joi_1.default.number().integer().min(1).required(),
    professorId: joi_1.default.number().integer().min(1).required(),
}).max(5);
const isInvalidExam = (input) => examSchema.validate(input).error;
exports.isInvalidExam = isInvalidExam;
