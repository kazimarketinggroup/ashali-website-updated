const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', reject);
  });
}

async function run() {
  const res = await fetchUrl('https://www.ashali.com');
  console.log('Status:', res.status);
  console.log('Age:', res.headers['age']);
  console.log('X-Vercel-Id:', res.headers['x-vercel-id']);
  console.log('X-Vercel-Cache:', res.headers['x-vercel-cache']);
  
  const heroIdx = res.body.indexOf('Ash Ali pointing up');
  console.log('Hero image alt found:', heroIdx !== -1);
  if (heroIdx !== -1) {
    console.log('Hero snippet:', res.body.slice(heroIdx - 80, heroIdx + 160));
  }
  
  console.log('Includes fetchpriority="high":', res.body.includes('fetchpriority="high"'));
  console.log('Includes priority preload link in head:', res.body.includes('rel="preload"') && res.body.includes('as="image"'));
}

run().catch(console.error);
