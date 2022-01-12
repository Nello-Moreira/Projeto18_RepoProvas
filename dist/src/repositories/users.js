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
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./entities/User"));
const Session_1 = __importDefault(require("./entities/Session"));
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, typeorm_1.getRepository)(User_1.default).findOne({ email });
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = (0, typeorm_1.getRepository)(User_1.default).create({
            name: user.name,
            email: user.email,
        });
        newUser.password = user.password;
        yield (0, typeorm_1.getRepository)(User_1.default).save(newUser);
        return true;
    });
}
function createSession(session) {
    return __awaiter(this, void 0, void 0, function* () {
        const newSession = new Session_1.default();
        newSession.userId = session.userId;
        newSession.token = session.token;
        yield (0, typeorm_1.getConnection)().manager.save(newSession);
        return true;
    });
}
function deleteSession(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, typeorm_1.getRepository)(Session_1.default).delete({ token });
        return true;
    });
}
function findSessionByToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, typeorm_1.getRepository)(Session_1.default).findOne({ token });
    });
}
exports.default = {
    createUser,
    findUserByEmail,
    createSession,
    deleteSession,
    findSessionByToken,
};
