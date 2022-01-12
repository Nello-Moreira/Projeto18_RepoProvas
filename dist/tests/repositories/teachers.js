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
exports.insertTeacher = exports.deleteAllTeachers = void 0;
const typeorm_1 = require("typeorm");
const Teacher_1 = __importDefault(require("../../src/repositories/entities/Teacher"));
const exams_1 = require("./exams");
function deleteAllTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, exams_1.deleteAllExams)();
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from('teachers_subjects')
            .where('id >= :id', { id: 1 })
            .execute();
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(Teacher_1.default)
            .where('id >= :id', { id: 1 })
            .execute();
    });
}
exports.deleteAllTeachers = deleteAllTeachers;
function insertTeacher(teacher, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        let newTeacher = (0, typeorm_1.getRepository)(Teacher_1.default).create(teacher);
        newTeacher = yield (0, typeorm_1.getRepository)(Teacher_1.default).save(newTeacher);
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder().insert().into('teachers_subjects')
            .values([{
                teacher_id: newTeacher.id,
                subject_id: subject.id,
            }])
            .execute();
        return newTeacher;
    });
}
exports.insertTeacher = insertTeacher;
