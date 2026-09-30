import urllib.request, json, ssl

ctx = ssl.create_default_context()

def fetch(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req, context=ctx) as r:
        return r.status, r.read().decode('utf-8', errors='ignore'), dict(r.headers)

# 1. Homepage
status, html, headers = fetch('https://www.ashali.com/')
print('1. Homepage status:', status)
print('   Deployment header:', headers.get('x-vercel-id', 'unknown'))
print('   "Translated worldwide" present:', 'Translated worldwide' in html)
print('   "150,000+ copies sold" present:', '150,000+ copies sold' in html)
print('   "Ash\'s thinking on advantage..." present:', 'straight to your inbox' in html)
print('   Old "Join 10,000+" present:', '10,000+' in html)
print('   Old "Uk, London and KL" present:', 'Uk, London and KL' in html)
print('   Old "Translated Wordwide" present:', 'Translated Wordwide' in html)
print('   Old "Invite Ash as a Guest" present:', 'Invite Ash as a Guest' in html)
print('   Old "Fill The form" present:', 'Fill The form' in html)

# 2. Contact page
status, html_contact, _ = fetch('https://www.ashali.com/contact')
print('\n2. Contact page status:', status)
print('   "speaking@ashali.com" present:', 'speaking@ashali.com' in html_contact)
print('   "mailto:" present:', 'mailto:' in html_contact)
print('   "website_hp" present:', 'website_hp' in html_contact)
print('   "cf-turnstile" present:', 'cf-turnstile' in html_contact)

# 3. Book page (/unfair-advantage)
status, html_book, _ = fetch('https://www.ashali.com/unfair-advantage')
print('\n3. Book page status:', status)
print('   "What readers say" present:', 'What readers say' in html_book)
print('   "Get your copy of The Unfair Advantage" present:', 'Get your copy of The Unfair Advantage' in html_book)
print('   "amazon.co.uk" present:', 'amazon.co.uk' in html_book)
print('   "books.apple.com/gb" present:', 'books.apple.com/gb' in html_book)
print('   "A must for every entrepreneur" present:', 'A must for every entrepreneur' in html_book)
print('   "Author of The Entrepreneur Revolution" present:', 'Author of The Entrepreneur Revolution' in html_book)
print('   "Finalist 2022" present:', '2022 Finalist' in html_book or 'Finalist 2022' in html_book)

# 4. Impact page (/impact)
status, html_impact, _ = fetch('https://www.ashali.com/impact')
print('\n4. Impact page status:', status)
print('   H1 present:', 'Helping young people recognise the advantages they already hold.' in html_impact)
print('   H2 split present:', 'Talent is everywhere.' in html_impact and 'Access, confidence and context are not.' in html_impact)
print('   Birmingham line present:', 'From inner-city Birmingham to startups' in html_impact)
print('   "Concrete, hopeful and genuinely useful." present:', 'genuinely useful.' in html_impact)
print('   "A limited number of sessions given carefully." present:', 'given carefully.' in html_impact)

# 5. About page (/about)
status, html_about, _ = fetch('https://www.ashali.com/about')
print('\n5. About page status:', status)
print('   "Scaled the business and completed a successful exit in the GCC region." present:',
      'Scaled the business and completed a successful exit in the GCC region.' in html_about)
print('   "seven-figure sum" present:', 'seven-figure' in html_about)
print('   "multi-million" present:', 'multi-million' in html_about)

# 6. Redirects
def test_redirect(url):
    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):
            return None
    opener = urllib.request.build_opener(NoRedirect)
    try:
        r = opener.open(url)
        return r.status, r.headers.get('Location')
    except urllib.error.HTTPError as e:
        return e.code, e.headers.get('Location')

print('\n6. Redirects:')
for test_url in ['http://ashali.com', 'https://ashali.com', 'https://www.ashali.com/blog/test-slug']:
    code, loc = test_redirect(test_url)
    print(f'   {test_url} -> {code} to {loc}')
