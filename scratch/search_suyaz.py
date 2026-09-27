import urllib.request
import json
import urllib.parse

# Search overpass in Vijayawada for anything with "suyaz" or "farm"
query = """
[out:json][timeout:15];
(
  node["name"~"suyaz",i](16.45,80.55,16.60,80.75);
  way["name"~"suyaz",i](16.45,80.55,16.60,80.75);
  node["name"~"farm",i](16.50,80.60,16.56,80.68);
  way["name"~"farm",i](16.50,80.60,16.56,80.68);
);
out center;
"""
url = "https://overpass-api.de/api/interpreter"
req = urllib.request.Request(url, data=f"data={urllib.parse.quote(query)}".encode(), headers={'User-Agent': 'LandApp/1.0'})
try:
    with urllib.request.urlopen(req) as resp:
        d = json.loads(resp.read().decode())
        print(f"Elements found: {len(d.get('elements', []))}")
        for e in d.get('elements', []):
            print(e.get('tags', {}).get('name'), e.get('lat') or e.get('center', {}).get('lat'), e.get('lon') or e.get('center', {}).get('lon'))
except Exception as e:
    print("Error:", e)
