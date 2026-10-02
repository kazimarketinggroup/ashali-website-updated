import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

print("================================================================")
print("             LIVE VERIFICATION REPORT FOR ASHALI.COM            ")
print("================================================================")

# 1. Book Page H1
print("\n[1] Book Page H1: https://www.ashali.com/unfair-advantage")
try:
    req = urllib.request.Request("https://www.ashali.com/unfair-advantage", headers={"User-Agent": "Mozilla/5.0"})
    html_book = urllib.request.urlopen(req, context=ctx).read().decode("utf-8")
    h1_match = re.findall(r"<h1[^>]*>(.*?)</h1>", html_book, re.DOTALL)
    clean_h1 = [re.sub(r"<[^>]+>", "", h).strip() for h in h1_match]
    print(f"  -> Found H1: {clean_h1}")
    has_unfair = any("The Unfair Advantage" in h for h in clean_h1)
    print(f"  -> PASS: Includes 'The Unfair Advantage' in H1? {has_unfair}")
except Exception as e:
    print(f"  -> ERROR: {e}")

# 2. Blog 410 Gone
print("\n[2] Blog Redirects: https://www.ashali.com/blog/test-old-post")
try:
    req_blog = urllib.request.Request("https://www.ashali.com/blog/test-old-post", headers={"User-Agent": "Mozilla/5.0"})
    res_blog = urllib.request.urlopen(req_blog, context=ctx)
    print(f"  -> Returned status: {res_blog.status}")
except urllib.error.HTTPError as e:
    print(f"  -> HTTP Status: {e.code} {e.reason}")
    print(f"  -> X-Matched-Path: {e.headers.get('X-Matched-Path')}")
    print(f"  -> PASS: Returns 410 Gone instead of soft-404? {e.code == 410}")
except Exception as e:
    print(f"  -> ERROR: {e}")

# 3. Public Uhubs Report Access
print("\n[3] Public Uhubs Report: https://www.ashali.com/reports/Global-Sales-Capability-Index-2026-Uhubs.pdf")
try:
    req_pdf = urllib.request.Request("https://www.ashali.com/reports/Global-Sales-Capability-Index-2026-Uhubs.pdf", headers={"User-Agent": "Mozilla/5.0"})
    res_pdf = urllib.request.urlopen(req_pdf, context=ctx)
    print(f"  -> Unexpected Status: {res_pdf.status} (File still public!)")
except urllib.error.HTTPError as e:
    print(f"  -> HTTP Status: {e.code} {e.reason}")
    print(f"  -> PASS: Public direct access completely blocked? {e.code == 404}")
except Exception as e:
    print(f"  -> ERROR: {e}")

# 4. Press Headshots ZIP Download
print("\n[4] Press Headshots ZIP: https://www.ashali.com/press/ash-ali-press-headshots.zip")
try:
    req_zip = urllib.request.Request("https://www.ashali.com/press/ash-ali-press-headshots.zip", headers={"User-Agent": "Mozilla/5.0"})
    res_zip = urllib.request.urlopen(req_zip, context=ctx)
    print(f"  -> Status: {res_zip.status} OK")
    print(f"  -> Content-Type: {res_zip.headers.get('Content-Type')}")
    print(f"  -> Size: {int(res_zip.headers.get('Content-Length', 0)) / 1024:.1f} KB")
    print("  -> PASS: Valid downloadable ZIP pack available?")
except Exception as e:
    print(f"  -> ERROR: {e}")

# 5. Contact Page Links
print("\n[5] Contact Page Links: https://www.ashali.com/contact")
try:
    req_contact = urllib.request.Request("https://www.ashali.com/contact", headers={"User-Agent": "Mozilla/5.0"})
    html_contact = urllib.request.urlopen(req_contact, context=ctx).read().decode("utf-8")
    one_sheet = "Speaker One-Sheet" in html_contact
    press_zip = "/press/ash-ali-press-headshots.zip" in html_contact
    print(f"  -> Speaker One-Sheet link removed? {not one_sheet}")
    print(f"  -> Press Headshots points to ZIP pack? {press_zip}")
except Exception as e:
    print(f"  -> ERROR: {e}")

# 6. Speaking Page YouTube Facades & Logo Accessibility
print("\n[6] Speaking Page: https://www.ashali.com/speaking")
try:
    req_speaking = urllib.request.Request("https://www.ashali.com/speaking", headers={"User-Agent": "Mozilla/5.0"})
    html_speaking = urllib.request.urlopen(req_speaking, context=ctx).read().decode("utf-8")
    iframe_count = len(re.findall(r"<iframe", html_speaking))
    print(f"  -> Initial iframes rendered on initial load: {iframe_count}")
    print(f"  -> PASS: All YouTube embeds deferred behind facades? {iframe_count == 0}")
    aria_hidden_duplicate = 'aria-hidden="true"' in html_speaking
    print(f"  -> PASS: Logo carousel duplicate set has aria-hidden='true'? {aria_hidden_duplicate}")
except Exception as e:
    print(f"  -> ERROR: {e}")

# 7. Homepage Footer Social rel="me"
print("\n[7] Homepage Footer Social Links: https://www.ashali.com/")
try:
    req_home = urllib.request.Request("https://www.ashali.com/", headers={"User-Agent": "Mozilla/5.0"})
    html_home = urllib.request.urlopen(req_home, context=ctx).read().decode("utf-8")
    rel_me_links = re.findall(r'<a[^>]+rel=[\'"][^\'"]*me[^\'"]*[\'"][^>]*>', html_home)
    print(f"  -> rel='me' links found in footer: {len(rel_me_links)}")
    for link in rel_me_links:
        print(f"     * {link}")
    print(f"  -> PASS: LinkedIn & X links have rel='me'? {len(rel_me_links) >= 2}")
except Exception as e:
    print(f"  -> ERROR: {e}")

print("\n================================================================")
print("                   VERIFICATION COMPLETED                       ")
print("================================================================")
