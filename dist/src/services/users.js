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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../repositories/users"));
const Conflict_1 = __importDefault(require("../errors/Conflict"));
const NotFound_1 = __importDefault(require("../errors/NotFound"));
function signUp(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield users_1.default.findUserByEmail(user.email);
        if (existingUser) {
            throw new Conflict_1.default('There is already a user registered with that email');
        }
        yield users_1.default.createUser(user);
        return true;
    });
}
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield users_1.default.findUserByEmail(user.email);
        if (!existingUser) {
            throw new NotFound_1.default('Incorrect email or password');
        }
        if (!existingUser.isCorrectPassword(user.password)) {
            throw new NotFound_1.default('Incorrect email or password');
        }
        const token = jsonwebtoken_1.default.sign({ name: existingUser.name }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        yield users_1.default.createSession({ userId: existingUser.id, token });
        return { name: existingUser.name, token };
    });
}
function logout(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield users_1.default.deleteSession(token);
        return true;
    });
}
function getSession(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const activeSession = yield users_1.default.findSessionByToken(token);
            if (!activeSession) {
                return { id: null, userId: null, token: null };
            }
            return activeSession;
        }
        catch (error) {
            yield users_1.default.deleteSession(token);
            return { id: null, userId: null, token: null };
        }
    });
}
exports.default = {
    signUp,
    login,
    logout,
    getSession,
};
