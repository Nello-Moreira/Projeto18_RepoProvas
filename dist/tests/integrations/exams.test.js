"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importStar(require("../../src/server"));
const course_1 = require("../factories/course");
const user_1 = require("../factories/user");
const season_1 = require("../factories/season");
const subject_1 = require("../factories/subject");
const teacher_1 = require("../factories/teacher");
const exam_1 = require("../factories/exam");
const category_1 = require("../factories/category");
const users_1 = require("../repositories/users");
const connection_1 = require("../repositories/connection");
const courses_1 = require("../repositories/courses");
const seasons_1 = require("../repositories/seasons");
const subjects_1 = require("../repositories/subjects");
const teachers_1 = require("../repositories/teachers");
const categories_1 = require("../repositories/categories");
const exams_1 = require("../repositories/exams");
const route = '/exams';
describe('Tests for post /exams', () => {
    const user = (0, user_1.createUser)();
    let course = (0, course_1.createCourse)();
    let season = (0, season_1.createSeason)();
    let teacher = (0, teacher_1.createTeacher)();
    let category = (0, category_1.createCategory)();
    let session;
    let subject;
    let exam;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, server_1.init)();
        yield (0, subjects_1.deleteAllSubjects)();
        yield (0, courses_1.deleteAllCourses)();
        yield (0, seasons_1.deleteAllSeasons)();
        yield (0, users_1.deleteAllSessions)();
        yield (0, users_1.deleteAllUsers)();
        const insertedUser = yield (0, users_1.insertUser)(user);
        user.id = insertedUser.id;
        session = yield (0, users_1.insertSession)(user);
        season = yield (0, seasons_1.insertSeason)(season);
        course = yield (0, courses_1.insertCourse)(course);
        category = yield (0, categories_1.insertCategory)(category);
        subject = (0, subject_1.createSubject)(course, season);
        subject = yield (0, subjects_1.insertSubject)(subject);
        teacher = yield (0, teachers_1.insertTeacher)(teacher, subject);
        exam = (0, exam_1.createExam)(subject, category, teacher);
        exam = yield (0, exams_1.insertExam)(exam);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exams_1.deleteAllExams)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, teachers_1.deleteAllTeachers)();
        yield (0, subjects_1.deleteAllSubjects)();
        yield (0, courses_1.deleteAllCourses)();
        yield (0, seasons_1.deleteAllSeasons)();
        yield (0, users_1.deleteAllSessions)();
        yield (0, users_1.deleteAllUsers)();
        yield (0, connection_1.closeConnection)();
    }));
    it('should return status code 409 when exam is already posted', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(route)
            .send({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId,
            subjectId: exam.subjectId,
            professorId: exam.teacherId,
        })
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(409 /* conflict */);
    }));
    it('should return status code 201 when exam is correctly posted', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(route)
            .send({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId,
            subjectId: exam.subjectId,
            professorId: exam.teacherId,
        })
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(201 /* created */);
    }));
    it('should return status code 400 for invalid body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(route)
            .send({})
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(400 /* badRequest */);
    }));
    it('should return status code 404 when there is no professor with provided id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(route)
            .send({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId,
            subjectId: exam.subjectId,
            professorId: exam.teacherId + 1,
        })
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(404 /* notFound */);
    }));
    it('should return status code 404 when there is no subject with provided id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(route)
            .send({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId,
            subjectId: exam.subjectId + 1,
            professorId: exam.teacherId,
        })
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(404 /* notFound */);
    }));
    it('should return status code 404 when there is no category with provided id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post(route)
            .send({
            name: exam.name,
            fileUrl: exam.fileUrl,
            categoryId: exam.categoryId + 1,
            subjectId: exam.subjectId,
            professorId: exam.teacherId,
        })
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(404 /* notFound */);
    }));
});
