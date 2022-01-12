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
const exams_1 = __importDefault(require("../repositories/exams"));
const subjects_1 = __importDefault(require("./subjects"));
const teachers_1 = __importDefault(require("./teachers"));
const categories_1 = __importDefault(require("./categories"));
const Conflict_1 = __importDefault(require("../errors/Conflict"));
const NoContent_1 = __importDefault(require("../errors/NoContent"));
function insertExam(exam) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingExam = yield exams_1.default.findExamByFileUrl(exam.fileUrl);
        if (existingExam) {
            throw new Conflict_1.default('This file already exists');
        }
        yield subjects_1.default.findSubject(exam.subjectId);
        yield teachers_1.default.findTeacher(exam.professorId);
        yield categories_1.default.findCategory(exam.categoryId);
        return exams_1.default.insertExam(exam);
    });
}
function findCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield exams_1.default.findCategories();
        if (categories.length === 0) {
            throw new NoContent_1.default('There are no categories');
        }
        return categories;
    });
}
exports.default = { insertExam, findCategories };
