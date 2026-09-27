import urllib.request
import json
import urllib.parse

queries = [
    'Mutyalampadu',
    'Mutyalampadu, Vijayawada',
    'Mutyalampadu Village Part',
    'Vijayawada North',
    'NTR, Vijayawada',
    'Vijayawada'
]

for q in queries:
    url = f"https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'LandApp/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Query: '{q}' -> {len(data)} results")
            for r in data:
                print(f"   Name: {r.get('display_name')} | Lat: {r.get('lat')}, Lon: {r.get('lon')}")
    except Exception as e:
        print(f"Query: '{q}' -> Error: {e}")
