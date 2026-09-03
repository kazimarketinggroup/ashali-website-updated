"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const SubscribeSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().max(120).optional(),
        email: zod_1.z.string().nonempty('Email is required').email('Invalid email format'),
    }),
});
const NewsletterValidation = { SubscribeSchema };
exports.default = NewsletterValidation;
