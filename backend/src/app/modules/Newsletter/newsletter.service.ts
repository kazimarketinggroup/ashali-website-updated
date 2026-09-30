/* eslint-disable no-console */
import { Newsletter } from './newsletter.model';
import { TCreateNewsletter } from './newsletter.interface';
import AppError from '../../Errors/AppError';
import { connectToDatabase } from '../../lib/mongoose';
import { BRAND, OWNER_EMAIL, SITE_URL, createEmailTransporter } from '../../config/email.config';
import { ctaButton, detailRow, detailTable, emailShell } from '../../lib/emailTemplates';

const generateSubscriberEmailTemplate = (data: TCreateNewsletter): string =>
  emailShell(
    `Welcome${data.name ? `, ${data.name.split(' ')[0]}` : ''}!`,
    'Subscription Confirmed',
    `
      <p style="margin:0 0 20px; color:${BRAND.text}; font-size:15px; line-height:1.7;">
        Thank you for subscribing to the <strong>${BRAND.name}</strong> newsletter. You'll now be
        the first to hear about new talks, advisory openings, the book, and other updates —
        straight to your inbox.
      </p>
      ${ctaButton('Explore the Website', SITE_URL)}
      <p style="margin:24px 0 0; color:${BRAND.muted}; font-size:13.5px; line-height:1.7;">
        Didn't request this? You can safely ignore this email — you won't be added without
        confirmation.
      </p>
    `,
    'You can unsubscribe at any time from any future newsletter email.',
  );

const generateOwnerEmailTemplate = (data: TCreateNewsletter): string =>
  emailShell(
    'New Newsletter Subscriber',
    'Website Notification',
    `
      <p style="margin:0 0 22px; color:${BRAND.text}; font-size:15px; line-height:1.7;">
        Someone new just subscribed to the newsletter from the website footer.
      </p>
      ${detailTable(
        [
          detailRow('Name', data.name || '—', undefined, 0),
          detailRow('Email', data.email, `mailto:${data.email}`, 1),
        ].join(''),
      )}
    `,
  );

const subscribeToNewsletter = async (payload: TCreateNewsletter) => {
  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();

  if (!email) {
    throw new AppError(400, 'Email is required');
  }

  await connectToDatabase();

  const existing = await Newsletter.findOne({ email });

  if (existing && existing.status === 'subscribed') {
    throw new AppError(409, 'This email is already subscribed to our newsletter.');
  }

  const subscriber = existing
    ? ((await Newsletter.findOneAndUpdate(
        { email },
        { name: name || existing.name, status: 'subscribed' },
        { new: true },
      )) ?? existing)
    : await Newsletter.create({ name, email, status: 'subscribed' });

  const transporter = createEmailTransporter();

  if (!transporter) {
    console.warn('NEWSLETTER EMAIL SKIPPED: MAIL_USER / MAIL_PASS not configured in .env');
    return subscriber;
  }

  try {
    await transporter.sendMail({
      from: `"${BRAND.name}" <${OWNER_EMAIL}>`,
      to: email,
      replyTo: OWNER_EMAIL,
      subject: `Welcome to the ${BRAND.name} newsletter`,
      text: `Thank you for subscribing to ${BRAND.name}'s newsletter.`,
      html: generateSubscriberEmailTemplate({ name, email }),
    });
  } catch (err) {
    console.error('SUBSCRIBER EMAIL FAILURE:', err);
  }

  try {
    await transporter.sendMail({
      from: `"${BRAND.name} Website" <${OWNER_EMAIL}>`,
      to: OWNER_EMAIL,
      subject: 'ashali.com enquiry: newsletter signup',
      text: `New newsletter subscriber\nName: ${name || '-'}\nEmail: ${email}`,
      html: generateOwnerEmailTemplate({ name, email }),
    });
  } catch (err) {
    console.error('OWNER NEWSLETTER NOTIFICATION FAILURE:', err);
  }

  return subscriber;
};

const getAllSubscribersFromDB = async () => Newsletter.find().sort({ createdAt: -1 });

const unsubscribeFromDB = async (email: string) => {
  const subscriber = await Newsletter.findOneAndUpdate(
    { email: email.trim().toLowerCase() },
    { status: 'unsubscribed' },
    { new: true },
  );
  if (!subscriber) throw new AppError(404, 'Subscriber not found');
  return subscriber;
};

const deleteSubscriberFromDB = async (id: string) => {
  const subscriber = await Newsletter.findByIdAndDelete(id);
  if (!subscriber) throw new AppError(404, 'Subscriber not found');
  return subscriber;
};

export const NewsletterServices = {
  subscribeToNewsletter,
  getAllSubscribersFromDB,
  unsubscribeFromDB,
  deleteSubscriberFromDB,
};
