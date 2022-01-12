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
const typeorm_1 = require("typeorm");
const server_1 = __importStar(require("../../src/server"));
const User_1 = __importDefault(require("../../src/repositories/entities/User"));
const user_1 = require("../factories/user");
const users_1 = require("../repositories/users");
const connection_1 = require("../repositories/connection");
const route = '/sign-up';
describe('Tests for post /sign-up', () => {
    const user = (0, user_1.createUser)();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, server_1.init)();
        yield (0, users_1.deleteAllUsers)();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, users_1.deleteAllUsers)();
        const insertedUser = yield (0, users_1.insertUser)(user);
        user.id = insertedUser.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connection_1.closeConnection)();
    }));
    it('should return status code 201 when user is created', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post(route).send({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        const inserted = yield (0, typeorm_1.getRepository)(User_1.default).find({ email: user.email });
        expect(response.status).toBe(201 /* created */);
        expect(inserted).toHaveLength(1);
    }));
    it('should return status code 409 when there is a conflict', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post(route).send({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        expect(response.status).toBe(409 /* conflict */);
    }));
    it('should return status code 400 when an invalid body is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post(route).send({
            name: user.name,
            email: '',
            password: user.password,
        });
        expect(response.status).toBe(400 /* badRequest */);
    }));
});
