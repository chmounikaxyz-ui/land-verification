import requests
import re
import urllib3
urllib3.disable_warnings()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

r = requests.get('https://meebhoomi.ap.gov.in/Adangal/adangalhome.aspx', headers=headers, verify=False, timeout=15)
html = r.text

print("Scripts:", re.findall(r'<script[^>]+src=[\'"][^\'"]+[\'"]', html)[:10])
print("Form actions:", re.findall(r'<form[^>]+action=[\'"][^\'"]+[\'"]', html))

# Look for CitcaptchaImg details
match = re.search(r'<img[^>]+id=[\'"]CitcaptchaImg[\'"][^>]*>', html)
if match:
    print("CitcaptchaImg tag:", match.group(0))

# Search for where captcha is populated (in script tags)
scripts_content = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
for i, s in enumerate(scripts_content):
    if "captcha" in s.lower():
        print(f"--- Script {i} has captcha logic (len {len(s)}): ---")
        print(s[:600])
        print("...")
