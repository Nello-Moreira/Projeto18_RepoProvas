"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubject = void 0;
const newName_1 = __importDefault(require("./newName"));
function createSubject(course, season, name = null) {
    const newName = (0, newName_1.default)(name);
    return {
        name: newName,
        courseId: course.id,
        seasonId: season.id,
    };
}
exports.createSubject = createSubject;
