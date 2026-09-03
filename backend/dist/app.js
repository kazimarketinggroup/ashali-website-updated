"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const url_controller_1 = require("./app/modules/Url/url.controller");
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:5173', // Vite dev server (local frontend)
    'http://127.0.0.1:5173',
    'https://www.ashali.com',
    ...(config_1.default.frontend_url ? [config_1.default.frontend_url] : []),
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (Postman, mobile apps, curl, etc.)
        if (!origin) {
            return callback(null, true);
        }
        // Check if origin is in the allowed list
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            // Optional: log rejected origins during development
            console.warn(`CORS blocked origin: ${origin}`);
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
    },
    credentials: true, // Required if you use cookies or Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ──────────────────────────────────────────────────────────────
//                     OTHER MIDDLEWARE & ROUTES
// ──────────────────────────────────────────────────────────────
app.use(express_1.default.json());
// Public short URL redirect (no auth, no CORS issue usually)
app.get('/:shortCode', url_controller_1.UrlControllers.redirectShortUrl);
// All API routes under /api
app.use('/api', routes_1.default);
// Health check / welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Ash Ali backend is running',
        environment: config_1.default.node_env || 'unknown',
        databaseConfigured: Boolean(config_1.default.database_url),
    });
});
// Global error handler (should be last)
app.use(globalErrorHandler_1.default);
exports.default = app;
