"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function databaseErrorMiddleware(error, request, response) {
    console.error(error);
    return response.sendStatus(500 /* internalError */);
}
exports.default = databaseErrorMiddleware;
