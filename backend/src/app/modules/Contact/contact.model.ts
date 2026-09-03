// contact.model.ts
import { model, Schema } from 'mongoose';
import { TContact } from './contact.interface';

const contactSchema = new Schema<TContact>(
  {
    type: {
      type: String,
      required: [true, 'Enquiry type is required'],
      enum: ['speaking', 'advisory', 'impact', 'media', 'sea'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      trim: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'resolved'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Contact = model<TContact>('Contact', contactSchema);
