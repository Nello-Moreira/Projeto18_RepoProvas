"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoContentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoContentError';
    }
}
exports.default = NoContentError;
