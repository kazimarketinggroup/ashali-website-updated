"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), 'backend/.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL ||
        process.env.MONGODB_URI ||
        process.env.MONGO_URI ||
        process.env.DB_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    node_env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    arjcet_key: process.env.ARCJET_KEY,
    arjcet_env: process.env.ARCJET_ENV,
    frontend_url: process.env.FRONTEND_URL,
    mail_user: process.env.MAIL_USER || process.env.EMAIL_USER,
    mail_pass: process.env.MAIL_PASS || process.env.EMAIL_APP_PASSWORD,
    contact_owner_email: process.env.CONTACT_OWNER_EMAIL ||
        process.env.OWNER_EMAIL ||
        process.env.MAIL_TO,
};
