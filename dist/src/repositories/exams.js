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
const typeorm_1 = require("typeorm");
const Category_1 = __importDefault(require("./entities/Category"));
const Exam_1 = __importDefault(require("./entities/Exam"));
function insertExam(exam) {
    return __awaiter(this, void 0, void 0, function* () {
        const newExam = (0, typeorm_1.getRepository)(Exam_1.default).create({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId,
            subjectId: exam.subjectId,
            teacherId: exam.professorId,
        });
        return (0, typeorm_1.getRepository)(Exam_1.default).save(newExam);
    });
}
function findExamByFileUrl(fileUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, typeorm_1.getRepository)(Exam_1.default).findOne({ fileUrl });
    });
}
function findCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, typeorm_1.getRepository)(Category_1.default).find();
    });
}
exports.default = { insertExam, findExamByFileUrl, findCategories };
