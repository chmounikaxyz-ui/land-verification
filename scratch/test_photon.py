import urllib.request
import json
import urllib.parse

queries = [
    'Mutyalampadu',
    'Mutyalampadu Vijayawada',
    'ముత్యాలంపాడు',
    'Mutyalam Padu',
    'Mutvalampadu',
    'Mutyalampadu Village',
    'Vijayawada North'
]

print("--- PHOTON KOMOOT ---")
for q in queries:
    url = f"https://photon.komoot.io/api/?q={urllib.parse.quote(q)}&limit=3"
    req = urllib.request.Request(url, headers={'User-Agent': 'LandApp/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            features = data.get('features', [])
            print(f"Photon Query: '{q}' -> {len(features)} results")
            for f in features:
                props = f.get('properties', {})
                geom = f.get('geometry', {})
                print(f"   Name: {props.get('name')}, {props.get('city')}, {props.get('state')} | Coords: {geom.get('coordinates')}")
    except Exception as e:
        print(f"Photon Query: '{q}' -> Error: {e}")

print("\n--- NOMINATIM TELUGU ---")
for q in ['ముత్యాలంపాడు', 'Mutyalampadu, Andhra Pradesh']:
    url = f"https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=3&q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'LandApp/1.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Nominatim Query: '{q}' -> {len(data)} results")
            for r in data:
                print(f"   Name: {r.get('display_name')} | Lat: {r.get('lat')}, Lon: {r.get('lon')}")
    except Exception as e:
        print(f"Nominatim Query: '{q}' -> Error: {e}")
