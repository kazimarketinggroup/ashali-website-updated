"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
// newsletter.model.ts
const mongoose_1 = require("mongoose");
const newsletterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['subscribed', 'unsubscribed'],
        default: 'subscribed',
    },
}, {
    timestamps: true,
});
exports.Newsletter = (0, mongoose_1.model)('Newsletter', newsletterSchema);
