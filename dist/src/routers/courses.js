"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_1 = __importDefault(require("../controllers/courses"));
const coursesRouter = express_1.default.Router();
coursesRouter.get('/', courses_1.default.getCourses);
coursesRouter.get('/:id/subjects', courses_1.default.getSubjects);
coursesRouter.get('/:id/professors', courses_1.default.getProfessors);
exports.default = coursesRouter;
