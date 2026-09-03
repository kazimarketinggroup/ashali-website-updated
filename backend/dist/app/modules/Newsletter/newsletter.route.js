"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterRoutes = void 0;
// newsletter.route.ts
const express_1 = require("express");
const newsletter_controller_1 = require("./newsletter.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const newsletter_validation_1 = __importDefault(require("./newsletter.validation"));
const router = (0, express_1.Router)();
// Public routes
router.post('/subscribe', (0, validateRequest_1.default)(newsletter_validation_1.default.SubscribeSchema), newsletter_controller_1.NewsletterControllers.subscribe);
router.post('/unsubscribe', newsletter_controller_1.NewsletterControllers.unsubscribe);
// Admin routes - require authentication
router.get('/', (0, auth_1.default)(), newsletter_controller_1.NewsletterControllers.getAllSubscribers);
router.delete('/:id', (0, auth_1.default)(), newsletter_controller_1.NewsletterControllers.deleteSubscriber);
exports.NewsletterRoutes = router;
