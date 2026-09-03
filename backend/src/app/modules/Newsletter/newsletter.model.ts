// newsletter.model.ts
import { model, Schema } from 'mongoose';
import { TNewsletter } from './newsletter.interface';

const newsletterSchema = new Schema<TNewsletter>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed'],
      default: 'subscribed',
    },
  },
  {
    timestamps: true,
  },
);

export const Newsletter = model<TNewsletter>('Newsletter', newsletterSchema);
