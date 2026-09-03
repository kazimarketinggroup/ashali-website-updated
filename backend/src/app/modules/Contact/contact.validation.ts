import { z } from 'zod';

const CreateContactSchema = z.object({
  body: z.object({
    type: z.enum(['speaking', 'advisory', 'impact', 'media', 'sea'], {
      message: 'A valid enquiry type is required',
    }),
    name: z
      .string()
      .nonempty('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(120, 'Name must be at most 120 characters'),
    email: z.string().nonempty('Email is required').email('Invalid email format'),
    message: z.string().max(4000).optional(),
    details: z.record(z.string(), z.string()).optional(),
  }),
});

const ContactValidation = { CreateContactSchema };

export default ContactValidation;

export type TCreateContactInput = z.infer<typeof CreateContactSchema>['body'];
