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
const subjects_1 = __importDefault(require("../repositories/subjects"));
const NoContent_1 = __importDefault(require("../errors/NoContent"));
const NotFound_1 = __importDefault(require("../errors/NotFound"));
function findSubjectExams(subjectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = yield subjects_1.default.findSubjectExams(subjectId);
        if (!subject) {
            throw new NotFound_1.default(`There are no subjects with id ${subjectId}`);
        }
        const exams = subject.getExams();
        if (exams.length === 0) {
            throw new NoContent_1.default('There are no exams for this subject');
        }
        return exams;
    });
}
function findSubject(subjectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = yield subjects_1.default.findSubjectById(subjectId);
        if (!subject) {
            throw new NotFound_1.default(`There is no subject with id ${subjectId}`);
        }
        return subject;
    });
}
exports.default = { findSubjectExams, findSubject };
