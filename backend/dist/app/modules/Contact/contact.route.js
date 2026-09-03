"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
// contact.routes.ts
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const contact_validation_1 = __importDefault(require("./contact.validation"));
const router = (0, express_1.Router)();
// Public route - anyone can submit contact form
router.post('/submit', (0, validateRequest_1.default)(contact_validation_1.default.CreateContactSchema), contact_controller_1.ContactControllers.createContact);
// Admin routes - require authentication
router.get('/', (0, auth_1.default)(), contact_controller_1.ContactControllers.getAllContacts);
router.get('/:id', (0, auth_1.default)(), contact_controller_1.ContactControllers.getContactById);
router.patch('/:id/status', (0, auth_1.default)(), contact_controller_1.ContactControllers.updateContactStatus);
router.delete('/:id', (0, auth_1.default)(), contact_controller_1.ContactControllers.deleteContact);
exports.ContactRoutes = router;
