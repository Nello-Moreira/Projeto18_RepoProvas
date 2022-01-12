"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exams_1 = __importDefault(require("../controllers/exams"));
const examsRouter = express_1.default.Router();
examsRouter.post('/', exams_1.default.sendExams);
examsRouter.get('/categories', exams_1.default.getCategories);
exports.default = examsRouter;
