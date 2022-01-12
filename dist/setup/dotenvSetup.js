"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
let path;
if (process.env.NODE_ENV === 'production') {
    path = '.env';
}
else if (process.env.NODE_ENV === 'development') {
    path = '.development.env';
}
else {
    path = '.test.env';
}
dotenv_1.default.config({
    path,
});
