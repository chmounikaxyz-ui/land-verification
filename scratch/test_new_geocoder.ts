import { searchLocations, geocodeLocation, findInRevenueRegistry } from '../src/utils/geocoder.ts';

async function test() {
  console.log("=== TEST 1: findInRevenueRegistry ===");
  const test1 = findInRevenueRegistry("Mutyalampadu");
  console.log("Mutyalampadu found:", test1?.name, test1?.lat, test1?.lng);

  const testTelugu = findInRevenueRegistry("ముత్యాలంపాడు");
  console.log("Telugu Mutyalampadu found:", testTelugu?.name, testTelugu?.lat, testTelugu?.lng);

  console.log("\n=== TEST 2: searchLocations ===");
  const searchResults1 = await searchLocations("Mutyalampadu");
  console.log("searchLocations('Mutyalampadu'):", searchResults1.length, "results");
  searchResults1.forEach(r => console.log("  -", r.displayName, `(${r.lat}, ${r.lng}) [${r.source}]`));

  const searchResults2 = await searchLocations("VIJAYAWADA NORTH");
  console.log("searchLocations('VIJAYAWADA NORTH'):", searchResults2.length, "results");
  searchResults2.forEach(r => console.log("  -", r.displayName, `(${r.lat}, ${r.lng}) [${r.source}]`));

  console.log("\n=== TEST 3: geocodeLocation for form inputs ===");
  const formGeo = await geocodeLocation("Mutyalampadu Village Part", "VIJAYAWADA NORTH", "NTR");
  console.log("geocodeLocation result:", formGeo?.displayName, `(${formGeo?.lat}, ${formGeo?.lng})`);
}

test();
