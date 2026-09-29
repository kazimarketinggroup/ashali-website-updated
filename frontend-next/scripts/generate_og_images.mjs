import path from 'path';
import sharp from 'sharp';

const pages = [
  {
    filename: 'about.png',
    tag: 'ASH ALI  •  ABOUT',
    title: 'About Ash Ali',
    subtitle: "25 years building what he now speaks about. Just Eat UK's first Marketing Director, author and investor.",
  },
  {
    filename: 'speaking.png',
    tag: 'ASH ALI  •  KEYNOTES',
    title: 'International Keynote Speaker',
    subtitle: 'High-energy keynotes on Unfair Advantage, AI Transformation, and Human Potential for global leaders.',
  },
  {
    filename: 'workshops.png',
    tag: 'ASH ALI  •  EXECUTIVE LABS',
    title: 'Executive Workshops & Labs',
    subtitle: 'The AI Advantage Lab, Human Advantage Leadership Lab, and AI-Era Sales Lab for executive teams.',
  },
  {
    filename: 'advisory.png',
    tag: 'ASH ALI  •  ADVISORY',
    title: 'Selective Strategic Advisory',
    subtitle: 'Hands-on strategic advisory for high-growth founders and leadership teams navigating the AI shift.',
  },
  {
    filename: 'unfair-advantage.png',
    tag: 'ASH ALI  •  BESTSELLING BOOK',
    title: 'The Unfair Advantage',
    subtitle: 'How you already have what it takes to succeed. Award-winning business book by Ash Ali & Hasan Kubba.',
  },
  {
    filename: 'the-next-level.png',
    tag: 'ASH ALI  •  PROGRAMME',
    title: 'The Next Level',
    subtitle: 'A high-impact 3-stage business and leadership acceleration programme for visionary founders.',
  },
  {
    filename: 'impact.png',
    tag: 'ASH ALI  •  PRO-BONO & SOCIAL',
    title: 'Impact & Community Work',
    subtitle: 'Giving back through youth mentorship, university talks, and empowering underrepresented founders.',
  },
  {
    filename: 'contact.png',
    tag: 'ASH ALI  •  GET IN TOUCH',
    title: 'Work With Ash Ali',
    subtitle: 'Direct enquiries for keynote speaking, executive workshops, advisory, and media appearances.',
  },
  {
    filename: 'portfolio.png',
    tag: 'ASH ALI  •  PORTFOLIO',
    title: 'Ventures & Investments',
    subtitle: 'Track record across Just Eat, Uhubs, Fare Exchange, and early-stage tech investments.',
  }
];

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function wrapText(text, maxCharsPerLine = 28) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function generateCards() {
  const ogDir = path.resolve('public/og');
  const ashImagePath = path.resolve('src/assets/speaking/ashSpeakingImage.png');
  
  // Resize portrait cleanly to 360x625
  const portraitBuffer = await sharp(ashImagePath)
    .resize(360, 625, { fit: 'inside' })
    .toBuffer();

  for (const page of pages) {
    const titleLines = wrapText(page.title, 22);
    const subtitleLines = wrapText(page.subtitle, 36);

    const titleSvg = titleLines.map((line, idx) => 
      `<tspan x="80" dy="${idx === 0 ? 0 : '1.18em'}">${escapeXml(line)}</tspan>`
    ).join('');

    const subtitleStartY = 195 + (titleLines.length * 62) + 20;
    const subtitleSvg = subtitleLines.map((line, idx) => 
      `<tspan x="80" dy="${idx === 0 ? 0 : '1.4em'}">${escapeXml(line)}</tspan>`
    ).join('');

    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF781D"/>
            <stop offset="100%" stop-color="#008080"/>
          </linearGradient>
          <radialGradient id="glow" cx="15%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#FF781D" stop-opacity="0.16"/>
            <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Solid Background -->
        <rect width="1200" height="630" fill="#080808"/>
        <rect width="1200" height="630" fill="url(#glow)"/>

        <!-- Top Accent Bar -->
        <rect x="0" y="0" width="1200" height="5" fill="url(#brandGrad)"/>

        <!-- Category Tag -->
        <text x="80" y="125" fill="#a1a1aa" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="4">${escapeXml(page.tag)}</text>
        
        <!-- Title -->
        <text x="80" y="195" fill="#ffffff" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" letter-spacing="-1">
          ${titleSvg}
        </text>

        <!-- Subtitle -->
        <text x="80" y="${subtitleStartY}" fill="#9ca3af" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" letter-spacing="-0.2">
          ${subtitleSvg}
        </text>

        <!-- Subtle bottom border line on text section -->
        <line x1="80" y1="520" x2="720" y2="520" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

        <!-- Brand Footer -->
        <circle cx="85" cy="565" r="4" fill="url(#brandGrad)"/>
        <text x="100" y="570" fill="#71717a" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" letter-spacing="1.5">ashali.com</text>
      </svg>
    `;

    const svgBuffer = Buffer.from(svg);
    const outputPath = path.join(ogDir, page.filename);

    await sharp(svgBuffer)
      .composite([
        {
          input: portraitBuffer,
          left: 800,
          top: 5,
          blend: 'over'
        }
      ])
      .png()
      .toFile(outputPath);

    console.log(`Generated clean OG card: ${page.filename}`);
  }

  console.log('All custom OG images successfully generated!');
}

generateCards().catch(console.error);
