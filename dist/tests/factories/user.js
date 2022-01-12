"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = exports.createUser = void 0;
const faker_1 = __importDefault(require("faker"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(name = null) {
    let newName = faker_1.default.name.firstName();
    if (name) {
        while (name === newName) {
            newName = faker_1.default.name.firstName();
        }
    }
    return {
        name: newName,
        email: faker_1.default.internet.email(newName),
        password: faker_1.default.internet.password(6),
    };
}
exports.createUser = createUser;
function createSession(user) {
    const token = jsonwebtoken_1.default.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return {
        userId: user.id,
        token,
    };
}
exports.createSession = createSession;
