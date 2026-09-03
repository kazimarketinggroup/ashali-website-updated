import { z } from 'zod';

const SubscribeSchema = z.object({
  body: z.object({
    name: z.string().max(120).optional(),
    email: z.string().nonempty('Email is required').email('Invalid email format'),
  }),
});

const NewsletterValidation = { SubscribeSchema };

export default NewsletterValidation;

export type TSubscribeInput = z.infer<typeof SubscribeSchema>['body'];
