"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoleScript = exports.createDatabase = exports.getPassword = exports.getUsername = exports.getDatabaseName = void 0;
const child_process_1 = require("child_process");
const readline_sync_1 = __importDefault(require("readline-sync"));
const fs_1 = __importDefault(require("fs"));
const databaseScriptsFolderPath = './database_scripts';
const createDatabase = (databaseName) => {
    const writeDatabaseNameFile = (databaseName) => {
        try {
            fs_1.default.writeFileSync(`${databaseScriptsFolderPath}/database_name.txt`, `${databaseName}`);
        }
        catch (error) {
            console.log(error);
        }
    };
    writeDatabaseNameFile(databaseName);
    (0, child_process_1.execFile)(`${databaseScriptsFolderPath}/create-database.sh`);
};
exports.createDatabase = createDatabase;
const createRoleScript = ({ username, password }) => {
    try {
        fs_1.default.writeFileSync(`${databaseScriptsFolderPath}/scripts/create-role.sql`, `DO\n$$\nBEGIN\n\tIF NOT EXISTS (\nSELECT FROM pg_catalog.pg_roles WHERE rolname='${username}'\n) THEN\nCREATE ROLE ${username} WITH SUPERUSER CREATEDB CREATEROLE LOGIN ENCRYPTED PASSWORD '${password}';\nEND IF;\nEND\n$$;`);
    }
    catch (error) {
        console.log(error);
    }
};
exports.createRoleScript = createRoleScript;
const getDatabaseName = () => readline_sync_1.default.question('Enter your database name: ');
exports.getDatabaseName = getDatabaseName;
const getUsername = () => readline_sync_1.default.question('Enter your username for this database: ');
exports.getUsername = getUsername;
const getPassword = () => {
    let firstTry;
    let secondTry;
    while (true) {
        firstTry = readline_sync_1.default.question('Enter your password: ', {
            hideEchoBack: true,
        });
        secondTry = readline_sync_1.default.question('Enter your password: ', {
            hideEchoBack: true,
        });
        if (firstTry !== secondTry) {
            console.log("The password you entered doesn't match. Please try again.");
        }
        else {
            return firstTry;
        }
    }
};
exports.getPassword = getPassword;
