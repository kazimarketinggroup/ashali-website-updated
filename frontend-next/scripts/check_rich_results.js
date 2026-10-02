const https = require('https');

function getJsonLd(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        const regex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
        const matches = [];
        let match;
        while ((match = regex.exec(data)) !== null) {
          try {
            matches.push(JSON.parse(match[1]));
          } catch (e) {
            matches.push(match[1]);
          }
        }
        resolve(matches);
      });
    });
  });
}

async function run() {
  console.log('=== HOMEPAGE JSON-LD ===');
  const home = await getJsonLd('https://www.ashali.com');
  console.log(JSON.stringify(home, null, 2));

  console.log('\n=== BOOK PAGE JSON-LD ===');
  const book = await getJsonLd('https://www.ashali.com/unfair-advantage');
  console.log(JSON.stringify(book, null, 2));
}

run().catch(console.error);
