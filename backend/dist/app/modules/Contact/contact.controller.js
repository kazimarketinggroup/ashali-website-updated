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
exports.ContactControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const contact_service_1 = require("./contact.service");
const http_status_ts_1 = require("http-status-ts");
const createContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_service_1.ContactServices.createContactIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.CREATED,
        success: true,
        message: 'Thank you! Your enquiry has been submitted. You will receive a confirmation email shortly, and we will contact you soon.',
        data: { id: result._id },
    });
}));
// Get all contacts (admin only)
const getAllContacts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_service_1.ContactServices.getAllContactsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Contacts retrieved successfully',
        data: result,
    });
}));
// Get single contact (admin only)
const getContactById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield contact_service_1.ContactServices.getContactByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Contact retrieved successfully',
        data: result,
    });
}));
// Update contact status (admin only)
const updateContactStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    const result = yield contact_service_1.ContactServices.updateContactStatusInDB(id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Contact status updated successfully',
        data: result,
    });
}));
// Delete contact (admin only)
const deleteContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield contact_service_1.ContactServices.deleteContactFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_ts_1.HttpStatus.OK,
        success: true,
        message: 'Contact deleted successfully',
        data: null,
    });
}));
exports.ContactControllers = {
    createContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
};
