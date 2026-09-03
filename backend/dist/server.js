"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_2 = require("./app/lib/mongoose");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.set('bufferCommands', false);
            yield (0, mongoose_2.connectToDatabase)();
            console.log('Database connected');
            if (process.env.NODE_ENV !== 'production') {
                app_1.default.listen(config_1.default.port, () => {
                    console.log(`Server running locally on port ${config_1.default.port}`);
                });
            }
        }
        catch (err) {
            console.error('DB connection error:', err);
        }
    });
}
void main();
exports.default = app_1.default;
