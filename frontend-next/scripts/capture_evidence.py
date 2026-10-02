import os
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\Mahadi\.gemini\antigravity-ide\brain\f32efef1-2925-4a86-aaa7-5aa5b29688e2"

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    
    # 1. Contact Form
    print("Navigating to /contact...")
    page.goto("https://www.ashali.com/contact", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)
    page.locator("form").first.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(output_dir, "evidence_contact_form.png"))
    print("Saved evidence_contact_form.png")

    # 2. Keynotes Logo Wall (/speaking)
    print("Navigating to /speaking...")
    page.goto("https://www.ashali.com/speaking", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(output_dir, "evidence_keynotes_logos.png"))
    print("Saved evidence_keynotes_logos.png")

    # 3. Footer Newsletter
    print("Navigating to /...")
    page.goto("https://www.ashali.com/", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)
    page.locator("footer").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(output_dir, "evidence_footer_newsletter.png"))
    print("Saved evidence_footer_newsletter.png")

    # 4. Book Page
    print("Navigating to /unfair-advantage...")
    page.goto("https://www.ashali.com/unfair-advantage", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)
    page.locator("#retailers").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    page.screenshot(path=os.path.join(output_dir, "evidence_book_retailers.png"))
    print("Saved evidence_book_retailers.png")

    # 5. Impact Hero
    print("Navigating to /impact...")
    page.goto("https://www.ashali.com/impact", wait_until="domcontentloaded")
    page.wait_for_timeout(2500)
    page.screenshot(path=os.path.join(output_dir, "evidence_impact_hero.png"))
    print("Saved evidence_impact_hero.png")

    browser.close()
    print("All screenshots successfully captured!")
