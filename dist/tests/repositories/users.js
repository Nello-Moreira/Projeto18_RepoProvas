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
exports.deleteAllSessions = exports.deleteAllUsers = exports.insertSession = exports.insertUser = void 0;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../src/repositories/entities/User"));
const Session_1 = __importDefault(require("../../src/repositories/entities/Session"));
function insertUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = (0, typeorm_1.getRepository)(User_1.default).create(user);
        newUser.password = user.password;
        return (0, typeorm_1.getRepository)(User_1.default).save(newUser);
    });
}
exports.insertUser = insertUser;
function deleteAllSessions() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(Session_1.default)
            .where('id >= :id', { id: 1 })
            .execute();
    });
}
exports.deleteAllSessions = deleteAllSessions;
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield deleteAllSessions();
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(User_1.default)
            .where('id >= :id', { id: 1 })
            .execute();
    });
}
exports.deleteAllUsers = deleteAllUsers;
function insertSession(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const newSession = new Session_1.default();
        newSession.userId = user.id;
        newSession.token = token;
        return (0, typeorm_1.getConnection)().manager.save(newSession);
    });
}
exports.insertSession = insertSession;
