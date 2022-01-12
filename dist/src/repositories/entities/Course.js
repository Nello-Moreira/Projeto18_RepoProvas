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
const Subject_1 = __importDefault(require("./Subject"));
let Course = class Course {
    getCourse() {
        return {
            id: this.id,
            name: this.name,
        };
    }
    getSubjects() {
        return this.subjects.map((subject) => subject.getSubject());
    }
    getTeachers() {
        function unique(array) {
            const uniqueSet = new Set();
            return array.filter((item) => (uniqueSet.has(item.id) ? false : uniqueSet.add(item.id)));
        }
        function sortFn(a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        }
        const allSubjectsTeachers = this.subjects.map((subject) => subject.teachers.map((teacher) => teacher.getTeacher())).flat(1);
        const uniqueTeachers = unique(allSubjectsTeachers);
        return uniqueTeachers.sort(sortFn);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Course.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Course.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subject_1.default, (subject) => subject.course),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Course.prototype, "subjects", void 0);
Course = __decorate([
    (0, typeorm_1.Entity)('courses')
], Course);
exports.default = Course;
