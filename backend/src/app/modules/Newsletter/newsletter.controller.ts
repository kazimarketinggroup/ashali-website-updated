// newsletter.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NewsletterServices } from './newsletter.service';
import { HttpStatus } from 'http-status-ts';

const subscribe = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsletterServices.subscribeToNewsletter(req.body);

  sendResponse(res, {
    statusCode: HttpStatus.CREATED,
    success: true,
    message: 'Thank you for subscribing! Please check your inbox for a confirmation email.',
    data: { id: result._id },
  });
});

// Get all subscribers (admin only)
const getAllSubscribers = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsletterServices.getAllSubscribersFromDB();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Subscribers retrieved successfully',
    data: result,
  });
});

const unsubscribe = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await NewsletterServices.unsubscribeFromDB(email);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'You have been unsubscribed successfully',
    data: result,
  });
});

// Delete subscriber (admin only)
const deleteSubscriber = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await NewsletterServices.deleteSubscriberFromDB(id);

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Subscriber deleted successfully',
    data: null,
  });
});

export const NewsletterControllers = {
  subscribe,
  getAllSubscribers,
  unsubscribe,
  deleteSubscriber,
};
