"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInvalidLogin = exports.isInvalidSignUp = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpSchema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
    })
        .required(),
    password: joi_1.default.string().min(1).required(),
}).max(3);
const isInvalidSignUp = (input) => signUpSchema.validate(input).error;
exports.isInvalidSignUp = isInvalidSignUp;
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'br'] },
    })
        .required(),
    password: joi_1.default.string().min(1).required(),
}).max(2);
const isInvalidLogin = (input) => loginSchema.validate(input).error;
exports.isInvalidLogin = isInvalidLogin;
