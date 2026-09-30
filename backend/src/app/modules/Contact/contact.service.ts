/* eslint-disable no-console */
import { Contact } from './contact.model';
import { ENQUIRY_TYPE_LABELS, TCreateContact } from './contact.interface';
import AppError from '../../Errors/AppError';
import { connectToDatabase } from '../../lib/mongoose';
import { BRAND, OWNER_EMAIL, createEmailTransporter } from '../../config/email.config';
import {
  ctaButton,
  detailRow,
  detailTable,
  emailShell,
  escapeHtml,
  messageCallout,
} from '../../lib/emailTemplates';

const normalizeContactPayload = (payload: TCreateContact): TCreateContact => ({
  type: payload.type,
  name: payload.name?.trim(),
  email: payload.email?.trim().toLowerCase(),
  message: payload.message?.trim(),
  details: payload.details,
});

const generateAdminEmailTemplate = (data: TCreateContact): string => {
  const { name, email, message, details } = data;
  const safeMessage = message ? escapeHtml(message).replace(/\r?\n/g, '<br>') : '';

  const rows = [
    detailRow('Enquiry Type', ENQUIRY_TYPE_LABELS[data.type], undefined, 0),
    detailRow('Name', name, undefined, 1),
    detailRow('Email', email, `mailto:${email}`, 2),
    ...Object.entries(details || {})
      .filter(([, value]) => Boolean(value))
      .map(([label, value], i) => detailRow(label, value, undefined, i + 3)),
  ].join('');

  return emailShell(
    `New ${ENQUIRY_TYPE_LABELS[data.type]} Enquiry`,
    'Website Notification',
    `
      <p style="margin:0 0 22px; color:${BRAND.text}; font-size:15px; line-height:1.7;">
        A new enquiry just came in through the website. The details are below — reply directly
        to this email to get back to <strong>${escapeHtml(name)}</strong>.
      </p>
      ${detailTable(rows)}
      ${message ? messageCallout('Message', safeMessage) : ''}
      ${ctaButton(`Reply to ${name}`, `mailto:${email}`)}
    `,
  );
};

const generateUserAutoReplyTemplate = (data: TCreateContact): string =>
  emailShell(
    `Thank you, ${data.name.split(' ')[0]}`,
    'Enquiry Received',
    `
      <p style="margin:0 0 20px; color:${BRAND.text}; font-size:15px; line-height:1.7;">
        Thank you for reaching out to <strong>${BRAND.name}</strong>. Your
        <strong>${ENQUIRY_TYPE_LABELS[data.type]}</strong> enquiry has been received, and the
        team will be in touch shortly.
      </p>
      ${detailTable(detailRow('Enquiry Type', ENQUIRY_TYPE_LABELS[data.type], undefined, 0))}
      <p style="margin:24px 0 0; color:${BRAND.muted}; font-size:13.5px; line-height:1.7;">
        Need to add anything in the meantime? Simply reply to this email and it will reach the
        team directly.
      </p>
    `,
    'This is an automated confirmation — no need to reply unless you have something to add.',
  );

const createContactIntoDB = async (payload: TCreateContact) => {
  const normalizedPayload = normalizeContactPayload(payload);

  if (!normalizedPayload.type || !normalizedPayload.name || !normalizedPayload.email) {
    throw new AppError(400, 'Enquiry type, name, and email are required');
  }

  await connectToDatabase();

  const contact = await Contact.create(normalizedPayload);

  const transporter = createEmailTransporter();

  if (!transporter) {
    console.warn('CONTACT EMAIL SKIPPED: MAIL_USER / MAIL_PASS not configured in .env');
    return contact;
  }

  try {
    await transporter.sendMail({
      from: `"${BRAND.name} Website" <${OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: normalizedPayload.email,
      subject: `ashali.com enquiry: ${normalizedPayload.type === 'impact' ? 'pro-bono' : normalizedPayload.type}`,
      text: [
        'New website enquiry',
        `Type: ${ENQUIRY_TYPE_LABELS[normalizedPayload.type]}`,
        `Name: ${normalizedPayload.name}`,
        `Email: ${normalizedPayload.email}`,
        ...Object.entries(normalizedPayload.details || {}).map(([label, value]) => `${label}: ${value}`),
        normalizedPayload.message ? `Message: ${normalizedPayload.message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      html: generateAdminEmailTemplate(normalizedPayload),
    });
  } catch (err) {
    console.error('OWNER EMAIL FAILURE:', err);
    throw new AppError(
      502,
      'Your enquiry was saved, but the owner notification email could not be sent. Please contact us directly.',
    );
  }

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${OWNER_EMAIL}>`,
      to: normalizedPayload.email,
      replyTo: OWNER_EMAIL,
      subject: `Thank you - we received your ${ENQUIRY_TYPE_LABELS[normalizedPayload.type]} enquiry`,
      text: `Thank you for contacting ${BRAND.name}. We received your ${ENQUIRY_TYPE_LABELS[normalizedPayload.type]} enquiry and will get back to you shortly.`,
      html: generateUserAutoReplyTemplate(normalizedPayload),
    });
  } catch (err) {
    console.error('CUSTOMER AUTO-REPLY FAILURE:', err);
  }

  return contact;
};

const getAllContactsFromDB = async () => Contact.find().sort({ createdAt: -1 });

const getContactByIdFromDB = async (id: string) => {
  const contact = await Contact.findById(id);
  if (!contact) throw new AppError(404, 'Contact not found');
  return contact;
};

const updateContactStatusInDB = async (id: string, status: string) => {
  const contact = await Contact.findByIdAndUpdate(id, { status }, { new: true });
  if (!contact) throw new AppError(404, 'Contact not found');
  return contact;
};

const deleteContactFromDB = async (id: string) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) throw new AppError(404, 'Contact not found');
  return contact;
};

export const ContactServices = {
  createContactIntoDB,
  getAllContactsFromDB,
  getContactByIdFromDB,
  updateContactStatusInDB,
  deleteContactFromDB,
};
