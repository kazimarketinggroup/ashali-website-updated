"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateContactSchema = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.enum(['speaking', 'advisory', 'impact', 'media', 'sea'], {
            message: 'A valid enquiry type is required',
        }),
        name: zod_1.z
            .string()
            .nonempty('Name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(120, 'Name must be at most 120 characters'),
        email: zod_1.z.string().nonempty('Email is required').email('Invalid email format'),
        message: zod_1.z.string().max(4000).optional(),
        details: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).optional(),
    }),
});
const ContactValidation = { CreateContactSchema };
exports.default = ContactValidation;
