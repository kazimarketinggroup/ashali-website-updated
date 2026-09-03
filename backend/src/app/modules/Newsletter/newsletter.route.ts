// newsletter.route.ts
import { Router } from 'express';
import { NewsletterControllers } from './newsletter.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import NewsletterValidation from './newsletter.validation';

const router = Router();

// Public routes
router.post(
  '/subscribe',
  validateRequest(NewsletterValidation.SubscribeSchema),
  NewsletterControllers.subscribe,
);
router.post('/unsubscribe', NewsletterControllers.unsubscribe);

// Admin routes - require authentication
router.get('/', auth(), NewsletterControllers.getAllSubscribers);
router.delete('/:id', auth(), NewsletterControllers.deleteSubscriber);

export const NewsletterRoutes = router;
