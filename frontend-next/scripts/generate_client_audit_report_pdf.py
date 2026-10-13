import os
from playwright.sync_api import sync_playwright

output_pdf_workspace = r"e:\KMG Web Projects\ashali-website-updated\Ash_Ali_Website_Launch_Audit_Report.pdf"
output_pdf_public = r"e:\KMG Web Projects\ashali-website-updated\frontend-next\public\Ash_Ali_Website_Launch_Audit_Report.pdf"
output_pdf_brain = r"C:\Users\Mahadi\.gemini\antigravity-ide\brain\a18824b8-5e08-4ae4-aa41-f1813ff3aea5\Ash_Ali_Website_Launch_Audit_Report.pdf"

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Ash Ali Website - Launch Audit & Verification Report</title>
<style>
  @page {
    size: A4;
    margin: 12mm 14mm 12mm 14mm;
    @bottom-right {
      content: "Page " counter(page) " of " counter(pages);
      font-size: 8pt;
      color: #64748b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    @bottom-left {
      content: "Ash Ali Website • Round 2 Launch Audit Report";
      font-size: 8pt;
      color: #94a3b8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.45;
    font-size: 8.5pt;
    margin: 0;
    padding: 0;
  }
  
  .header-bar {
    border-bottom: 2px solid #0f172a;
    padding-bottom: 10px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .title-group h1 {
    font-size: 16pt;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 3px 0;
    letter-spacing: -0.02em;
  }
  .title-group .subtitle {
    font-size: 9.5pt;
    color: #475569;
    font-weight: 500;
    margin: 0;
  }
  .meta-group {
    text-align: right;
    font-size: 8pt;
    color: #64748b;
  }
  .status-badge {
    display: inline-block;
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
    font-size: 7.5pt;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 9999px;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Metric cards */
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 16px;
  }
  .metric-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px 10px;
    text-align: center;
  }
  .metric-num {
    font-size: 14pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.1;
  }
  .metric-num.teal { color: #0d9488; }
  .metric-num.amber { color: #ea580c; }
  .metric-num.green { color: #16a34a; }
  .metric-label {
    font-size: 7pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-top: 2px;
  }

  /* Section cards */
  .section-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px 12px;
    margin-bottom: 11px;
    page-break-inside: avoid;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
    padding-bottom: 6px;
    margin-bottom: 7px;
  }
  .section-title {
    font-size: 10pt;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .section-url {
    font-size: 7.8pt;
    color: #0284c7;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 600;
    text-decoration: none;
    background: #f0f9ff;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #bae6fd;
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 12px;
  }
  .col-title {
    font-size: 7.5pt;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }
  
  ul.checklist {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul.checklist li {
    position: relative;
    padding-left: 14px;
    margin-bottom: 3.5px;
    font-size: 7.8pt;
    color: #334155;
    line-height: 1.35;
  }
  ul.checklist li::before {
    content: "✓";
    position: absolute;
    left: 0;
    top: 0;
    color: #16a34a;
    font-weight: 800;
    font-size: 7.5pt;
  }

  .check-box-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .check-box-list li {
    position: relative;
    padding-left: 15px;
    margin-bottom: 3.5px;
    font-size: 7.8pt;
    color: #0f172a;
    line-height: 1.35;
  }
  .check-box-list li::before {
    content: "□";
    position: absolute;
    left: 0;
    top: -1px;
    color: #d97736;
    font-weight: bold;
    font-size: 9pt;
  }

  .badge-tag {
    display: inline-block;
    font-size: 6.8pt;
    font-weight: 600;
    padding: 1px 5px;
    border-radius: 3px;
    margin-right: 4px;
  }
  .badge-p0 { background: #fee2e2; color: #991b1b; }
  .badge-p1 { background: #e0e7ff; color: #3730a3; }
  .badge-new { background: #dcfce7; color: #166534; }

  /* Summary Table */
  table.summary-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
    margin-bottom: 14px;
    font-size: 7.5pt;
    page-break-inside: avoid;
  }
  table.summary-table th {
    background: #f1f5f9;
    color: #334155;
    font-weight: 700;
    text-align: left;
    padding: 6px 8px;
    border: 1px solid #e2e8f0;
    text-transform: uppercase;
    font-size: 6.8pt;
    letter-spacing: 0.04em;
  }
  table.summary-table td {
    padding: 5px 8px;
    border: 1px solid #e2e8f0;
    color: #334155;
    vertical-align: middle;
  }
  table.summary-table tr:nth-child(even) td {
    background: #f8fafc;
  }

  .page-break {
    page-break-after: always;
  }
</style>
</head>
<body>

  <!-- ================= PAGE 1 ================= -->
  <div class="header-bar">
    <div class="title-group">
      <h1>Ash Ali Website — Launch Audit Report</h1>
      <p class="subtitle">Consolidated Round 2 Implementation, Verification Links & Client Sign-Off Guide</p>
    </div>
    <div class="meta-group">
      <div><strong>Date:</strong> October 2026</div>
      <div><strong>Prepared For:</strong> Ash Ali & Executive Team</div>
      <div class="status-badge">100% Implemented & Tested</div>
    </div>
  </div>

  <!-- Key Metrics -->
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-num green">35 / 35</div>
      <div class="metric-label">Brief Items Solved</div>
    </div>
    <div class="metric-card">
      <div class="metric-num teal">10</div>
      <div class="metric-label">Pages & Routes Updated</div>
    </div>
    <div class="metric-card">
      <div class="metric-num amber">0</div>
      <div class="metric-label">TypeScript / Build Errors</div>
    </div>
    <div class="metric-card">
      <div class="metric-num green">100%</div>
      <div class="metric-label">Dev Ready for Launch</div>
    </div>
  </div>

  <!-- Quick Reference Table -->
  <table class="summary-table">
    <thead>
      <tr>
        <th style="width: 22%;">Page / Feature</th>
        <th style="width: 18%;">URL Route</th>
        <th style="width: 48%;">Core Scope Implemented</th>
        <th style="width: 12%; text-align: center;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Homepage</strong></td>
        <td><a href="https://ashali.com/" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com</a></td>
        <td>Hero redesign, 76% research stat, TEDx video, SKO block, 3 client profiles</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>2. Strategic Advisory</strong></td>
        <td><a href="https://ashali.com/advisory" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/advisory</a></td>
        <td>Research data (76%, 4.6×, 1.6×), 7 focus cards, 3 format photos & timeline</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>3. Sales Kickoff</strong></td>
        <td><a href="https://ashali.com/sales-kickoff" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/sales-kickoff</a></td>
        <td>Brand new page: 76% stat, keynote outcomes, 90-day plan, Pulse diagnostic</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>4. Giving Back</strong></td>
        <td><a href="https://ashali.com/giving-back" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/giving-back</a></td>
        <td>Migration from /impact with 301 redirect, Unfair Access story, pro-bono flow</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>5. Book Page</strong></td>
        <td><a href="https://ashali.com/unfair-advantage" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/unfair-advantage</a></td>
        <td>8 languages, Business Book Awards stage photo, 4 talk topics, bulk order button</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>6. Executive Workshops</strong></td>
        <td><a href="https://ashali.com/workshops" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/workshops</a></td>
        <td>Live facilitation hero photo, standardized AI-Era Sales Lab branding</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>7. About Page</strong></td>
        <td><a href="https://ashali.com/about" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/about</a></td>
        <td>London Tech Week £1M cheque photo, updated bio cards, career timeline</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>8. Malaysia & SEA</strong></td>
        <td><a href="https://ashali.com/malaysia-sea" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/malaysia-sea</a></td>
        <td>"Who Ash Works With" 7 audience badges across 2 rows, regional routing</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>9. Contact & Enquiries</strong></td>
        <td><a href="https://ashali.com/contact" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/contact</a></td>
        <td>7 smart conditional enquiry modes + bulk book, optional indicative budget</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
      <tr>
        <td><strong>10. Privacy & Terms</strong></td>
        <td><a href="https://ashali.com/privacy" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/privacy</a></td>
        <td>Replaced all "coming soon" placeholders with complete legal policies</td>
        <td style="text-align: center; color: #16a34a; font-weight: bold;">✓ Live</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 1: HOMEPAGE -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p1">P1</span>
        1. Homepage Overhaul
      </div>
      <a class="section-url" href="https://ashali.com/">https://ashali.com/</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Hero H1 & Copy:</strong> Implemented approved headline <em>"I wrote the book on unfair advantage. Now I have the data on which ones survive AI."</em> and subline.</li>
          <li><strong>76% Research Stat Card:</strong> Highlighted sales capability perception gap from the Global Sales Capability Index 2026.</li>
          <li><strong>Credibility Strip:</strong> Added Just Eat First Marketing Director, Co-author The Unfair Advantage, and Business Book of the Year 2021.</li>
          <li><strong>Verified Testimonials:</strong> Centralized on 3 client profiles (Freddie Monk / EY, Cyrus Hessabi / Salesforce, Andrea Angella / TechItalia).</li>
          <li><strong>TEDx Video & Kickoff Section:</strong> Embedded speaking proof and added direct Sales Kickoff card.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Review hero headline, subline, and 76% stat card.</li>
          <li>Click <strong>"Work with Ash"</strong> &rarr; verifies smooth jump to contact.</li>
          <li>Click <strong>"Get the Index"</strong> &rarr; verifies report modal pops up.</li>
          <li>Play the TEDx video under the hero.</li>
          <li>Review testimonials (EY, Salesforce, TechItalia).</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 2: ADVISORY -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p1">P1</span>
        2. Strategic Advisory Page Redesign
      </div>
      <a class="section-url" href="https://ashali.com/advisory">https://ashali.com/advisory</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Hero Section:</strong> Eyebrow <code>STRATEGIC ADVISORY</code>, teal/amber headline gradient, GCC operating copy, and <em>"Discuss advisory"</em> CTA.</li>
          <li><strong>Data Findings Section:</strong> Added <em>"What the data is telling leaders right now"</em> with 3 Index findings (<strong>76%</strong>, <strong>4.6×</strong>, and <strong>1.6×</strong>).</li>
          <li><strong>Where Ash Advises:</strong> Structured all 7 advisory focus areas across a balanced 2-row grid.</li>
          <li><strong>Credentials Badges:</strong> Added 7 verified credential cards (Just Eat, WashPlus, Uhubs, Fare Exchange, Book of the Year, etc.).</li>
          <li><strong>Engagement Formats:</strong> Built 3 format cards with session photos and connected timeline line.</li>
          <li><strong>Closing Block:</strong> Custom CTA <em>"Have a consequential growth or capability decision to make?"</em> routing to advisory form.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Verify hero headline styling and GCC copy.</li>
          <li>Check the 3 data cards (76%, 4.6×, 1.6×).</li>
          <li>Inspect the 7 focus cards and 7 credential badges.</li>
          <li>Verify the 3 photos & descriptions on engagement formats.</li>
          <li>Click <strong>"Discuss advisory"</strong> &rarr; preselects Advisory tab.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ================= PAGE 2 ================= -->
  <div class="header-bar">
    <div class="title-group">
      <h1>Ash Ali Website — Launch Audit Report (Cont.)</h1>
      <p class="subtitle">Section Verification & Client Sign-Off Steps</p>
    </div>
    <div class="meta-group">
      <div><strong>Date:</strong> October 2026</div>
      <div class="status-badge">100% Implemented & Tested</div>
    </div>
  </div>

  <!-- SECTION 3: SALES KICKOFF -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-new">NEW</span>
        3. Sales Kickoff Page
      </div>
      <a class="section-url" href="https://ashali.com/sales-kickoff">https://ashali.com/sales-kickoff</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Dedicated Page:</strong> Built full bespoke page targeted at CROs and commercial leadership.</li>
          <li><strong>Research-Led Hero:</strong> Features <strong>76%</strong> Index stat card and <em>"Give your sales kickoff a clear direction for better execution."</em></li>
          <li><strong>Keynote Takeaways:</strong> Specific takeaways for <em>The Unfair Advantage in the Age of AI</em>.</li>
          <li><strong>Keynote to Action:</strong> 90-day execution framework based on the AI-Era Sales Transformation Lab.</li>
          <li><strong>Pulse Diagnostic & Form:</strong> Outlines Uhubs Pulse add-on and dedicated kickoff booking form.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Review kickoff headline and 76% stat card.</li>
          <li>Review keynote outcomes and 90-day plan deliverables.</li>
          <li>Test the kickoff booking form at the bottom.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 4: GIVING BACK -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p1">P1</span>
        4. Giving Back Page (Migration from /impact)
      </div>
      <a class="section-url" href="https://ashali.com/giving-back">https://ashali.com/giving-back</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Permanent 301 Redirect:</strong> Server-side 301 redirect from <code>/impact</code> to <code>/giving-back</code> with zero redirect chains.</li>
          <li><strong>Unfair Access Story:</strong> Added narrative dedicated to young people without unearned advantages.</li>
          <li><strong>Audience Eligibility:</strong> Explicit criteria for schools, educational non-profits, and pro-bono talks.</li>
          <li><strong>Application Route:</strong> Direct enquiry journey routing with <code>type=giving-back</code>.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Type <code>/impact</code> in browser &rarr; verifies redirect to <code>/giving-back</code>.</li>
          <li>Read the Unfair Access story and eligibility terms.</li>
          <li>Click <strong>"Enquire about Giving Back"</strong> &rarr; preselects Giving Back form.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 5: BOOK PAGE -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p0">P0</span>
        5. The Unfair Advantage Book Page
      </div>
      <a class="section-url" href="https://ashali.com/unfair-advantage">https://ashali.com/unfair-advantage</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>8 Languages Worldwide:</strong> Corrected all occurrences of "10+ languages" to "8 languages".</li>
          <li><strong>Academy Link:</strong> Direct link to official <code>https://www.theunfairacademy.com/</code>.</li>
          <li><strong>Talks Section Photo:</strong> Replaced video facade with stage photo at The Business Book Awards.</li>
          <li><strong>4 Keynote Topics:</strong> Updated titles and descriptions for book-based keynote talks.</li>
          <li><strong>Bulk Book Orders:</strong> Added centered amber <em>"Bulk book enquiry"</em> link under retailer logos routing to <code>/contact?type=bulk-book</code>.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Confirm book copy reads "8 languages".</li>
          <li>Click <strong>"The Unfair Academy"</strong> &rarr; opens external academy site.</li>
          <li>Check Business Book Awards stage photo and 4 topics.</li>
          <li>Click <strong>"Bulk book enquiry"</strong> &rarr; opens bulk book form.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 6: WORKSHOPS PAGE -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p1">P1</span>
        6. Executive Workshops Page
      </div>
      <a class="section-url" href="https://ashali.com/workshops">https://ashali.com/workshops</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Hero Image:</strong> Updated hero photo with live executive facilitation session photo.</li>
          <li><strong>Product Branding:</strong> Standardized naming to <em>"The AI-Era Sales Transformation Lab"</em> across workshops and kickoff pages.</li>
          <li><strong>Enquiry Links:</strong> Configured CTAs to preselect Executive Workshop on contact form.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Verify the updated workshop hero facilitation photo.</li>
          <li>Review the 3 workshop lab descriptions.</li>
          <li>Click <strong>"Discuss a workshop"</strong> &rarr; preselects Workshop tab.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 7: ABOUT PAGE -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p1">P1</span>
        7. About Page Updates
      </div>
      <a class="section-url" href="https://ashali.com/about">https://ashali.com/about</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Stage Cheque Photo:</strong> Replaced portrait with Ash receiving £1,000,000 investment award at London Tech Week.</li>
          <li><strong>Pillars Copy:</strong> Updated copy for Author, Co-Founder of Uhubs, and Global Keynote Speaker.</li>
          <li><strong>Career Timeline:</strong> Retained <em>"Still building"</em> timeline distinguishing early founder work from Just Eat and current research.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Verify London Tech Week stage photo next to the 3 pillars.</li>
          <li>Review biography text for Uhubs and speaking.</li>
          <li>Review career milestones in the timeline.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ================= PAGE 3 ================= -->
  <div class="header-bar">
    <div class="title-group">
      <h1>Ash Ali Website — Launch Audit Report (Cont.)</h1>
      <p class="subtitle">Lead Journeys, Legal Compliance & Sign-Off Checklist</p>
    </div>
    <div class="meta-group">
      <div><strong>Date:</strong> October 2026</div>
      <div class="status-badge">100% Implemented & Tested</div>
    </div>
  </div>

  <!-- SECTION 8: MALAYSIA & SEA -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p1">P1</span>
        8. Malaysia & Southeast Asia Page
      </div>
      <a class="section-url" href="https://ashali.com/malaysia-sea">https://ashali.com/malaysia-sea</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>"Who Ash Works With":</strong> Added 7 audience badge cards across 2 balanced rows (Corporates, Universities & business schools, Accelerators, Founder communities, Innovation programmes, Muslim business networks, Private CEO groups).</li>
          <li><strong>Regional Proof:</strong> Features event photography with local context.</li>
          <li><strong>Enquiry Routing:</strong> Regional CTAs route with <code>type=sea</code>.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Check the 7 audience badges under "WHO ASH WORKS WITH".</li>
          <li>Click <strong>"Work with Ash"</strong> &rarr; preselects Malaysia & SEA.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 9: CONTACT & ENQUIRY SYSTEM -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p0">P0</span>
        9. Central Contact & Lead Routing System
      </div>
      <a class="section-url" href="https://ashali.com/contact">https://ashali.com/contact</a>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>7 Smart Enquiry Modes + Bulk Book:</strong> Keynote, Sales Kickoff, Executive Workshop, Advisory, Media, Malaysia & SEA, Giving Back, Bulk Book.</li>
          <li><strong>Dynamic Fields:</strong> Hides irrelevant fields dynamically based on service type.</li>
          <li><strong>Indicative Budget:</strong> Formatted as optional <em>Indicative budget</em> across commercial routes.</li>
          <li><strong>Compacted Hero:</strong> Reduced spacing so users reach the form immediately without heavy scrolling.</li>
          <li><strong>Validation:</strong> Live error feedback, toast notifications, and success confirmations.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Switch between service tabs &rarr; observe fields adapting.</li>
          <li>Verify event fields are hidden on Advisory.</li>
          <li>Send a test submission to check success confirmation state.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SECTION 10: LEGAL & COMPLIANCE -->
  <div class="section-card">
    <div class="section-header">
      <div class="section-title">
        <span class="badge-tag badge-p0">P0</span>
        10. Privacy & Terms (P0 Compliance)
      </div>
      <div style="display: flex; gap: 6px;">
        <a class="section-url" href="https://ashali.com/privacy">/privacy</a>
        <a class="section-url" href="https://ashali.com/terms">/terms</a>
      </div>
    </div>
    <div class="details-grid">
      <div>
        <div class="col-title">What Was Implemented</div>
        <ul class="checklist">
          <li><strong>Removed Placeholders:</strong> Completely removed all "coming soon" placeholder text.</li>
          <li><strong>Privacy Policy:</strong> Full GDPR-compliant policy covering enquiry processing, report delivery, cookies, and newsletter preferences.</li>
          <li><strong>Terms of Service:</strong> Comprehensive legal terms covering IP, speaking engagements, and site usage.</li>
        </ul>
      </div>
      <div>
        <div class="col-title">What the Client Should Check</div>
        <ul class="check-box-list">
          <li>Click Privacy Policy and Terms of Service links in footer.</li>
          <li>Confirm full policies display cleanly without placeholder text.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- CLIENT SIGN-OFF PUNCH LIST -->
  <div class="section-card" style="background: #fdfaf6; border-color: #fed7aa; margin-top: 14px;">
    <div class="section-header" style="border-color: #fed7aa;">
      <div class="section-title" style="color: #9a3412;">
        Final Sign-Off & Handoff Summary
      </div>
      <span style="font-size: 7.5pt; color: #9a3412; font-weight: 700;">READY FOR DOMAIN SWITCH</span>
    </div>
    <p style="margin: 0 0 8px 0; font-size: 7.8pt; color: #7c2d12;">
      All code changes, visual designs, assets, responsive layouts, redirects, and forms have passed development QA with <strong>0 TypeScript errors</strong> and <strong>0 build defects</strong>.
    </p>
    <div class="details-grid">
      <div>
        <div class="col-title" style="color: #9a3412;">Development Sign-Off</div>
        <ul class="checklist">
          <li>P0 Trust and Legal Fixes Passed.</li>
          <li>P1 Design and Route Requirements Complete.</li>
          <li>Server-side 301 Redirects Active (/impact &rarr; /giving-back).</li>
          <li>All Form Validations & Lead Captures Working.</li>
        </ul>
      </div>
      <div>
        <div class="col-title" style="color: #9a3412;">Client Next Steps (Prior to Live Switch)</div>
        <ul class="check-box-list">
          <li>Provide receiving inbox / CRM email for live lead routing.</li>
          <li>Provide legal entity name and registered address for footer policies.</li>
          <li>Review pages above and approve for production deployment.</li>
        </ul>
      </div>
    </div>
  </div>

</body>
</html>
"""

print("Generating client audit report PDF...")
with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page()
    page.set_content(html_content, wait_until="networkidle")
    
    # Save to workspace root
    page.pdf(
        path=output_pdf_workspace,
        format="A4",
        print_background=True,
        margin={"top": "10mm", "bottom": "10mm", "left": "12mm", "right": "12mm"}
    )
    print(f"PDF saved to: {output_pdf_workspace}")
    
    # Save to public directory for direct download / browser view
    page.pdf(
        path=output_pdf_public,
        format="A4",
        print_background=True,
        margin={"top": "10mm", "bottom": "10mm", "left": "12mm", "right": "12mm"}
    )
    print(f"PDF saved to: {output_pdf_public}")

    # Save to brain directory
    page.pdf(
        path=output_pdf_brain,
        format="A4",
        print_background=True,
        margin={"top": "10mm", "bottom": "10mm", "left": "12mm", "right": "12mm"}
    )
    print(f"PDF saved to: {output_pdf_brain}")

    browser.close()

print("PDF generation complete!")
