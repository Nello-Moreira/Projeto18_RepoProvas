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
exports.init = void 0;
require("../setup/dotenvSetup");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./repositories/connection"));
const databaseError_1 = __importDefault(require("./middlewares/databaseError"));
const authorization_1 = __importDefault(require("./middlewares/authorization"));
const session_1 = __importDefault(require("./routers/session"));
const signUp_1 = __importDefault(require("./routers/signUp"));
const login_1 = __importDefault(require("./routers/login"));
const logout_1 = __importDefault(require("./routers/logout"));
const exams_1 = __importDefault(require("./routers/exams"));
const subjects_1 = __importDefault(require("./routers/subjects"));
const teachers_1 = __importDefault(require("./routers/teachers"));
const courses_1 = __importDefault(require("./routers/courses"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use('/session', session_1.default);
server.use('/sign-up', signUp_1.default);
server.use('/login', login_1.default);
server.use(authorization_1.default);
server.use('/logout', logout_1.default);
server.use('/exams', exams_1.default);
server.use('/subjects', subjects_1.default);
server.use('/professors', teachers_1.default);
server.use('/courses', courses_1.default);
server.use(databaseError_1.default);
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.default)();
    });
}
exports.init = init;
exports.default = server;
