const q = `[out:json][timeout:25];
(
  node["amenity"](around:2500, 16.5062, 80.6480);
  way["amenity"](around:2500, 16.5062, 80.6480);
  node["shop"](around:2500, 16.5062, 80.6480);
  node["tourism"](around:2500, 16.5062, 80.6480);
  node["railway"](around:2500, 16.5062, 80.6480);
);
out center 35;`;

fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'LandVerificationApp/1.0'
  },
  body: 'data=' + encodeURIComponent(q)
})
  .then(res => res.json())
  .then(data => {
    console.log("Total elements returned:", data.elements?.length);
    if (data.elements) {
      const named = data.elements
        .map(e => ({
          name: e.tags?.name || e.tags?.['name:en'] || e.tags?.operator || e.tags?.brand,
          type: e.tags?.amenity || e.tags?.shop || e.tags?.tourism || e.tags?.railway,
          lat: e.lat || e.center?.lat,
          lng: e.lon || e.center?.lon
        }))
        .filter(e => e.name && e.lat && e.lng);
      console.log("Named elements with coordinates:", named.length);
      console.log(named.slice(0, 15));
    }
  })
  .catch(console.error);
