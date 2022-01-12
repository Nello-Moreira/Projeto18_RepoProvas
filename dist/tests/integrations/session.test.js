"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importStar(require("../../src/server"));
const user_1 = require("../factories/user");
const users_1 = require("../repositories/users");
const connection_1 = require("../repositories/connection");
const route = '/session';
describe('Tests for post /session', () => {
    const user = (0, user_1.createUser)();
    let session;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, server_1.init)();
        yield (0, users_1.deleteAllSessions)();
        yield (0, users_1.deleteAllUsers)();
        const insertedUser = yield (0, users_1.insertUser)(user);
        user.id = insertedUser.id;
        session = yield (0, users_1.insertSession)(user);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, users_1.deleteAllSessions)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, users_1.deleteAllSessions)();
        yield (0, users_1.deleteAllUsers)();
        yield (0, connection_1.closeConnection)();
    }));
    it('should return status code 200 and body = true when session is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post(route).send({
            token: session.token,
        });
        expect(response.status).toBe(200 /* ok */);
        expect(response.body).toEqual({ valid: true });
    }));
    it('should return status code 200 and body = false when session is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post(route).send({
            token: session.token,
        });
        expect(response.status).toBe(200 /* ok */);
        expect(response.body).toEqual({ valid: false });
    }));
    it("should return status code 400 when token isn't provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post(route).send({});
        expect(response.status).toBe(400 /* badRequest */);
    }));
});
