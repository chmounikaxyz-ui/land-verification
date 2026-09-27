import requests
import urllib3
urllib3.disable_warnings()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}

r = requests.get('https://meebhoomi.ap.gov.in/Adangal/adangalhome.aspx', headers=headers, verify=False, timeout=15)
print("Final URL:", r.url)
print("History:", [h.url for h in r.history])
