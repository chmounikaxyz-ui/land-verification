import urllib.request
import json
import urllib.parse

queries = [
    'Satyanarayanapuram, Vijayawada',
    'Mutyalampadu Park',
    '520011, India',
    'Vijayawada North Cabin'
]

for q in queries:
    url = f"https://nominatim.openstreetmap.org/search?format=json&limit=2&q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'LandApp/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Query: {q} => {len(data)}")
            for r in data:
                print(f"  {r['display_name']} ({r['lat']}, {r['lon']})")
    except Exception as e:
        print(f"Query: {q} error: {e}")
