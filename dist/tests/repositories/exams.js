"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertExam = exports.deleteAllExams = void 0;
const typeorm_1 = require("typeorm");
const Exam_1 = __importDefault(require("../../src/repositories/entities/Exam"));
function deleteAllExams() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(Exam_1.default)
            .where('id >= :id', { id: 1 })
            .execute();
    });
}
exports.deleteAllExams = deleteAllExams;
function insertExam(exam) {
    return __awaiter(this, void 0, void 0, function* () {
        const newExam = (0, typeorm_1.getRepository)(Exam_1.default).create({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId,
            subjectId: exam.subjectId,
            teacherId: exam.teacherId,
        });
        return (0, typeorm_1.getRepository)(Exam_1.default).save(newExam);
    });
}
exports.insertExam = insertExam;
