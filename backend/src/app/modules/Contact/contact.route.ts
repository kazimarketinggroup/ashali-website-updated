// contact.routes.ts
import { Router } from 'express';
import { ContactControllers } from './contact.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import ContactValidation from './contact.validation';

const router = Router();

// Public route - anyone can submit contact form
router.post(
  '/submit',
  validateRequest(ContactValidation.CreateContactSchema),
  ContactControllers.createContact,
);

// Admin routes - require authentication
router.get('/', auth(), ContactControllers.getAllContacts);
router.get('/:id', auth(), ContactControllers.getContactById);
router.patch('/:id/status', auth(), ContactControllers.updateContactStatus);
router.delete('/:id', auth(), ContactControllers.deleteContact);

export const ContactRoutes = router;