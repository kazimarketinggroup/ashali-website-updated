const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'generate_client_audit_report_pdf.py');
let content = fs.readFileSync(file, 'utf8');

// replace all http://localhost:3000 with https://ashali.com
content = content.replaceAll('http://localhost:3000', 'https://ashali.com');

// replace table cells with full links
content = content.replace('<td><code>/</code></td>', '<td><a href="https://ashali.com/" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com</a></td>');
content = content.replace('<td><code>/advisory</code></td>', '<td><a href="https://ashali.com/advisory" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/advisory</a></td>');
content = content.replace('<td><code>/sales-kickoff</code></td>', '<td><a href="https://ashali.com/sales-kickoff" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/sales-kickoff</a></td>');
content = content.replace('<td><code>/giving-back</code></td>', '<td><a href="https://ashali.com/giving-back" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/giving-back</a></td>');
content = content.replace('<td><code>/unfair-advantage</code></td>', '<td><a href="https://ashali.com/unfair-advantage" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/unfair-advantage</a></td>');
content = content.replace('<td><code>/workshops</code></td>', '<td><a href="https://ashali.com/workshops" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/workshops</a></td>');
content = content.replace('<td><code>/about</code></td>', '<td><a href="https://ashali.com/about" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/about</a></td>');
content = content.replace('<td><code>/malaysia-sea</code></td>', '<td><a href="https://ashali.com/malaysia-sea" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/malaysia-sea</a></td>');
content = content.replace('<td><code>/contact</code></td>', '<td><a href="https://ashali.com/contact" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/contact</a></td>');
content = content.replace('<td><code>/privacy</code>, <code>/terms</code></td>', '<td><a href="https://ashali.com/privacy" style="color: #0284c7; text-decoration: none; font-weight: 600;">ashali.com/privacy</a></td>');

fs.writeFileSync(file, content, 'utf8');
console.log('PDF generator script successfully updated to use https://ashali.com!');
