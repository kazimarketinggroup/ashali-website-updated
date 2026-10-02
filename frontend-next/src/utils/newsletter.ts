/**
 * Newsletter integration supporting Kit (ConvertKit), Beehiiv, and Mailchimp with double opt-in.
 */

interface SubscriberData {
  email: string;
  name?: string;
}

export async function subscribeToNewsletterPlatform({
  email,
  name,
}: SubscriberData): Promise<{ synced: boolean; provider?: string }> {
  // 1. Kit (ConvertKit)
  const kitApiKey = process.env.KIT_API_KEY || process.env.CONVERTKIT_API_KEY;
  const kitFormId = process.env.KIT_FORM_ID || process.env.CONVERTKIT_FORM_ID;

  if (kitApiKey && kitFormId) {
    try {
      const res = await fetch(`https://api.convertkit.com/v3/forms/${kitFormId}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: kitApiKey,
          email,
          first_name: name || undefined,
        }),
      });
      if (res.ok) {
        return { synced: true, provider: "Kit" };
      }
    } catch (e) {
      console.error("Kit subscription failed:", e);
    }
  }

  // 2. Beehiiv
  const beehiivApiKey = process.env.BEEHIIV_API_KEY;
  const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (beehiivApiKey && beehiivPubId) {
    try {
      const res = await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${beehiivApiKey}`,
        },
        body: JSON.stringify({
          email,
          double_opt_in: true,
          send_welcome_email: true,
        }),
      });
      if (res.ok) {
        return { synced: true, provider: "Beehiiv" };
      }
    } catch (e) {
      console.error("Beehiiv subscription failed:", e);
    }
  }

  // 3. Mailchimp
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
  const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX || "us1";

  if (mailchimpApiKey && mailchimpAudienceId) {
    try {
      const res = await fetch(
        `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${mailchimpApiKey}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "pending", // "pending" triggers double opt-in confirmation email
            merge_fields: name ? { FNAME: name } : undefined,
          }),
        }
      );
      if (res.ok) {
        return { synced: true, provider: "Mailchimp" };
      }
    } catch (e) {
      console.error("Mailchimp subscription failed:", e);
    }
  }

  return { synced: false };
}
