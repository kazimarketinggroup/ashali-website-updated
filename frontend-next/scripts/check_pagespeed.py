import urllib.request
import json
import sys

url = sys.argv[1] if len(sys.argv) > 1 else 'https://www.ashali.com'
api_url = f'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile'

print(f"Querying Google PageSpeed API for {url} (strategy=mobile)...")
req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read().decode())
        cats = data.get('lighthouseResult', {}).get('categories', {})
        print("\n=== CATEGORY SCORES ===")
        for cat_name, cat_val in cats.items():
            print(f"{cat_name.upper()}: {cat_val.get('score', 0) * 100:.0f}")
        
        audits = data.get('lighthouseResult', {}).get('audits', {})
        print("\n=== FAILING AUDITS (score < 1) ===")
        for k, v in audits.items():
            score = v.get('score')
            if score is not None and score < 1:
                title = v.get('title')
                display = v.get('displayValue', '')
                print(f"[{k}] (score={score}) {title} -> {display}")
                # print details if available
                details = v.get('details', {})
                items = details.get('items', [])
                if items:
                    for it in items[:3]:
                        # print some relevant keys
                        summary_keys = {key: it[key] for key in ['url', 'node', 'wastedMs', 'wastedBytes', 'totalBytes', 'source'] if key in it}
                        if summary_keys:
                            print(f"    item: {summary_keys}")
except Exception as e:
    print('Error:', e)
