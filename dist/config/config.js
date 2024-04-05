"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.PORT = process.env.PORT || 5001;
    Config.DATABASE = "".concat(process.env.DATABASE);
    return Config;
}());
exports.default = Config;
