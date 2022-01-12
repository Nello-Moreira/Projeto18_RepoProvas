"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSeason = void 0;
const newName_1 = __importDefault(require("./newName"));
function createSeason(name = null) {
    const newName = (0, newName_1.default)(name);
    return {
        name: newName,
    };
}
exports.createSeason = createSeason;
