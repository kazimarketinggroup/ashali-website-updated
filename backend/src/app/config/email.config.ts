import nodemailer from 'nodemailer';
import config from './index';

export const BRAND = {
  name: 'Ash Ali',
  tagline: 'Entrepreneur · Speaker · Author of The Unfair Advantage',
  // Core site palette — matches the black / orange→teal brand identity used across ashali.com
  ink: '#0a0a0a',
  panel: '#161616',
  card: '#ffffff',
  text: '#1f2430',
  muted: '#6b7280',
  border: '#e9eaec',
  surface: '#f4f5f7',
  orange: '#FF781D',
  teal: '#008080',
  gradient: 'linear-gradient(90deg, #FF781D 0%, #008080 100%)',
};

export const SITE_URL = config.frontend_url || 'https://ashali.com';

export const OWNER_EMAIL = config.contact_owner_email || config.mail_user || '';

export const getMailCredentials = () => {
  const user = config.mail_user;
  const pass = config.mail_pass;

  if (!user || !pass) {
    return null;
  }

  return { user, pass };
};

export const createEmailTransporter = () => {
  const credentials = getMailCredentials();

  if (!credentials) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: credentials,
  });
};
