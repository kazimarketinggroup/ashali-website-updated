"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
// contact.model.ts
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'Enquiry type is required'],
        enum: ['speaking', 'advisory', 'impact', 'media', 'sea'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
    },
    message: {
        type: String,
        trim: true,
    },
    details: {
        type: mongoose_1.Schema.Types.Mixed,
        default: {},
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'resolved'],
        default: 'pending',
    },
}, {
    timestamps: true,
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
