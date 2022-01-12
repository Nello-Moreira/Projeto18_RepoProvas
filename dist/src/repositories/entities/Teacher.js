"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-cycle */
const typeorm_1 = require("typeorm");
const Exam_1 = __importDefault(require("./Exam"));
const Subject_1 = __importDefault(require("./Subject"));
let Teacher = class Teacher {
    getTeacher() {
        return {
            id: this.id,
            name: this.name,
            examsQuantity: this.exams.length,
        };
    }
    getTeacherName() {
        return {
            name: this.name,
        };
    }
    getExams() {
        return this.exams.map((exam) => exam.getExamWithSubject());
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Teacher.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Subject_1.default, (subject) => subject.teachers),
    __metadata("design:type", Array)
], Teacher.prototype, "subjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Exam_1.default, (exam) => exam.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "exams", void 0);
Teacher = __decorate([
    (0, typeorm_1.Entity)('teachers')
], Teacher);
exports.default = Teacher;
