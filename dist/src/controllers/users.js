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
const users_1 = __importDefault(require("../services/users"));
const users_2 = require("../validation/users");
const NotFound_1 = __importDefault(require("../errors/NotFound"));
const Conflict_1 = __importDefault(require("../errors/Conflict"));
function signUp(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const signUpBody = request.body;
        const signUpError = (0, users_2.isInvalidSignUp)(signUpBody);
        if (signUpError) {
            return response
                .status(400 /* badRequest */)
                .send(signUpError.message);
        }
        try {
            yield users_1.default.signUp(signUpBody);
            return response.sendStatus(201 /* created */);
        }
        catch (error) {
            if (error instanceof Conflict_1.default) {
                return response.status(409 /* conflict */).send(error.message);
            }
            return next(error);
        }
    });
}
function login(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginBody = request.body;
        const loginError = (0, users_2.isInvalidLogin)(loginBody);
        if (loginError) {
            return response.status(400 /* badRequest */).send(loginError.message);
        }
        try {
            const userInfo = yield users_1.default.login(loginBody);
            return response.status(200 /* ok */).send(userInfo);
        }
        catch (error) {
            if (error instanceof NotFound_1.default) {
                return response.status(404 /* notFound */).send(error.message);
            }
            return next(error);
        }
    });
}
function logout(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield users_1.default.logout(response.locals.token);
            return response.sendStatus(200 /* ok */);
        }
        catch (error) {
            return next(error);
        }
    });
}
function isValidSession(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = request.body;
        if (!token || typeof token !== typeof '') {
            return response
                .status(400 /* badRequest */)
                .send("It's necessary to provide a valid token");
        }
        try {
            const session = yield users_1.default.getSession(token);
            if (session.id) {
                return response.status(200 /* ok */).send({ valid: true });
            }
            return response.status(200 /* ok */).send({ valid: false });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.default = {
    signUp,
    login,
    logout,
    isValidSession,
};
