// contact.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.service';
import { HttpStatus } from 'http-status-ts';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.createContactIntoDB(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Thank you! Your enquiry has been submitted. You will receive a confirmation email shortly, and we will contact you soon.',
    data: { id: result._id },
  });
});

// Get all contacts (admin only)
const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactServices.getAllContactsFromDB();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Contacts retrieved successfully',
    data: result,
  });
});

// Get single contact (admin only)
const getContactById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactServices.getContactByIdFromDB(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Contact retrieved successfully',
    data: result,
  });
});

// Update contact status (admin only)
const updateContactStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await ContactServices.updateContactStatusInDB(id, status);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Contact status updated successfully',
    data: result,
  });
});

// Delete contact (admin only)
const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ContactServices.deleteContactFromDB(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Contact deleted successfully',
    data: null,
  });
});

export const ContactControllers = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};