"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjects_1 = __importDefault(require("../controllers/subjects"));
const subjectsRouter = express_1.default.Router();
subjectsRouter.get('/:id', subjects_1.default.getExams);
exports.default = subjectsRouter;
