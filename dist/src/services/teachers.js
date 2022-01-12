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
const teachers_1 = __importDefault(require("../repositories/teachers"));
const NoContent_1 = __importDefault(require("../errors/NoContent"));
const NotFound_1 = __importDefault(require("../errors/NotFound"));
function findTeacherExams(teacherId) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield teachers_1.default.findTeacherExams(teacherId);
        if (!teacher) {
            throw new NotFound_1.default(`There are no teachers with id ${teacherId}`);
        }
        const exams = teacher.getExams();
        if (exams.length === 0) {
            throw new NoContent_1.default('There are no exams for this professor');
        }
        return exams;
    });
}
function findTeacher(teacherId) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield teachers_1.default.findTeacherById(teacherId);
        if (!teacher) {
            throw new NotFound_1.default(`There is no teacher with id ${teacherId}`);
        }
        return teacher;
    });
}
exports.default = { findTeacherExams, findTeacher };
