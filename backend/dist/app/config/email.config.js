"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmailTransporter = exports.getMailCredentials = exports.OWNER_EMAIL = exports.SITE_URL = exports.BRAND = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const index_1 = __importDefault(require("./index"));
exports.BRAND = {
    name: 'Ash Ali',
    tagline: 'Entrepreneur · Speaker · Author of The Unfair Advantage',
    // Core site palette — matches the black / orange→teal brand identity used across ashali.com
    ink: '#0a0a0a',
    panel: '#161616',
    card: '#ffffff',
    text: '#1f2430',
    muted: '#6b7280',
    border: '#e9eaec',
    surface: '#f4f5f7',
    orange: '#FF781D',
    teal: '#008080',
    gradient: 'linear-gradient(90deg, #FF781D 0%, #008080 100%)',
};
exports.SITE_URL = index_1.default.frontend_url || 'https://ashali.com';
exports.OWNER_EMAIL = index_1.default.contact_owner_email || index_1.default.mail_user || '';
const getMailCredentials = () => {
    const user = index_1.default.mail_user;
    const pass = index_1.default.mail_pass;
    if (!user || !pass) {
        return null;
    }
    return { user, pass };
};
exports.getMailCredentials = getMailCredentials;
const createEmailTransporter = () => {
    const credentials = (0, exports.getMailCredentials)();
    if (!credentials) {
        return null;
    }
    return nodemailer_1.default.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: credentials,
    });
};
exports.createEmailTransporter = createEmailTransporter;
