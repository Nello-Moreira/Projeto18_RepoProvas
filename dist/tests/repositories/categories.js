"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCategory = exports.deleteAllCategories = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = __importDefault(require("../../src/repositories/entities/Category"));
const exams_1 = require("./exams");
function deleteAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, exams_1.deleteAllExams)();
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(Category_1.default)
            .where('id >= :id', { id: 1 })
            .execute();
    });
}
exports.deleteAllCategories = deleteAllCategories;
function insertCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = (0, typeorm_1.getRepository)(Category_1.default).create(category);
        return (0, typeorm_1.getRepository)(Category_1.default).save(newCategory);
    });
}
exports.insertCategory = insertCategory;
