import { BRAND, SITE_URL } from '../config/email.config';

export const escapeHtml = (value?: string) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const formatSubmittedAt = () =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  }).format(new Date());

/** Thin two-tone accent bar (orange -> teal) — renders reliably across email clients via table-cell backgrounds */
const gradientBar = (height = 4) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;">
    <tr>
      <td width="50%" style="height:${height}px; background-color:${BRAND.orange}; line-height:${height}px; font-size:1px;">&nbsp;</td>
      <td width="50%" style="height:${height}px; background-color:${BRAND.teal}; line-height:${height}px; font-size:1px;">&nbsp;</td>
    </tr>
  </table>
`;

export const detailRow = (label: string, value?: string, href?: string, index = 0) => {
  if (!value) return '';

  const safeValue = escapeHtml(value);
  const content = href
    ? `<a href="${escapeHtml(href)}" style="color:${BRAND.text}; text-decoration:none; font-weight:600;">${safeValue}</a>`
    : safeValue;
  const rowBg = index % 2 === 0 ? '#ffffff' : BRAND.surface;

  return `
    <tr style="background-color:${rowBg};">
      <td style="padding:13px 18px; color:${BRAND.muted}; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; width:170px; vertical-align:top; border-bottom:1px solid ${BRAND.border};">${escapeHtml(label)}</td>
      <td style="padding:13px 18px; color:${BRAND.text}; font-size:14.5px; vertical-align:top; border-bottom:1px solid ${BRAND.border};">${content}</td>
    </tr>
  `;
};

export const detailTable = (rows: string) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse; border:1px solid ${BRAND.border}; border-radius:8px; overflow:hidden;">
    ${rows}
  </table>
`;

export const messageCallout = (label: string, html: string) => `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:24px;">
    <tr>
      <td style="background-color:${BRAND.surface}; border-left:3px solid ${BRAND.orange}; border-radius:0 8px 8px 0; padding:18px 22px;">
        <p style="margin:0 0 8px; color:${BRAND.orange}; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase;">${escapeHtml(label)}</p>
        <p style="margin:0; color:${BRAND.text}; font-size:14.5px; line-height:1.7;">${html}</p>
      </td>
    </tr>
  </table>
`;

export const ctaButton = (label: string, href: string) => `
  <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:28px;">
    <tr>
      <td style="border-radius:6px; background-color:${BRAND.orange};">
        <a href="${escapeHtml(href)}" style="display:inline-block; padding:13px 30px; color:#ffffff; font-size:12.5px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; text-decoration:none;">
          ${escapeHtml(label)} &rarr;
        </a>
      </td>
    </tr>
  </table>
`;

export const emailShell = (
  title: string,
  eyebrow: string,
  bodyHtml: string,
  footerNote?: string,
) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BRAND.surface}; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${BRAND.surface}; padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background-color:${BRAND.card}; border-radius:12px; overflow:hidden; border:1px solid ${BRAND.border};">

            <!-- Accent bar -->
            <tr><td>${gradientBar(4)}</td></tr>

            <!-- Header -->
            <tr>
              <td style="background-color:${BRAND.ink}; padding:36px 40px 30px;">
                <p style="margin:0 0 18px; color:#ffffff; font-size:15px; font-weight:800; letter-spacing:0.18em;">
                  ASH<span style="color:${BRAND.orange};">&nbsp;ALI</span>
                </p>
                <p style="margin:0 0 8px; color:${BRAND.teal}; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
                <h1 style="margin:0; color:#ffffff; font-size:25px; line-height:1.35; font-weight:700;">${escapeHtml(title)}</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:36px 40px 8px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- Spacer -->
            <tr><td style="height:8px; line-height:8px; font-size:1px;">&nbsp;</td></tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:${BRAND.ink}; padding:26px 40px;">
                <p style="margin:0 0 4px; color:#ffffff; font-size:13px; font-weight:700; letter-spacing:0.04em;">${BRAND.name}</p>
                <p style="margin:0 0 14px; color:#9ca3af; font-size:12px; line-height:1.6;">${escapeHtml(BRAND.tagline)}</p>
                <p style="margin:0; color:#6b7280; font-size:11px; line-height:1.7;">
                  ${footerNote ? `${escapeHtml(footerNote)}<br>` : ''}
                  Submitted ${formatSubmittedAt()} (UK time) &middot; <a href="${escapeHtml(SITE_URL)}" style="color:#9ca3af; text-decoration:underline;">${escapeHtml(SITE_URL.replace(/^https?:\/\//, ''))}</a>
                </p>
              </td>
            </tr>
          </table>

          <p style="max-width:600px; margin:18px 0 0; color:#9ca3af; font-size:11px; line-height:1.6; text-align:center;">
            &copy; ${new Date().getFullYear()} ${escapeHtml(BRAND.name)}. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
