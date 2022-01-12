"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseSetup_1 = require("./setup/databaseSetup");
const envSetup_1 = require("./setup/envSetup");
const mainFunction = () => {
    const databaseName = (0, databaseSetup_1.getDatabaseName)();
    const username = (0, databaseSetup_1.getUsername)();
    const password = (0, databaseSetup_1.getPassword)();
    console.log('Creating envs files');
    (0, envSetup_1.createEnvs)({ username, password, databaseName });
    console.log('Creating sql scripts');
    (0, databaseSetup_1.createRoleScript)({ username, password });
    console.log('Creating database');
    (0, databaseSetup_1.createDatabase)(databaseName);
};
mainFunction();
