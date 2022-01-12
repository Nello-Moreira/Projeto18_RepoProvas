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
const Course_1 = __importDefault(require("./Course"));
const Exam_1 = __importDefault(require("./Exam"));
const Season_1 = __importDefault(require("./Season"));
const Teacher_1 = __importDefault(require("./Teacher"));
let Subject = class Subject {
    getSubject() {
        return {
            id: this.id,
            name: this.name,
            season: this.season.getSeason().name,
            examsQuantity: this.exams.length,
        };
    }
    getSubjectName() {
        return {
            name: this.name,
        };
    }
    getExams() {
        return this.exams.map((exam) => exam.getExamWithTeacher());
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Subject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'course_id' }),
    __metadata("design:type", Number)
], Subject.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'season_id' }),
    __metadata("design:type", Number)
], Subject.prototype, "seasonId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Course_1.default, (course) => course.subjects),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    __metadata("design:type", Course_1.default)
], Subject.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Season_1.default, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'season_id' }),
    __metadata("design:type", Season_1.default)
], Subject.prototype, "season", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Teacher_1.default, (teacher) => teacher.subjects),
    (0, typeorm_1.JoinTable)({
        name: 'teachers_subjects',
        joinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'teacher_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], Subject.prototype, "teachers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Exam_1.default, (exam) => exam.subject),
    __metadata("design:type", Array)
], Subject.prototype, "exams", void 0);
Subject = __decorate([
    (0, typeorm_1.Entity)('subjects')
], Subject);
exports.default = Subject;
