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
const courses_1 = __importDefault(require("../services/courses"));
const NoContent_1 = __importDefault(require("../errors/NoContent"));
const NotFound_1 = __importDefault(require("../errors/NotFound"));
function getCourses(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield courses_1.default.findCourses();
            return response.status(200 /* ok */).send(courses);
        }
        catch (error) {
            if (error instanceof NoContent_1.default) {
                return response.sendStatus(204 /* noContent */);
            }
            return next(error);
        }
    });
}
function getSubjects(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseId = Number(request.params.id);
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(courseId) || courseId < 1) {
            return response.status(400 /* badRequest */).send('Invalid course id');
        }
        try {
            const subjects = yield courses_1.default.findCourseSubjects(courseId);
            return response.status(200 /* ok */).send(subjects);
        }
        catch (error) {
            if (error instanceof NotFound_1.default) {
                return response.status(404 /* notFound */).send(error.message);
            }
            if (error instanceof NoContent_1.default) {
                return response.sendStatus(204 /* noContent */);
            }
            return next(error);
        }
    });
}
function getProfessors(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const courseId = Number(request.params.id);
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(courseId) || courseId < 1) {
            return response.status(400 /* badRequest */).send('Invalid course id');
        }
        try {
            const teachers = yield courses_1.default.findCourseTeachers(courseId);
            return response.status(200 /* ok */).send(teachers);
        }
        catch (error) {
            if (error instanceof NotFound_1.default) {
                return response.status(404 /* notFound */).send(error.message);
            }
            if (error instanceof NoContent_1.default) {
                return response.sendStatus(204 /* noContent */);
            }
            return next(error);
        }
    });
}
exports.default = { getCourses, getSubjects, getProfessors };
