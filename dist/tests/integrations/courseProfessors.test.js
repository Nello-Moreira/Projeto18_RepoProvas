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
const users_1 = require("../repositories/users");
const connection_1 = require("../repositories/connection");
const courses_1 = require("../repositories/courses");
const seasons_1 = require("../repositories/seasons");
const subjects_1 = require("../repositories/subjects");
const teachers_1 = require("../repositories/teachers");
const route = '/courses/:id/professors';
describe('Tests for get /courses/:id/professors', () => {
    const user = (0, user_1.createUser)();
    let course = (0, course_1.createCourse)();
    let season = (0, season_1.createSeason)();
    let teacher = (0, teacher_1.createTeacher)();
    let session;
    let subject;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, server_1.init)();
        yield (0, teachers_1.deleteAllTeachers)();
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
        subject = (0, subject_1.createSubject)(course, season);
        subject = yield (0, subjects_1.insertSubject)(subject);
        teacher = yield (0, teachers_1.insertTeacher)(teacher, subject);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, teachers_1.deleteAllTeachers)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, subjects_1.deleteAllSubjects)();
        yield (0, courses_1.deleteAllCourses)();
        yield (0, seasons_1.deleteAllSeasons)();
        yield (0, users_1.deleteAllSessions)();
        yield (0, users_1.deleteAllUsers)();
        yield (0, connection_1.closeConnection)();
    }));
    it('should return status code 200 and an array of courses', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get(route.replace(':id', `${course.id}`))
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(200 /* ok */);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toEqual({
            id: teacher.id,
            name: teacher.name,
            examsQuantity: 0,
        });
    }));
    it('should return status code 400 for invalid course id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get(route.replace(':id', '0'))
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(400 /* badRequest */);
    }));
    it('should return status code 404 when there is no course with provided id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get(route.replace(':id', `${course.id + 1}`))
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(404 /* notFound */);
    }));
    it('should return status code 204 when there are no teachers', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get(route.replace(':id', `${course.id}`))
            .set('authorization', `Bearer ${session.token}`);
        expect(response.status).toBe(204 /* noContent */);
    }));
});
