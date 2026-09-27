import urllib.request
import urllib.parse
import json

def test():
    q = "Madhura Nagar, Devi Nagar, Vijayawada (NTR District)"
    # Also test cleaned versions
    queries = [
        q,
        "Madhura Nagar, Vijayawada",
        "Madhura Nagar",
        "Madhura Nagar Devi Nagar Vijayawada"
    ]
    for query in queries:
        url = f"https://photon.komoot.io/api/?q={urllib.parse.quote(query)}&limit=3"
        req = urllib.request.Request(url, headers={'User-Agent': 'LandApp/1.0'})
        try:
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode())
                features = data.get('features', [])
                print(f"Query: '{query}' -> {len(features)} items")
                for f in features[:2]:
                    p = f.get('properties', {})
                    g = f.get('geometry', {})
                    print("   ", p.get('name'), p.get('city'), p.get('state'), g.get('coordinates'))
        except Exception as e:
            print("Error:", e)

test()
