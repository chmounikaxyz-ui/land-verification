export interface GeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
  village?: string;
  mandal?: string;
  district?: string;
  source?: string;
}

export interface RevenueLocationRecord {
  name: string;
  village: string;
  mandal: string;
  district: string;
  lat: number;
  lng: number;
  aliases: string[];
  pincode?: string;
  notes?: string;
}

// Comprehensive registry of key Andhra Pradesh & Telangana Revenue Locations
export const KNOWN_REVENUE_LOCATIONS: RevenueLocationRecord[] = [
  {
    name: 'Mutyalampadu Village Part, Vijayawada North',
    village: 'Mutyalampadu Village Part',
    mandal: 'VIJAYAWADA NORTH',
    district: 'NTR',
    lat: 16.5242,
    lng: 80.6385,
    pincode: '520011',
    aliases: [
      'mutyalampadu',
      'mutyalam padu',
      'mutyalampadu village',
      'mutyalampadu village part',
      'ముత్యాలంపాడు',
      'mutyalampadu vijayawada',
      'suyaz form house',
      '520011',
      'mutyalampadu north',
      'vijayawada north mutyalampadu'
    ],
    notes: 'MeeBhoomi AP Revenue Village Part (Satyanarayanapuram / Vijayawada North)'
  },
  {
    name: 'Vijayawada North (Ayodhya Nagar / Central)',
    village: 'Ayodhya Nagar',
    mandal: 'VIJAYAWADA NORTH',
    district: 'NTR',
    lat: 16.5313,
    lng: 80.6281,
    pincode: '520001',
    aliases: [
      'vijayawada north',
      'vijayawada north cabin',
      'విజయవాడ ఉత్తరం',
      'north vijayawada'
    ]
  },
  {
    name: 'Devi Nagar, Vijayawada',
    village: 'Devi Nagar',
    mandal: 'Vijayawada (Urban)',
    district: 'NTR',
    lat: 16.5334,
    lng: 80.6451,
    pincode: '520001',
    aliases: ['devi nagar', 'devinagar', 'devi nagar vijayawada', 'devi nagar ntr']
  },
  {
    name: 'Madhura Nagar, Vijayawada',
    village: 'Madhura Nagar',
    mandal: 'Vijayawada (Urban)',
    district: 'NTR',
    lat: 16.5271,
    lng: 80.6504,
    pincode: '520011',
    aliases: [
      'madhura nagar',
      'madhuranagar',
      'madhura nagar vijayawada',
      'madhuranagar vijayawada',
      'madhura nagar ntr',
      'madhura nagar devi nagar'
    ]
  },
  {
    name: 'Benz Circle, Vijayawada',
    village: 'Benz Circle',
    mandal: 'Vijayawada (East)',
    district: 'NTR',
    lat: 16.4998,
    lng: 80.6534,
    pincode: '520010',
    aliases: ['benz circle', 'benz circle vijayawada']
  },
  {
    name: 'Governorpet, Vijayawada',
    village: 'Governorpet',
    mandal: 'Vijayawada (Urban)',
    district: 'NTR',
    lat: 16.5133,
    lng: 80.6275,
    pincode: '520002',
    aliases: ['governorpet', 'governor pet']
  },
  {
    name: 'Gannavaram, Krishna District',
    village: 'Gannavaram',
    mandal: 'Gannavaram',
    district: 'Krishna',
    lat: 16.5362,
    lng: 80.7968,
    pincode: '521101',
    aliases: ['gannavaram', 'vijayawada airport']
  },
  {
    name: 'Moghalrajpuram / Siddhartha Nagar, Vijayawada',
    village: 'Moghalrajpuram',
    mandal: 'Vijayawada (Urban)',
    district: 'NTR',
    lat: 16.5062,
    lng: 80.6480,
    pincode: '520010',
    aliases: ['moghalrajpuram', 'siddhartha nagar', 'siddhartha college', 'gudavallivari st']
  },
  {
    name: 'Satyanarayanapuram, Vijayawada',
    village: 'Satyanarayanapuram',
    mandal: 'VIJAYAWADA NORTH',
    district: 'NTR',
    lat: 16.5239,
    lng: 80.6379,
    pincode: '520011',
    aliases: ['satyanarayanapuram', 'satyanarayana puram', 'sn puram', 'sn puram vijayawada']
  },
  {
    name: 'Gunadala, Vijayawada',
    village: 'Gunadala',
    mandal: 'Vijayawada (Urban)',
    district: 'NTR',
    lat: 16.5218,
    lng: 80.6654,
    pincode: '520004',
    aliases: ['gunadala', 'gunadala vijayawada']
  },
  {
    name: 'Ajit Singh Nagar, Vijayawada',
    village: 'Ajit Singh Nagar',
    mandal: 'VIJAYAWADA NORTH',
    district: 'NTR',
    lat: 16.5410,
    lng: 80.6350,
    pincode: '520015',
    aliases: ['ajit singh nagar', 'singh nagar', 'singh nagar vijayawada']
  },
  {
    name: 'Bhavanipuram, Vijayawada',
    village: 'Bhavanipuram',
    mandal: 'Vijayawada (Urban)',
    district: 'NTR',
    lat: 16.5284,
    lng: 80.5962,
    pincode: '520012',
    aliases: ['bhavanipuram', 'bhavani puram']
  },
  {
    name: 'Gollapudi, Vijayawada Rural',
    village: 'Gollapudi',
    mandal: 'Vijayawada (Rural)',
    district: 'NTR',
    lat: 16.5492,
    lng: 80.5794,
    pincode: '521225',
    aliases: ['gollapudi', 'gollapudi vijayawada']
  },
  {
    name: 'Patamata, Vijayawada East',
    village: 'Patamata',
    mandal: 'Vijayawada (East)',
    district: 'NTR',
    lat: 16.4950,
    lng: 80.6620,
    pincode: '520010',
    aliases: ['patamata', 'patamata lanka', 'patamata vijayawada']
  },
  {
    name: 'Auto Nagar, Vijayawada',
    village: 'Auto Nagar',
    mandal: 'Vijayawada (East)',
    district: 'NTR',
    lat: 16.4980,
    lng: 80.6780,
    pincode: '520007',
    aliases: ['auto nagar', 'autonagar']
  },
  {
    name: 'Penamaluru, Krishna District',
    village: 'Penamaluru',
    mandal: 'Penamaluru',
    district: 'Krishna',
    lat: 16.4674,
    lng: 80.7061,
    pincode: '521139',
    aliases: ['penamaluru', 'penamalur']
  },
  {
    name: 'Mangalagiri, Guntur District',
    village: 'Mangalagiri',
    mandal: 'Mangalagiri',
    district: 'Guntur',
    lat: 16.4320,
    lng: 80.5600,
    pincode: '522503',
    aliases: ['mangalagiri']
  },
  {
    name: 'Amaravati Capital Region (Thullur)',
    village: 'Thullur',
    mandal: 'Thullur',
    district: 'Guntur',
    lat: 16.5131,
    lng: 80.5165,
    pincode: '522237',
    aliases: ['amaravati', 'amravati', 'thullur', 'amaravati capital']
  },
  {
    name: 'Gachibowli Financial District, Hyderabad',
    village: 'Gachibowli',
    mandal: 'Serilingampally',
    district: 'Rangareddy',
    lat: 17.4435,
    lng: 78.3772,
    pincode: '500032',
    aliases: ['gachibowli', 'financial district', 'gachibowli hyderabad']
  },
  {
    name: 'Beach Road Sector 4, Visakhapatnam',
    village: 'Beach Road',
    mandal: 'Maharanipeta',
    district: 'Visakhapatnam',
    lat: 17.7126,
    lng: 83.3157,
    pincode: '530002',
    aliases: ['beach road', 'rk beach', 'beach road vizag', 'visakhapatnam beach road']
  },
  {
    name: 'Highland Heights, Quthbullapur (Medchal)',
    village: 'Highland Heights',
    mandal: 'Quthbullapur',
    district: 'Medchal',
    lat: 17.5120,
    lng: 78.4310,
    pincode: '500055',
    aliases: ['highland heights', 'quthbullapur', 'qutbullapur']
  },
  {
    name: 'Industrial Zone B-2, Balnagar (Rangareddy)',
    village: 'Industrial Zone',
    mandal: 'Balnagar',
    district: 'Rangareddy',
    lat: 17.4810,
    lng: 78.3980,
    pincode: '500037',
    aliases: ['balnagar', 'balanagar', 'balnagar industrial zone']
  }
];

/**
 * Clean and normalise location query by stripping Telugu characters,
 * administrative suffix words, and common revenue terms.
 */
export function cleanLocationQuery(raw: string): string {
  if (!raw) return '';
  return raw
    // Map specific Telugu words
    .replace(/ముత్యాలంపాడు/g, 'Mutyalampadu')
    .replace(/విజయవాడ\s*ఉత్తరం/g, 'Vijayawada North')
    .replace(/విజయవాడ/g, 'Vijayawada')
    .replace(/ఎన్\.?టి\.?ఆర్/g, 'NTR')
    // Strip other non-Latin Telugu characters
    .replace(/[\u0C00-\u0C7F]/g, ' ')
    // Strip punctuation
    .replace(/[,/:;_-]/g, ' ')
    // Strip administrative noise words
    .replace(/\b(village part|village|mandal|district|dist|taluk|sub-division|sy no|survey no|khata no|katha)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Find exact or partial match in internal AP/Telangana Revenue Location registry.
 * Prioritizes the primary token (e.g. "Madhura Nagar" from "Madhura Nagar, Devi Nagar, Vijayawada")
 * so secondary context words never falsely hijack the search target.
 */
export function findInRevenueRegistry(query: string): RevenueLocationRecord | null {
  if (!query || query.trim().length < 2) return null;
  const rawLower = query.toLowerCase().trim();
  const qClean = cleanLocationQuery(query).toLowerCase();
  
  // Extract primary search token (first part if comma-separated, e.g. "Madhura Nagar" from "Madhura Nagar, Devi Nagar...")
  const firstCommaPart = rawLower.split(',')[0].trim();
  const primaryClean = cleanLocationQuery(firstCommaPart).toLowerCase();

  // Tier 1: Exact alias match with primary token
  if (primaryClean.length >= 2) {
    for (const record of KNOWN_REVENUE_LOCATIONS) {
      if (record.aliases.some(alias => alias === primaryClean || alias === firstCommaPart)) {
        return record;
      }
    }
  }

  // Tier 2: Exact alias match with full query
  for (const record of KNOWN_REVENUE_LOCATIONS) {
    if (record.aliases.some(alias => alias === qClean || alias === rawLower)) {
      return record;
    }
  }

  // Tier 3: Primary token substring match (prioritizing the first token entered by the user)
  if (primaryClean.length >= 3) {
    for (const record of KNOWN_REVENUE_LOCATIONS) {
      if (
        record.aliases.some(alias => alias.includes(primaryClean) || primaryClean.includes(alias)) ||
        record.village.toLowerCase().includes(primaryClean) ||
        primaryClean.includes(record.village.toLowerCase())
      ) {
        return record;
      }
    }
  }

  // Tier 4: Specific aliases (e.g. mutyala)
  if (qClean.includes('mutyala')) {
    const mutyala = KNOWN_REVENUE_LOCATIONS.find(r => r.aliases.includes('mutyalampadu'));
    if (mutyala) return mutyala;
  }

  // Tier 5: Substring match with full query (only if the record's main village starts the query or is a major part)
  for (const record of KNOWN_REVENUE_LOCATIONS) {
    const vLower = record.village.toLowerCase();
    if (
      record.aliases.some(alias => qClean.startsWith(alias) || alias.startsWith(qClean)) ||
      qClean.startsWith(vLower)
    ) {
      return record;
    }
  }

  return null;
}

/**
 * Multi-tier search function:
 * 1. Checks internal revenue catalog (instant 0ms, 100% reliable for verified AP/TG revenue records)
 * 2. Queries Photon Komoot API (fast OpenStreetMap GIS geocoder, zero rate-limit 429 errors)
 * 3. Fallback to OpenStreetMap Nominatim with cleaned variations
 * 4. Deduplicates and formats coordinates
 */
export async function searchLocations(rawQuery: string): Promise<GeocodeResult[]> {
  const query = rawQuery.trim();
  if (!query || query.length < 2) return [];

  const results: GeocodeResult[] = [];
  const seenCoords = new Set<string>();

  const addResult = (res: GeocodeResult) => {
    const key = `${res.lat.toFixed(4)}_${res.lng.toFixed(4)}`;
    if (!seenCoords.has(key)) {
      seenCoords.add(key);
      results.push(res);
    }
  };

  // 1. Instant check in Known Revenue Registry
  const localMatch = findInRevenueRegistry(query);
  if (localMatch) {
    addResult({
      lat: localMatch.lat,
      lng: localMatch.lng,
      displayName: `${localMatch.name} (AP Land Records Verified)`,
      village: localMatch.village,
      mandal: localMatch.mandal,
      district: localMatch.district,
      source: 'AP Land Revenue Registry'
    });
  }

  // Also check if any other known locations match as secondary options
  const qClean = cleanLocationQuery(query).toLowerCase();
  for (const record of KNOWN_REVENUE_LOCATIONS) {
    if (record !== localMatch) {
      if (record.aliases.some(a => a.includes(qClean) || (qClean.length >= 4 && a.startsWith(qClean)))) {
        addResult({
          lat: record.lat,
          lng: record.lng,
          displayName: `${record.name} (${record.district} District)`,
          village: record.village,
          mandal: record.mandal,
          district: record.district,
          source: 'AP Land Revenue Registry'
        });
      }
    }
  }

  // 2. Query Photon Komoot API (high-speed, resilient OSM search)
  try {
    const primaryPart = query.split(',')[0].trim();
    const photonQueries = [query];
    if (primaryPart && primaryPart !== query) {
      photonQueries.push(primaryPart);
      photonQueries.push(`${primaryPart}, Vijayawada`);
    }
    const cleanQ = cleanLocationQuery(query);
    if (cleanQ && !photonQueries.includes(cleanQ)) {
      photonQueries.push(cleanQ);
    }

    for (const pQ of photonQueries) {
      if (results.length >= 6) break;
      try {
        const resp = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(pQ)}&limit=5`,
          { headers: { Accept: 'application/json' } }
        );
        if (resp.ok) {
          const data = await resp.json();
          if (data && Array.isArray(data.features)) {
            data.features.forEach((feat: any) => {
              const coords = feat.geometry?.coordinates;
              const props = feat.properties || {};
              if (coords && coords.length >= 2) {
                const lon = parseFloat(coords[0]);
                const lat = parseFloat(coords[1]);
                if (!isNaN(lat) && !isNaN(lon)) {
                  const name = props.name || props.street || '';
                  const city = props.city || props.town || props.county || props.district || '';
                  const state = props.state || '';
                  const district = (props.district || props.county || city || 'NTR').replace(/District/gi, '').trim();
                  const village = props.locality || props.suburb || props.district || name;

                  const labelParts = [name, props.locality, city, state].filter(Boolean);
                  const display = labelParts.length > 0 ? labelParts.join(', ') : `${name} (${district})`;

                  addResult({
                    lat,
                    lng: lon,
                    displayName: display,
                    village: village || name,
                    mandal: props.district || props.county || city || 'Vijayawada (Urban)',
                    district: district || 'NTR',
                    source: 'Photon GIS'
                  });
                }
              }
            });
          }
        }
      } catch (photonErr) {
        console.warn(`Photon query "${pQ}" failed:`, photonErr);
      }
    }
  } catch (err) {
    console.error("Photon search error:", err);
  }

  // 3. Fallback to OpenStreetMap Nominatim if fewer than 3 results
  if (results.length < 3) {
    try {
      const cleanQ = cleanLocationQuery(query);
      const queriesToTry = [cleanQ];
      if (!cleanQ.toLowerCase().includes('andhra pradesh') && !cleanQ.toLowerCase().includes('telangana')) {
        queriesToTry.push(`${cleanQ}, Andhra Pradesh`);
      }

      for (const q of queriesToTry) {
        if (results.length >= 5) break;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=4&q=${encodeURIComponent(q)}`,
            { headers: { 'User-Agent': 'LandVerificationApp/1.0' } }
          );
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
              data.forEach((item: any) => {
                const lat = parseFloat(item.lat);
                const lon = parseFloat(item.lon);
                if (!isNaN(lat) && !isNaN(lon)) {
                  const addr = item.address || {};
                  const village = addr.village || addr.suburb || addr.neighbourhood || addr.city_district || addr.residential || addr.town || addr.city || '';
                  const mandal = addr.county || addr.suburb || '';
                  let district = addr.state_district || addr.city || addr.state || '';
                  district = district.replace(/District/gi, '').trim();

                  addResult({
                    lat,
                    lng: lon,
                    displayName: item.display_name,
                    village,
                    mandal,
                    district,
                    source: 'OpenStreetMap'
                  });
                }
              });
            }
          }
        } catch (nomErr) {
          console.warn(`Nominatim geocode query "${q}" failed:`, nomErr);
        }
      }
    } catch (err) {
      console.error("Geocoding Nominatim fallback failed:", err);
    }
  }

  return results;
}

/**
 * Geocode a specific Village, Mandal, and District combination entered in the form fields.
 * Returns the resolved coordinates and formatted location.
 */
export async function geocodeLocation(
  village?: string,
  mandal?: string,
  district?: string
): Promise<GeocodeResult | null> {
  const parts = [village, mandal, district].filter(p => p && p.trim()).map(p => p!.trim());
  if (parts.length === 0) return null;

  const combinedQuery = parts.join(', ');

  // 1. Fast check in Known Revenue Registry
  const localMatch = findInRevenueRegistry(combinedQuery) || 
                     findInRevenueRegistry(village || '') || 
                     findInRevenueRegistry(mandal || '');

  if (localMatch) {
    return {
      lat: localMatch.lat,
      lng: localMatch.lng,
      displayName: `${village || localMatch.village}, ${mandal || localMatch.mandal}, ${district || localMatch.district}`,
      village: village || localMatch.village,
      mandal: mandal || localMatch.mandal,
      district: district || localMatch.district,
      source: 'AP Land Revenue Registry'
    };
  }

  // 2. Query Photon API first
  try {
    const photonQuery = `${parts.join(' ')}, Andhra Pradesh`;
    const resp = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(photonQuery)}&limit=1`,
      { headers: { Accept: 'application/json' } }
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data && Array.isArray(data.features) && data.features.length > 0) {
        const feat = data.features[0];
        const coords = feat.geometry?.coordinates;
        if (coords && coords.length >= 2) {
          const lon = parseFloat(coords[0]);
          const lat = parseFloat(coords[1]);
          const props = feat.properties || {};
          return {
            lat,
            lng: lon,
            displayName: [props.name, props.city, props.state].filter(Boolean).join(', ') || combinedQuery,
            village: village || props.name || '',
            mandal: mandal || props.district || props.city || '',
            district: district || props.district || 'NTR',
            source: 'Photon GIS'
          };
        }
      }
    }
  } catch (e) {
    console.warn("Photon geocode fallback error:", e);
  }

  // 3. Query Nominatim with progressive fallbacks
  const cleanQ = cleanLocationQuery(combinedQuery);
  const attempts = [
    `${cleanQ}, Andhra Pradesh, India`,
    `${cleanLocationQuery(village || '')}, ${cleanLocationQuery(mandal || '')}, Andhra Pradesh`,
    `${cleanLocationQuery(mandal || '')}, ${cleanLocationQuery(district || '')}, Andhra Pradesh`,
    `${cleanLocationQuery(district || '')}, Andhra Pradesh`
  ].filter(a => a && a.trim().length > 3);

  for (const query of attempts) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(query)}`,
        { headers: { 'User-Agent': 'LandVerificationApp/1.0' } }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          const lat = parseFloat(item.lat);
          const lon = parseFloat(item.lon);
          if (!isNaN(lat) && !isNaN(lon)) {
            return {
              lat,
              lng: lon,
              displayName: item.display_name,
              village: village || '',
              mandal: mandal || '',
              district: district || '',
              source: 'OpenStreetMap'
            };
          }
        }
      }
    } catch (e) {
      console.warn(`Geocode attempt "${query}" failed:`, e);
    }
  }

  return null;
}
