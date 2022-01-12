"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
function createNewName(name = null) {
    let newName = faker_1.default.random.alphaNumeric(20);
    if (name) {
        while (name === newName) {
            newName = faker_1.default.random.alphaNumeric(20);
        }
    }
    return newName;
}
exports.default = createNewName;
