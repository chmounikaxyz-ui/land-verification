import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const lat = 16.5062;
const lng = 80.6480;

const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&key=${apiKey}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("Status:", data.status);
    console.log("Results count:", data.results?.length);
    if (data.results) {
      console.log(data.results.slice(0, 5).map(p => ({
        name: p.name,
        type: p.types[0],
        location: p.geometry.location,
        vicinity: p.vicinity
      })));
    }
  })
  .catch(console.error);
