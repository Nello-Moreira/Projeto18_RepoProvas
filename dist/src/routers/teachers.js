"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teachers_1 = __importDefault(require("../controllers/teachers"));
const teachersRouter = express_1.default.Router();
teachersRouter.get('/:id', teachers_1.default.getExams);
exports.default = teachersRouter;
