const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function fetchPureRealPOIs(lat, lng) {
  console.log(`Querying 100% Pure Real OpenStreetMap Data for (${lat}, ${lng})...`);
  
  const query = `[out:json][timeout:10];
(
  node["amenity"](around:1000, ${lat}, ${lng});
  way["amenity"](around:1000, ${lat}, ${lng});
  node["highway"="bus_stop"](around:1000, ${lat}, ${lng});
  node["shop"](around:1000, ${lat}, ${lng});
  node["tourism"](around:1000, ${lat}, ${lng});
  node["leisure"](around:1000, ${lat}, ${lng});
);
out center 100;`;

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`Found ${data.elements?.length || 0} total OSM elements.`);
      
      const realPois = [];
      const seen = new Set();
      
      (data.elements || []).forEach(el => {
        const name = el.tags?.name || el.tags?.['name:en'] || el.tags?.operator || el.tags?.brand;
        const pLat = el.lat || el.center?.lat;
        const pLng = el.lon || el.center?.lon;
        if (!name || !pLat || !pLng) return;
        
        const lower = name.toLowerCase();
        if (seen.has(lower)) return;
        
        // Exclude temples, shrines, restaurants, tiffin centers
        if (lower.includes('temple') || lower.includes('shrine') || lower.includes('church') || 
            lower.includes('mosque') || lower.includes('worship') || lower.includes('tiffin') || 
            lower.includes('restaurant') || lower.includes('cafe') || lower.includes('tea') || 
            lower.includes('mess') || lower.includes('fast food') || lower.includes('dosa') || 
            lower.includes('hotel') || lower.includes('bakery') || lower.includes('bar')) {
          return;
        }
        
        seen.add(lower);
        const distMeters = Math.hypot((pLat - lat) * 111320, (pLng - lng) * 111320 * Math.cos(lat * Math.PI / 180));
        if (distMeters > 980) return;
        
        let type = 'shop';
        const amenity = (el.tags?.amenity || '').toLowerCase();
        const highway = (el.tags?.highway || '').toLowerCase();
        const leisure = (el.tags?.leisure || '').toLowerCase();
        
        if (amenity.includes('hospital') || amenity.includes('clinic')) type = 'hospital';
        else if (amenity.includes('school') || amenity.includes('college')) type = 'school';
        else if (highway.includes('bus_stop') || amenity.includes('bus')) type = 'bus';
        else if (amenity.includes('bank') || amenity.includes('atm')) type = 'bank';
        
        realPois.push({ name, type, lat: pLat, lng: pLng, distMeters });
      });
      
      console.log("=== PURE REAL OSM PLACES ===");
      console.log(JSON.stringify(realPois, null, 2));
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
}

fetchPureRealPOIs(17.7126, 83.3160);
