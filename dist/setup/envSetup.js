"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnvs = void 0;
const fs_1 = __importDefault(require("fs"));
const pathToCreate = './';
const createEnvs = ({ username, password, databaseName }) => {
    const writeEnvsData = (env) => {
        try {
            fs_1.default.writeFileSync(`${env ? `${pathToCreate}/.${env}.env` : `${pathToCreate}/.env`}`, `DATABASE_URL=postgres://${username}:${password}@localhost:5432/${databaseName}${env ? `_${env}` : ''}\nPORT=8080\nJWT_SECRET=educationalPurpose`);
        }
        catch (error) {
            console.log(error);
        }
    };
    writeEnvsData('');
    writeEnvsData('development');
    writeEnvsData('test');
};
exports.createEnvs = createEnvs;
