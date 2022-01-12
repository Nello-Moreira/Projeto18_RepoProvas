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
const Category_1 = __importDefault(require("./Category"));
const Subject_1 = __importDefault(require("./Subject"));
const Teacher_1 = __importDefault(require("./Teacher"));
let Exam = class Exam {
    getExam() {
        var _a, _b;
        return {
            id: this.id,
            name: this.name,
            fileUrl: this.fileUrl,
            category: this.category.getCategory().name,
            professor: ((_a = this.teacher) === null || _a === void 0 ? void 0 : _a.getTeacherName().name) || null,
            subject: ((_b = this.subject) === null || _b === void 0 ? void 0 : _b.getSubjectName().name) || null,
        };
    }
    getExamWithTeacher() {
        return {
            id: this.id,
            name: this.name,
            fileUrl: this.fileUrl,
            category: this.category.getCategory().name,
            professor: this.teacher.getTeacherName().name,
        };
    }
    getExamWithSubject() {
        return {
            id: this.id,
            name: this.name,
            fileUrl: this.fileUrl,
            category: this.category.getCategory().name,
            subject: this.subject.getSubjectName().name,
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Exam.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exam.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_url' }),
    __metadata("design:type", String)
], Exam.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_id' }),
    __metadata("design:type", Number)
], Exam.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'subject_id' }),
    __metadata("design:type", Number)
], Exam.prototype, "subjectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'teacher_id' }),
    __metadata("design:type", Number)
], Exam.prototype, "teacherId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.default, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Category_1.default)
], Exam.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.default, (teacher) => teacher.exams),
    (0, typeorm_1.JoinColumn)({ name: 'teacher_id' }),
    __metadata("design:type", Teacher_1.default)
], Exam.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Subject_1.default, (subject) => subject.exams),
    (0, typeorm_1.JoinColumn)({ name: 'subject_id' }),
    __metadata("design:type", Subject_1.default)
], Exam.prototype, "subject", void 0);
Exam = __decorate([
    (0, typeorm_1.Entity)('exams')
], Exam);
exports.default = Exam;
