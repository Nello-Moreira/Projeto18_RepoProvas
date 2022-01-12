"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExam = void 0;
const faker_1 = __importDefault(require("faker"));
const newName_1 = __importDefault(require("./newName"));
function createExam(subject, category, teacher, name = null) {
    const newName = (0, newName_1.default)(name);
    return {
        name: newName,
        fileUrl: faker_1.default.internet.url(),
        categoryId: category.id,
        subjectId: subject.id,
        teacherId: teacher.id,
    };
}
exports.createExam = createExam;
