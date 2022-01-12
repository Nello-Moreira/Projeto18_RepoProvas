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
function authorizationMiddleware(request, response, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return response
                .status(401 /* unauthorized */)
                .send("It's necessary to provide an authorization token");
        }
        if (typeof token !== 'string') {
            return response.status(400 /* badRequest */).send('Invalid token');
        }
        const session = yield users_1.default.getSession(token);
        if (!session.id) {
            return response
                .status(401 /* unauthorized */)
                .send('Invalid or expired token');
        }
        response.locals = session;
        return next();
    });
}
exports.default = authorizationMiddleware;
