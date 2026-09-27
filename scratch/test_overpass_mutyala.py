import urllib.request
import json
import urllib.parse

# Search overpass for any node/way with name matching mutyala in Vijayawada box
bbox = "16.48,80.58,16.58,80.70"
query = f"""
[out:json][timeout:15];
(
  node["name"~"Mutyala",i]({bbox});
  way["name"~"Mutyala",i]({bbox});
  relation["name"~"Mutyala",i]({bbox});
);
out center;
"""
url = "https://overpass-api.de/api/interpreter"
req = urllib.request.Request(url, data=f"data={urllib.parse.quote(query)}".encode(), headers={'User-Agent': 'LandApp/1.0'})
try:
    with urllib.request.urlopen(req) as resp:
        d = json.loads(resp.read().decode())
        print(f"Overpass matches for 'Mutyala': {len(d.get('elements', []))}")
        for e in d.get('elements', []):
            print("Element:", e.get('tags', {}).get('name'), e.get('lat') or e.get('center', {}).get('lat'), e.get('lon') or e.get('center', {}).get('lon'))
except Exception as e:
    print("Overpass error:", e)
