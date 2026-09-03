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
exports.ContactServices = void 0;
/* eslint-disable no-console */
const contact_model_1 = require("./contact.model");
const contact_interface_1 = require("./contact.interface");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const mongoose_1 = require("../../lib/mongoose");
const email_config_1 = require("../../config/email.config");
const emailTemplates_1 = require("../../lib/emailTemplates");
const normalizeContactPayload = (payload) => {
    var _a, _b, _c;
    return ({
        type: payload.type,
        name: (_a = payload.name) === null || _a === void 0 ? void 0 : _a.trim(),
        email: (_b = payload.email) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase(),
        message: (_c = payload.message) === null || _c === void 0 ? void 0 : _c.trim(),
        details: payload.details,
    });
};
const generateAdminEmailTemplate = (data) => {
    const { name, email, message, details } = data;
    const safeMessage = message ? (0, emailTemplates_1.escapeHtml)(message).replace(/\r?\n/g, '<br>') : '';
    const rows = [
        (0, emailTemplates_1.detailRow)('Enquiry Type', contact_interface_1.ENQUIRY_TYPE_LABELS[data.type], undefined, 0),
        (0, emailTemplates_1.detailRow)('Name', name, undefined, 1),
        (0, emailTemplates_1.detailRow)('Email', email, `mailto:${email}`, 2),
        ...Object.entries(details || {})
            .filter(([, value]) => Boolean(value))
            .map(([label, value], i) => (0, emailTemplates_1.detailRow)(label, value, undefined, i + 3)),
    ].join('');
    return (0, emailTemplates_1.emailShell)(`New ${contact_interface_1.ENQUIRY_TYPE_LABELS[data.type]} Enquiry`, 'Website Notification', `
      <p style="margin:0 0 22px; color:${email_config_1.BRAND.text}; font-size:15px; line-height:1.7;">
        A new enquiry just came in through the website. The details are below — reply directly
        to this email to get back to <strong>${(0, emailTemplates_1.escapeHtml)(name)}</strong>.
      </p>
      ${(0, emailTemplates_1.detailTable)(rows)}
      ${message ? (0, emailTemplates_1.messageCallout)('Message', safeMessage) : ''}
      ${(0, emailTemplates_1.ctaButton)(`Reply to ${name}`, `mailto:${email}`)}
    `);
};
const generateUserAutoReplyTemplate = (data) => (0, emailTemplates_1.emailShell)(`Thank you, ${data.name.split(' ')[0]}`, 'Enquiry Received', `
      <p style="margin:0 0 20px; color:${email_config_1.BRAND.text}; font-size:15px; line-height:1.7;">
        Thank you for reaching out to <strong>${email_config_1.BRAND.name}</strong>. Your
        <strong>${contact_interface_1.ENQUIRY_TYPE_LABELS[data.type]}</strong> enquiry has been received, and the
        team will be in touch shortly.
      </p>
      ${(0, emailTemplates_1.detailTable)((0, emailTemplates_1.detailRow)('Enquiry Type', contact_interface_1.ENQUIRY_TYPE_LABELS[data.type], undefined, 0))}
      <p style="margin:24px 0 0; color:${email_config_1.BRAND.muted}; font-size:13.5px; line-height:1.7;">
        Need to add anything in the meantime? Simply reply to this email and it will reach the
        team directly.
      </p>
    `, 'This is an automated confirmation — no need to reply unless you have something to add.');
const createContactIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const normalizedPayload = normalizeContactPayload(payload);
    if (!normalizedPayload.type || !normalizedPayload.name || !normalizedPayload.email) {
        throw new AppError_1.default(400, 'Enquiry type, name, and email are required');
    }
    yield (0, mongoose_1.connectToDatabase)();
    const contact = yield contact_model_1.Contact.create(normalizedPayload);
    const transporter = (0, email_config_1.createEmailTransporter)();
    if (!transporter) {
        console.warn('CONTACT EMAIL SKIPPED: MAIL_USER / MAIL_PASS not configured in .env');
        return contact;
    }
    try {
        yield transporter.sendMail({
            from: `"${email_config_1.BRAND.name} Website" <${email_config_1.OWNER_EMAIL}>`,
            to: email_config_1.OWNER_EMAIL,
            replyTo: normalizedPayload.email,
            subject: `New ${contact_interface_1.ENQUIRY_TYPE_LABELS[normalizedPayload.type]} Enquiry from ${normalizedPayload.name}`,
            text: [
                'New website enquiry',
                `Type: ${contact_interface_1.ENQUIRY_TYPE_LABELS[normalizedPayload.type]}`,
                `Name: ${normalizedPayload.name}`,
                `Email: ${normalizedPayload.email}`,
                ...Object.entries(normalizedPayload.details || {}).map(([label, value]) => `${label}: ${value}`),
                normalizedPayload.message ? `Message: ${normalizedPayload.message}` : '',
            ]
                .filter(Boolean)
                .join('\n'),
            html: generateAdminEmailTemplate(normalizedPayload),
        });
    }
    catch (err) {
        console.error('OWNER EMAIL FAILURE:', err);
        throw new AppError_1.default(502, 'Your enquiry was saved, but the owner notification email could not be sent. Please contact us directly.');
    }
    try {
        yield transporter.sendMail({
            from: `"${email_config_1.BRAND.name}" <${email_config_1.OWNER_EMAIL}>`,
            to: normalizedPayload.email,
            replyTo: email_config_1.OWNER_EMAIL,
            subject: `Thank you - we received your ${contact_interface_1.ENQUIRY_TYPE_LABELS[normalizedPayload.type]} enquiry`,
            text: `Thank you for contacting ${email_config_1.BRAND.name}. We received your ${contact_interface_1.ENQUIRY_TYPE_LABELS[normalizedPayload.type]} enquiry and will get back to you shortly.`,
            html: generateUserAutoReplyTemplate(normalizedPayload),
        });
    }
    catch (err) {
        console.error('CUSTOMER AUTO-REPLY FAILURE:', err);
    }
    return contact;
});
const getAllContactsFromDB = () => __awaiter(void 0, void 0, void 0, function* () { return contact_model_1.Contact.find().sort({ createdAt: -1 }); });
const getContactByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findById(id);
    if (!contact)
        throw new AppError_1.default(404, 'Contact not found');
    return contact;
});
const updateContactStatusInDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!contact)
        throw new AppError_1.default(404, 'Contact not found');
    return contact;
});
const deleteContactFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield contact_model_1.Contact.findByIdAndDelete(id);
    if (!contact)
        throw new AppError_1.default(404, 'Contact not found');
    return contact;
});
exports.ContactServices = {
    createContactIntoDB,
    getAllContactsFromDB,
    getContactByIdFromDB,
    updateContactStatusInDB,
    deleteContactFromDB,
};
