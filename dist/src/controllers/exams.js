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
const exams_1 = __importDefault(require("../services/exams"));
const exams_2 = require("../validation/exams");
const Conflict_1 = __importDefault(require("../errors/Conflict"));
const NotFound_1 = __importDefault(require("../errors/NotFound"));
const NoContent_1 = __importDefault(require("../errors/NoContent"));
function sendExams(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const exam = request.body;
        const examError = (0, exams_2.isInvalidExam)(exam);
        if (examError) {
            return response.status(400 /* badRequest */).send(examError.message);
        }
        try {
            yield exams_1.default.insertExam(exam);
            return response.sendStatus(201 /* created */);
        }
        catch (error) {
            if (error instanceof Conflict_1.default) {
                return response.status(409 /* conflict */).send(error.message);
            }
            if (error instanceof NotFound_1.default) {
                return response.status(404 /* notFound */).send(error.message);
            }
            return next(error);
        }
    });
}
function getCategories(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield exams_1.default.findCategories();
            return response.status(200 /* ok */).send(categories);
        }
        catch (error) {
            if (error instanceof NoContent_1.default) {
                return response.sendStatus(204 /* noContent */);
            }
            return next(error);
        }
    });
}
exports.default = { sendExams, getCategories };
