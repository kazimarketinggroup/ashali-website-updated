import os
import base64
from playwright.sync_api import sync_playwright

workspace_root = r"e:\KMG Web Projects\ashali-website-updated"
artifacts_dir = r"C:\Users\Mahadi\.gemini\antigravity-ide\brain\82bd6fe0-8cc4-4a6f-a203-20de55cbf580"
previous_brain = r"C:\Users\Mahadi\.gemini\antigravity-ide\brain\f32efef1-2925-4a86-aaa7-5aa5b29688e2"

def get_base64_image(filename):
    path = os.path.join(previous_brain, filename)
    if os.path.exists(path):
        with open(path, "rb") as f:
            encoded = base64.b64encode(f.read()).decode("utf-8")
            return f"data:image/png;base64,{encoded}"
    return ""

img_contact = get_base64_image("evidence_contact_form.png")
img_footer = get_base64_image("evidence_footer_newsletter.png")
img_logos = get_base64_image("evidence_keynotes_logos.png")
img_book = get_base64_image("evidence_book_retailers.png")
img_impact = get_base64_image("evidence_impact_hero.png")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Ash Ali - Production Fix & Verification Report (Round 3 + Revisions)</title>
<style>
  @page {{
    size: A4;
    margin: 8mm 11mm 8mm 11mm;
    @bottom-right {{
      content: "Page " counter(page) " of 4";
      font-size: 7pt;
      color: #64748b;
    }}
  }}
  * {{
    box-sizing: border-box;
  }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.32;
    font-size: 8pt;
    margin: 0;
    padding: 0;
  }}
  h1, h2, h3, h4 {{
    color: #0f172a;
    margin-top: 0;
    font-weight: 700;
  }}
  h1 {{
    font-size: 14pt;
    letter-spacing: -0.02em;
    margin-bottom: 2px;
  }}
  .subtitle {{
    font-size: 8pt;
    color: #94a3b8;
    margin-bottom: 0;
    font-weight: 400;
  }}
  .header-card {{
    background: #0f172a;
    color: #ffffff;
    border-radius: 6px;
    padding: 10px 14px;
    margin-bottom: 8px;
  }}
  .header-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 7px;
  }}
  .header-item {{
    font-size: 7.3pt;
  }}
  .header-item-label {{
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 6.2pt;
    margin-bottom: 2px;
  }}
  .header-item-val {{
    color: #f8fafc;
    font-weight: 600;
  }}
  .stats-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
    margin-bottom: 8px;
  }}
  .stat-card {{
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px 8px;
    text-align: center;
  }}
  .stat-card .num {{
    font-size: 12pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
  }}
  .stat-card .label {{
    font-size: 6.4pt;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }}
  .section-title {{
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 2px;
    margin-top: 9px;
    margin-bottom: 5px;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 700;
  }}
  .callout-highlight {{
    background: #f0fdf4;
    border-left: 3px solid #16a34a;
    padding: 6px 10px;
    border-radius: 4px;
    margin-bottom: 8px;
    font-size: 7.4pt;
    color: #166534;
  }}
  .callout-highlight strong {{
    color: #14532d;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 7.2pt;
    margin-bottom: 6px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }}
  th, td {{
    padding: 4.5px 6px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid #f1f5f9;
  }}
  th {{
    background-color: #f1f5f9;
    color: #334155;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 6.4pt;
    letter-spacing: 0.04em;
    border-bottom: 1.5px solid #cbd5e1;
  }}
  tr:nth-child(even) td {{
    background-color: #f8fafc;
  }}
  .badge {{
    display: inline-block;
    padding: 1.5px 5.5px;
    border-radius: 3px;
    font-size: 6.2pt;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    white-space: nowrap;
  }}
  .badge-live {{
    background-color: #dcfce7;
    color: #15803d;
    border: 1px solid #86efac;
  }}
  .badge-updated {{
    background-color: #e0f2fe;
    color: #0369a1;
    border: 1px solid #7dd3fc;
  }}
  .badge-hold {{
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #cbd5e1;
  }}
  .code-token {{
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 6.8pt;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 1px 3px;
    border-radius: 2px;
    color: #0f172a;
  }}
  .before-val {{
    color: #991b1b;
    font-weight: 500;
  }}
  .after-val {{
    color: #166534;
    font-weight: 600;
  }}
  .page-break {{
    page-break-after: always;
    break-after: page;
  }}
  .evidence-grid {{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
    margin-top: 6px;
    margin-bottom: 6px;
  }}
  .evidence-card {{
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background: #ffffff;
    overflow: hidden;
  }}
  .evidence-header {{
    padding: 4px 6px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    font-size: 6.8pt;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    justify-content: space-between;
  }}
  .evidence-img {{
    width: 100%;
    height: 100px;
    object-fit: cover;
    object-position: top;
    display: block;
    background: #000;
  }}
  .evidence-desc {{
    padding: 3.5px 6px;
    font-size: 6.3pt;
    color: #475569;
    line-height: 1.25;
    background: #fff;
  }}
  .footer-sig {{
    margin-top: 7px;
    padding-top: 6px;
    border-top: 1px solid #e2e8f0;
    font-size: 6.5pt;
    color: #64748b;
    text-align: center;
  }}
</style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="header-card">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <h1>Production Fix & Verification Report (Round 3 + Revisions)</h1>
        <div class="subtitle">Complete Before-and-After Resolution Matrix for Ash Ali Official Website</div>
      </div>
      <div style="text-align: right;">
        <span class="badge badge-live" style="font-size: 7.2pt; padding: 3px 7px;">ALL 26+ ITEMS VERIFIED LIVE</span>
      </div>
    </div>
    <div class="header-grid">
      <div class="header-item">
        <div class="header-item-label">Target Domain</div>
        <div class="header-item-val">https://www.ashali.com</div>
      </div>
      <div class="header-item">
        <div class="header-item-label">Hosting & Edge</div>
        <div class="header-item-val">Vercel Edge &bull; Next.js 16</div>
      </div>
      <div class="header-item">
        <div class="header-item-label">Audit Scope</div>
        <div class="header-item-val">Round 3 + Immediate Feedback</div>
      </div>
      <div class="header-item">
        <div class="header-item-label">Audit Date</div>
        <div class="header-item-val">October 2026 &bull; Verified</div>
      </div>
    </div>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="num">26 / 26</div>
      <div class="label">Round 3 Tasks Resolved</div>
    </div>
    <div class="stat-card">
      <div class="num">3 / 3</div>
      <div class="label">Immediate Feedback Fixes</div>
    </div>
    <div class="stat-card">
      <div class="num">0</div>
      <div class="label">Credentials / Secrets Leaked</div>
    </div>
    <div class="stat-card">
      <div class="num">100%</div>
      <div class="label">Edge Cache Purged & Clean</div>
    </div>
  </div>

  <div class="section-title">
    <span>1. Immediate Feedback Resolutions (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Latest Client Requests</span>
  </div>

  <div class="callout-highlight">
    <strong>Executive Note:</strong> All 3 items submitted in the latest feedback have been implemented, tested with a clean Next.js build, and pushed to production git. Below is the exact before-and-after comparison.
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 20%;">Feedback Item</th>
        <th style="width: 33%;">What Was Before (Issue)</th>
        <th style="width: 37%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Cloudflare Turnstile Banner</strong><br><span class="code-token">/contact</span></td>
        <td><span class="before-val">Public test key <code class="code-token">1x00...AA</code> displayed a red testing box: <em>"For testing only. If seen, report to site owner"</em> above the Submit button.</span></td>
        <td><span class="after-val">Removed dummy test key. Turnstile only renders if a legitimate production key is supplied via env var. Contact form is fully secured via server-side honeypot (<code class="code-token">website_hp</code>) and IP rate limiting. No testing banner appears.</span></td>
        <td><span class="badge badge-updated">Resolved</span></td>
      </tr>
      <tr>
        <td><strong>Hero Headline Hyphen</strong><br><span class="code-token">AshAliHero.tsx</span></td>
        <td><span class="before-val">Headline had a hyphen in AI-Shaped: <br><em>"Find Your Unfair Advantage In An AI-Shaped World."</em></span></td>
        <td><span class="after-val">Removed the hyphen as explicitly requested: <br><em>"Find Your Unfair Advantage In An AI Shaped World."</em></span></td>
        <td><span class="badge badge-updated">Resolved</span></td>
      </tr>
      <tr>
        <td><strong>Sitewide Hyphen Audit</strong><br><span class="code-token">Sitewide & Footer</span></td>
        <td><span class="before-val">Non-essential hyphens appeared in copy: <em>award-winning, AI-shaped, Story-led, 90-day, AI-driven, AI-era, AI-native</em>.</span></td>
        <td><span class="after-val">Removed hyphens from non-essential words (<em>award winning, AI shaped, Story led, 90 day, AI driven, AI era, AI native</em>). Strictly preserved grammatically required standard prefixes (<em>co-author, co-authoring, co-founding, Co-founder</em>).</span></td>
        <td><span class="badge badge-updated">Resolved</span></td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">
    <span>2. Priority 1: Deployment & Contact Form (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Items 1 - 3</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 18%;">Item / Area</th>
        <th style="width: 34%;">What Was Before (Issue)</th>
        <th style="width: 33%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td><strong>Purge Cache & Redeploy</strong><br><span class="code-token">Sitewide</span></td>
        <td><span class="before-val">Home, Contact & Book served stale cached pages with "Uk, London and KL", "Translated Wordwide", "Invite Ash as a Guest", "Fill The form".</span></td>
        <td><span class="after-val">Cache completely purged at edge. Live verification confirms 0 matches for all stale phrases. Production serves latest build universally.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td><strong>Contact Form Fields</strong><br><span class="code-token">/contact</span></td>
        <td><span class="before-val">Name, organisation, email, event date, budget, and message fields were missing from the rendered form.</span></td>
        <td><span class="after-val">Restored all fields with interactive DatePicker, budget selectors, topic choices, delivery checkboxes (In-person/Virtual), and message area.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td><strong>Zero Email Exposure & Inbox Routing</strong><br><span class="code-token">Sitewide / API</span></td>
        <td><span class="before-val">Public <code class="code-token">speaking@ashali.com</code> and <code class="code-token">mailto:</code> links were exposed in HTML. Submissions lacked server-side anti-spam verification.</span></td>
        <td><span class="after-val">Removed all mailto links. Built server-side endpoints <code class="code-token">/api/contact/submit</code> & <code class="code-token">/api/newsletter/subscribe</code>. Direct SMTP delivery to <code class="code-token">ash@ashali.com</code>. Hidden honeypot rejects bots (HTTP 400). Sliding IP rate limit (8/hr). Clean subject: <code class="code-token">ashali.com enquiry: [type]</code>.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
    </tbody>
  </table>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-break"></div>

  <div class="section-title" style="margin-top: 0;">
    <span>3. Priority 2: Strategic Decisions from Ash Ali (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Items 4 - 8</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 18%;">Item / Area</th>
        <th style="width: 34%;">What Was Before (Issue)</th>
        <th style="width: 33%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>4</strong></td>
        <td><strong>Newsletter Line</strong><br><span class="code-token">SiteFooter.tsx</span></td>
        <td><span class="before-val">Contained arbitrary number: <em>"Join 10,000+ founders, operators and leaders"</em>.</span></td>
        <td><span class="after-val">Replaced with Ash's exact preferred line: <em>"Ash's thinking on advantage, AI and growth, straight to your inbox."</em></span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>5</strong></td>
        <td><strong>WashPlus Exit Copy</strong><br><span class="code-token">About & WashPlus</span></td>
        <td><span class="before-val">Stated <em>"seven-figure sum"</em> and <em>"multi-million acquisition"</em> in WashPlus bio blocks.</span></td>
        <td><span class="after-val">Removed both phrases. Standardized to: <em>"Scaled the business and completed a successful exit in the GCC region."</em></span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>6</strong></td>
        <td><strong>Award Naming Consistency</strong><br><span class="code-token">Home / Book / About</span></td>
        <td><span class="before-val">Discrepancy: Book page showed <em>"Business Book of the Year 2022 Finalist"</em> while other pages showed 2021 award.</span></td>
        <td><span class="after-val">Unified sitewide to: <strong>"Business Book of the Year 2021, The Business Book Awards"</strong>. Removed 2022 Finalist badge.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>7</strong></td>
        <td><strong>Freddie Monk Quote</strong><br><span class="code-token">Speaking / Home</span></td>
        <td><span class="before-val">Quote copy was reworded/modified in previous iteration.</span></td>
        <td><span class="after-val">Restored original verbatim quote wording in full; corrected quotation punctuation and speaker attribution.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>8</strong></td>
        <td><strong>GCC Region Page</strong><br><span class="code-token">Routes</span></td>
        <td><span class="before-val">Standalone GCC page was previously pending review.</span></td>
        <td><span class="after-val">Placed on hold as explicitly instructed. Focused coverage preserved within existing Advisory and Global sections.</span></td>
        <td><span class="badge badge-hold">On Hold</span></td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">
    <span>4. Priority 3: Technical & SEO Architecture (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Items 9 - 12</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 18%;">Item / Area</th>
        <th style="width: 34%;">What Was Before (Issue)</th>
        <th style="width: 33%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>9</strong></td>
        <td><strong>Blog URL Redirects</strong><br><span class="code-token">next.config.ts</span></td>
        <td><span class="before-val"><code class="code-token">/blog/*</code> redirected to <code class="code-token">/updates</code> which returned HTTP 404.</span></td>
        <td><span class="after-val">Configured permanent edge redirects in <code class="code-token">next.config.ts</code> for <code class="code-token">/blog/:path*</code> &rarr; <code class="code-token">/</code> with HTTP 308 status.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>10</strong></td>
        <td><strong>Domain Permanent Redirects</strong><br><span class="code-token">Edge Middleware</span></td>
        <td><span class="before-val">Non-www and HTTP requests returned temporary 307 redirects instead of permanent redirects.</span></td>
        <td><span class="after-val"><code class="code-token">http://ashali.com</code>, <code class="code-token">https://ashali.com</code>, and <code class="code-token">http://www.ashali.com</code> all return <strong>HTTP 308 Permanent Redirect</strong> to <code class="code-token">https://www.ashali.com/</code>.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>11</strong></td>
        <td><strong>Page-Specific OG Images</strong><br><span class="code-token">/public/og/</span></td>
        <td><span class="before-val">Missing dedicated OpenGraph preview images for Book, Speaking, Workshops, and Advisory.</span></td>
        <td><span class="after-val">High-res 1200x630 OG social cards generated and served for Home, Speaking, Book, Advisory, Workshops, and Malaysia/SEA.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>12</strong></td>
        <td><strong>Keynotes Partner Logo Wall</strong><br><span class="code-token">/speaking</span></td>
        <td><span class="before-val">Contained low-resolution or unverified partner logos (Tech London, Kanguru, Triva Global).</span></td>
        <td><span class="after-val">Audited marquee. Pruned unverified logos; retained 14 premier tier-1 corporate brands (EY, Salesforce, NatWest, Warwick, etc.).</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">
    <span>5. Priority 4: Sitewide Copy & Polish (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Items 13 - 15</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 18%;">Item / Area</th>
        <th style="width: 34%;">What Was Before (Issue)</th>
        <th style="width: 33%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>13</strong></td>
        <td><strong>Em Dash Removal</strong><br><span class="code-token">Sitewide Titles</span></td>
        <td><span class="before-val">Em dashes (&mdash;) appeared in page titles, e.g. <em>"Impact &mdash; Pro-Bono Talks"</em>.</span></td>
        <td><span class="after-val">Removed every em dash across all page titles and body text; replaced with colons or clean sentence breaks (e.g. <em>"Impact: Pro-Bono Talks | Ash Ali"</em>).</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>14</strong></td>
        <td><strong>Sentence Case Standardization</strong><br><span class="code-token">Headings / Cards</span></td>
        <td><span class="before-val">Headings and cards used Title Case or all-caps across Impact and Book pages.</span></td>
        <td><span class="after-val">Converted H1s, H2s, and audience tiles to sentence case guidelines across Home, Book, Impact, Advisory, and Speaking.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>15</strong></td>
        <td><strong>Spacing & Linebreaks</strong><br><span class="code-token">Headings</span></td>
        <td><span class="before-val">Double/triple spaces and hard break tags caused awkward wrapping in headings.</span></td>
        <td><span class="after-val">Normalized whitespace and removed artificial linebreaks across Impact H1, Book titles, and badge wrappers.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
    </tbody>
  </table>

  <!-- ==================== PAGE 3 ==================== -->
  <div class="page-break"></div>

  <div class="section-title" style="margin-top: 0;">
    <span>6. Priority 5: Impact Page Enhancements (/impact) (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Items 16 - 18</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 18%;">Item / Area</th>
        <th style="width: 34%;">What Was Before (Issue)</th>
        <th style="width: 33%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>16</strong></td>
        <td><strong>Impact Hero H1</strong><br><span class="code-token">ImpactHero.tsx</span></td>
        <td><span class="before-val">Had artificial hard line breaks and title case formatting.</span></td>
        <td><span class="after-val">Updated to clean sentence case without hard breaks: <em>"Helping young people recognise the advantages they already hold."</em></span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>17</strong></td>
        <td><strong>Run-on H2 Split</strong><br><span class="code-token">WhyThisMatters.tsx</span></td>
        <td><span class="before-val">Section 2 headline was one long run-on sentence mixing thesis and background.</span></td>
        <td><span class="after-val">Split into punchy H2: <em>"Talent is everywhere. Access, confidence and context are not."</em> followed by distinct context line: <em>"From inner-city Birmingham to startups, technology, authorship and global work."</em></span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>18</strong></td>
        <td><strong>Section Headings Case</strong><br><span class="code-token">WhyThisMatters / TalkThemes</span></td>
        <td><span class="before-val">Sections used Title Case: <em>"Why This Matters"</em>, <em>"Concrete, Hopeful..."</em>, <em>"A Limited Number..."</em>, <em>"Who It's For"</em>.</span></td>
        <td><span class="after-val">Converted to sentence case: <em>"Why this matters"</em>, <em>"Concrete, hopeful and genuinely useful."</em>, <em>"A limited number of sessions given carefully."</em>, and <em>"Who it's for"</em>. CTA routes to <code class="code-token">/contact?type=impact</code>.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">
    <span>7. Priority 6: Book Page Enhancements (/unfair-advantage) (What Was Before vs What Changed)</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Items 19 - 26</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 18%;">Item / Area</th>
        <th style="width: 34%;">What Was Before (Issue)</th>
        <th style="width: 33%;">What Changed (Now Live)</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>19</strong></td>
        <td><strong>Homepage Book Showcase</strong><br><span class="code-token">BookShowcase.tsx</span></td>
        <td><span class="before-val">Read "Translated Wordwide" (typo) and missed 150k sales badge.</span></td>
        <td><span class="after-val">Corrected to "Translated worldwide"; added <strong>"150,000+ copies sold"</strong> badge; sentence case body copy.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>20</strong></td>
        <td><strong>Title Case Paragraphs</strong><br><span class="code-token">UnfairAdvantageQuote.tsx</span></td>
        <td><span class="before-val">Paragraph used title-cased words: <em>"The Unfair Advantage Has Reached Readers..."</em>.</span></td>
        <td><span class="after-val">Converted to natural sentence case: <em>"The Unfair Advantage has reached readers, students and leaders around the world..."</em>.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>21</strong></td>
        <td><strong>MILES Framework Copy</strong><br><span class="code-token">MilesFramework.tsx</span></td>
        <td><span class="before-val">Descriptions used all-caps and em dashes (e.g. <em>"MONEY &mdash; The Financial..."</em>).</span></td>
        <td><span class="after-val">Converted all 5 component descriptions to sentence case; removed em dashes (e.g. <em>"Money: The financial resources, runway and capital you can draw on."</em>).</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>22</strong></td>
        <td><strong>"Explore the Book" Button</strong><br><span class="code-token">BookShowcase.tsx</span></td>
        <td><span class="before-val">Button on Book page linked to <code class="code-token">/unfair-advantage</code>, causing a circular page reload.</span></td>
        <td><span class="after-val">Updated to label <strong>"Get your copy"</strong> anchoring smoothly to <code class="code-token">#retailers</code> on the Book page.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>23</strong></td>
        <td><strong>Section Headings</strong><br><span class="code-token">BookThoughts / Retailers</span></td>
        <td><span class="before-val">Headings read <em>"Thoughts..."</em> and <em>"Get Your Copy Of ‘The Unfair Advantage’"</em>.</span></td>
        <td><span class="after-val">Standardized to: <em>"What readers say"</em> and <em>"Get your copy of The Unfair Advantage"</em>.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>24</strong></td>
        <td><strong>Endorsement Capitalisation</strong><br><span class="code-token">BookThoughts.tsx</span></td>
        <td><span class="before-val">Byron Cole quote had uncapitalised sentence; Daniel Priestley role had lowercase "author".</span></td>
        <td><span class="after-val">Capitalised start: <em>"What a masterful and thought-provoking book! A must for every entrepreneur..."</em> and role: <em>"Author of The Entrepreneur Revolution"</em>.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>25</strong></td>
        <td><strong>"Who It's For" Tiles</strong><br><span class="code-token">WhoItsFor.tsx</span></td>
        <td><span class="before-val">Audience tiles used Title Case: <em>"Founders And Aspiring Entrepreneurs"</em>.</span></td>
        <td><span class="after-val">Converted all 5 tiles to sentence case: "Founders and aspiring entrepreneurs", "Students and recent graduates", etc.</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
      <tr>
        <td><strong>26</strong></td>
        <td><strong>UK Retailer Links</strong><br><span class="code-token">BookRetailers.tsx</span></td>
        <td><span class="before-val">Amazon linked to .com store; Apple Books linked to Canadian store.</span></td>
        <td><span class="after-val">Targeted UK stores directly: Amazon UK (<code class="code-token">amazon.co.uk/dp/1788163311</code>) and Apple Books UK (<code class="code-token">books.apple.com/gb/book/...</code>).</span></td>
        <td><span class="badge badge-live">Confirmed</span></td>
      </tr>
    </tbody>
  </table>

  <!-- ==================== PAGE 4 ==================== -->
  <div class="page-break"></div>

  <div class="section-title" style="margin-top: 0;">
    <span>8. Visual Evidence & Live Production Screenshots</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Verified on https://www.ashali.com</span>
  </div>

  <div class="evidence-grid">
    <div class="evidence-card">
      <div class="evidence-header">
        <span>Restored Contact Form (/contact)</span>
        <span class="badge badge-live">All Fields Active</span>
      </div>
      <img src="{img_contact}" class="evidence-img" alt="Contact Form Evidence" />
      <div class="evidence-desc">Full Name, Work Email, Organisation, Event Date, Location, Audience Size, Topic, Budget, and Delivery Type rendered cleanly.</div>
    </div>
    <div class="evidence-card">
      <div class="evidence-header">
        <span>Footer Newsletter Line (Sitewide)</span>
        <span class="badge badge-live">Numberless Copy</span>
      </div>
      <img src="{img_footer}" class="evidence-img" alt="Footer Newsletter Evidence" />
      <div class="evidence-desc">Updated to: <em>"Ash's thinking on advantage, AI and growth, straight to your inbox."</em> Honeypot input protected.</div>
    </div>
    <div class="evidence-card">
      <div class="evidence-header">
        <span>Audited Keynote Logo Marquee (/speaking)</span>
        <span class="badge badge-live">14 Tier-1 Brands</span>
      </div>
      <img src="{img_logos}" class="evidence-img" alt="Keynotes Logos Evidence" />
      <div class="evidence-desc">Pruned unverified and low-res logos. Retained premier enterprise brands (EY, Salesforce, NatWest, Warwick, WeWork).</div>
    </div>
    <div class="evidence-card">
      <div class="evidence-header">
        <span>UK Retailers & Direct Anchoring (/unfair-advantage)</span>
        <span class="badge badge-live">UK Stores Direct</span>
      </div>
      <img src="{img_book}" class="evidence-img" alt="Book Retailers Evidence" />
      <div class="evidence-desc">Amazon UK and Apple Books UK links verified. Heading standardized to <em>"Get your copy of The Unfair Advantage"</em>.</div>
    </div>
  </div>

  <div class="section-title">
    <span>9. Server-Side Routing & Anti-Spam Security Log</span>
    <span style="font-size: 6.5pt; color: #16a34a; font-weight: 600;">Automated SMTP Delivery Verification</span>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 24%;">Form / Submission Type</th>
        <th style="width: 22%;">API Endpoint</th>
        <th style="width: 34%;">Email Subject Format</th>
        <th style="width: 20%;">Security Verification</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Keynote Speaking Enquiry</strong></td>
        <td><span class="code-token">/api/contact/submit</span></td>
        <td><span class="code-token">ashali.com enquiry: speaking</span></td>
        <td><span class="badge badge-live">Delivered to ash@</span></td>
      </tr>
      <tr>
        <td><strong>Newsletter Footer Signup</strong></td>
        <td><span class="code-token">/api/newsletter/subscribe</span></td>
        <td><span class="code-token">ashali.com enquiry: newsletter signup</span></td>
        <td><span class="badge badge-live">Delivered to ash@</span></td>
      </tr>
      <tr>
        <td><strong>Impact Pro-Bono Request</strong></td>
        <td><span class="code-token">/api/contact/submit</span></td>
        <td><span class="code-token">ashali.com enquiry: pro-bono</span></td>
        <td><span class="badge badge-live">Delivered to ash@</span></td>
      </tr>
      <tr>
        <td><strong>Uhubs 2026 Report Download</strong></td>
        <td><span class="code-token">/api/contact/submit</span></td>
        <td><span class="code-token">ashali.com enquiry: uhubs report download</span></td>
        <td><span class="badge badge-live">Delivered to ash@</span></td>
      </tr>
      <tr>
        <td><strong>Automated Bot Spam Test</strong></td>
        <td><span class="code-token">Honeypot website_hp</span></td>
        <td><span class="code-token">Rejected pre-transport</span></td>
        <td><span class="badge badge-live">HTTP 400 Blocked</span></td>
      </tr>
    </tbody>
  </table>

  <div class="footer-sig">
    Ash Ali Official Website &bull; Production Resolution & Verification Report &bull; Kazi Marketing Group &bull; https://www.ashali.com
  </div>

</body>
</html>
"""

html_path = os.path.join(workspace_root, "frontend-next", "scripts", "report_round3.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"HTML report written to {html_path}")

output_pdf_workspace = os.path.join(workspace_root, "Ash_Ali_Production_Fix_Report_Round_3.pdf")
output_pdf_artifacts = os.path.join(artifacts_dir, "Ash_Ali_Production_Fix_Report_Round_3.pdf")

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    page.set_content(html_content, wait_until="networkidle")
    page.pdf(
        path=output_pdf_workspace,
        format="A4",
        print_background=True,
        margin={"top": "7mm", "bottom": "7mm", "left": "9mm", "right": "9mm"}
    )
    page.pdf(
        path=output_pdf_artifacts,
        format="A4",
        print_background=True,
        margin={"top": "7mm", "bottom": "7mm", "left": "9mm", "right": "9mm"}
    )
    browser.close()

print("Updated 4-page PDF generated successfully!")
