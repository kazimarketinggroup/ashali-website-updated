// contact.interface.ts

export type TEnquiryType = 'speaking' | 'advisory' | 'impact' | 'media' | 'sea';

export const ENQUIRY_TYPE_LABELS: Record<TEnquiryType, string> = {
  speaking: 'Speaking / Keynote',
  advisory: 'Advisory',
  impact: 'Impact',
  media: 'Media / Podcast',
  sea: 'Malaysia & SEA',
};

export type TCreateContact = {
  type: TEnquiryType;
  name: string;
  email: string;
  message?: string;
  details?: Record<string, string>;
};

export type TContact = TCreateContact & {
  status: 'pending' | 'contacted' | 'resolved';
  createdAt?: Date;
};
