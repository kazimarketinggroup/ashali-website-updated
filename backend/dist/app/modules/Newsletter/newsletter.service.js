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
exports.NewsletterServices = void 0;
/* eslint-disable no-console */
const newsletter_model_1 = require("./newsletter.model");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const mongoose_1 = require("../../lib/mongoose");
const email_config_1 = require("../../config/email.config");
const emailTemplates_1 = require("../../lib/emailTemplates");
const generateSubscriberEmailTemplate = (data) => (0, emailTemplates_1.emailShell)(`Welcome${data.name ? `, ${data.name.split(' ')[0]}` : ''}!`, 'Subscription Confirmed', `
      <p style="margin:0 0 20px; color:${email_config_1.BRAND.text}; font-size:15px; line-height:1.7;">
        Thank you for subscribing to the <strong>${email_config_1.BRAND.name}</strong> newsletter. You'll now be
        the first to hear about new talks, advisory openings, the book, and other updates —
        straight to your inbox.
      </p>
      ${(0, emailTemplates_1.ctaButton)('Explore the Website', email_config_1.SITE_URL)}
      <p style="margin:24px 0 0; color:${email_config_1.BRAND.muted}; font-size:13.5px; line-height:1.7;">
        Didn't request this? You can safely ignore this email — you won't be added without
        confirmation.
      </p>
    `, 'You can unsubscribe at any time from any future newsletter email.');
const generateOwnerEmailTemplate = (data) => (0, emailTemplates_1.emailShell)('New Newsletter Subscriber', 'Website Notification', `
      <p style="margin:0 0 22px; color:${email_config_1.BRAND.text}; font-size:15px; line-height:1.7;">
        Someone new just subscribed to the newsletter from the website footer.
      </p>
      ${(0, emailTemplates_1.detailTable)([
    (0, emailTemplates_1.detailRow)('Name', data.name || '—', undefined, 0),
    (0, emailTemplates_1.detailRow)('Email', data.email, `mailto:${data.email}`, 1),
].join(''))}
    `);
const subscribeToNewsletter = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const name = (_a = payload.name) === null || _a === void 0 ? void 0 : _a.trim();
    const email = (_b = payload.email) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase();
    if (!email) {
        throw new AppError_1.default(400, 'Email is required');
    }
    yield (0, mongoose_1.connectToDatabase)();
    const existing = yield newsletter_model_1.Newsletter.findOne({ email });
    if (existing && existing.status === 'subscribed') {
        throw new AppError_1.default(409, 'This email is already subscribed to our newsletter.');
    }
    const subscriber = existing
        ? ((_c = (yield newsletter_model_1.Newsletter.findOneAndUpdate({ email }, { name: name || existing.name, status: 'subscribed' }, { new: true }))) !== null && _c !== void 0 ? _c : existing)
        : yield newsletter_model_1.Newsletter.create({ name, email, status: 'subscribed' });
    const transporter = (0, email_config_1.createEmailTransporter)();
    if (!transporter) {
        console.warn('NEWSLETTER EMAIL SKIPPED: MAIL_USER / MAIL_PASS not configured in .env');
        return subscriber;
    }
    try {
        yield transporter.sendMail({
            from: `"${email_config_1.BRAND.name}" <${email_config_1.OWNER_EMAIL}>`,
            to: email,
            replyTo: email_config_1.OWNER_EMAIL,
            subject: `Welcome to the ${email_config_1.BRAND.name} newsletter`,
            text: `Thank you for subscribing to ${email_config_1.BRAND.name}'s newsletter.`,
            html: generateSubscriberEmailTemplate({ name, email }),
        });
    }
    catch (err) {
        console.error('SUBSCRIBER EMAIL FAILURE:', err);
    }
    try {
        yield transporter.sendMail({
            from: `"${email_config_1.BRAND.name} Website" <${email_config_1.OWNER_EMAIL}>`,
            to: email_config_1.OWNER_EMAIL,
            subject: `New newsletter subscriber: ${email}`,
            text: `New newsletter subscriber\nName: ${name || '-'}\nEmail: ${email}`,
            html: generateOwnerEmailTemplate({ name, email }),
        });
    }
    catch (err) {
        console.error('OWNER NEWSLETTER NOTIFICATION FAILURE:', err);
    }
    return subscriber;
});
const getAllSubscribersFromDB = () => __awaiter(void 0, void 0, void 0, function* () { return newsletter_model_1.Newsletter.find().sort({ createdAt: -1 }); });
const unsubscribeFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = yield newsletter_model_1.Newsletter.findOneAndUpdate({ email: email.trim().toLowerCase() }, { status: 'unsubscribed' }, { new: true });
    if (!subscriber)
        throw new AppError_1.default(404, 'Subscriber not found');
    return subscriber;
});
const deleteSubscriberFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const subscriber = yield newsletter_model_1.Newsletter.findByIdAndDelete(id);
    if (!subscriber)
        throw new AppError_1.default(404, 'Subscriber not found');
    return subscriber;
});
exports.NewsletterServices = {
    subscribeToNewsletter,
    getAllSubscribersFromDB,
    unsubscribeFromDB,
    deleteSubscriberFromDB,
};
