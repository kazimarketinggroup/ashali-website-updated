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
exports.NewsletterControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const newsletter_service_1 = require("./newsletter.service");
const http_status_ts_1 = require("http-status-ts");
const subscribe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield newsletter_service_1.NewsletterServices.subscribeToNewsletter(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'Thank you for subscribing! Please check your inbox for a confirmation email.',
        data: { id: result._id },
    });
}));
// Get all subscribers (admin only)
const getAllSubscribers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield newsletter_service_1.NewsletterServices.getAllSubscribersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Subscribers retrieved successfully',
        data: result,
    });
}));
const unsubscribe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield newsletter_service_1.NewsletterServices.unsubscribeFromDB(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'You have been unsubscribed successfully',
        data: result,
    });
}));
// Delete subscriber (admin only)
const deleteSubscriber = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield newsletter_service_1.NewsletterServices.deleteSubscriberFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Subscriber deleted successfully',
        data: null,
    });
}));
exports.NewsletterControllers = {
    subscribe,
    getAllSubscribers,
    unsubscribe,
    deleteSubscriber,
};
