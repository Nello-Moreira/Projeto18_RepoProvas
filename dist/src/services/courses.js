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
const courses_1 = __importDefault(require("../repositories/courses"));
const NoContent_1 = __importDefault(require("../errors/NoContent"));
const NotFound_1 = __importDefault(require("../errors/NotFound"));
function findCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield courses_1.default.findCourses();
        if (courses.length === 0) {
            throw new NoContent_1.default('There are no courses');
        }
        return courses;
    });
}
function findCourseSubjects(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield courses_1.default.findCourseSubjects(courseId);
        if (!course) {
            throw new NotFound_1.default(`There are no courses with id ${courseId}`);
        }
        const subjects = course.getSubjects();
        if (subjects.length === 0) {
            throw new NoContent_1.default(`There are no courses with id ${courseId}`);
        }
        return subjects.sort((a, b) => (a.season < b.season ? -1 : 1));
    });
}
function findCourseTeachers(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield courses_1.default.findCourseTeachers(courseId);
        if (!course) {
            throw new NotFound_1.default(`There are no courses with id ${courseId}`);
        }
        const teachers = course.getTeachers();
        if (teachers.length === 0) {
            throw new NoContent_1.default('There are no professors for this course');
        }
        return teachers;
    });
}
exports.default = { findCourses, findCourseSubjects, findCourseTeachers };
