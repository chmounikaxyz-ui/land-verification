import urllib.request
import urllib.parse
import json

queries = [
    'Madhura Nagar Vijayawada',
    'Madhura Nagar, Devi Nagar, Vijayawada (NTR District)',
    'Banjara Hills Hyderabad',
    'Gajuwaka Visakhapatnam',
    'Tirupati'
]

for q in queries:
    url = f"https://photon.komoot.io/api/?q={urllib.parse.quote(q)}&limit=2"
    req = urllib.request.Request(url, headers={'User-Agent': 'LandApp/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            features = data.get('features', [])
            print(f"=== Query: '{q}' ===")
            for f in features:
                p = f.get('properties', {})
                geom = f.get('geometry', {})
                name = p.get('name')
                city = p.get('city') or p.get('county') or p.get('state')
                coords = geom.get('coordinates')
                print(f"  Result: {name}, {city} -> lat: {coords[1]}, lng: {coords[0]}")
    except Exception as e:
        print(f"Error for {q}:", e)
