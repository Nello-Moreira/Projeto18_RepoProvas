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
exports.insertCourse = exports.deleteAllCourses = void 0;
const typeorm_1 = require("typeorm");
const Course_1 = __importDefault(require("../../src/repositories/entities/Course"));
const subjects_1 = require("./subjects");
function deleteAllCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, subjects_1.deleteAllSubjects)();
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(Course_1.default)
            .where('id >= :id', { id: 1 })
            .execute();
    });
}
exports.deleteAllCourses = deleteAllCourses;
function insertCourse(course) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCourse = (0, typeorm_1.getRepository)(Course_1.default).create(course);
        return (0, typeorm_1.getRepository)(Course_1.default).save(newCourse);
    });
}
exports.insertCourse = insertCourse;
