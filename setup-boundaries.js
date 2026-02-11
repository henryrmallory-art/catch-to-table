const { createClient } = require('@supabase/supabase-js');
const https = require('https');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

function fetchGeoJSON() {
  return new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    });
  });
}

// Simple point-in-polygon algorithm
function isPointInPolygon(point, polygon) {
  const [lng, lat] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect = ((yi > lat) !== (yj > lat)) &&
      (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

async function setupBoundaries() {
  console.log('🗺️  Setting up state boundaries...\n');

  // Fetch GeoJSON data
  const geoJSON = await fetchGeoJSON();
  console.log(`✅ Downloaded boundary data for ${geoJSON.features.length} states/territories\n`);

  // Create a lookup object for efficient searching
  const stateBoundaries = {};

  for (const feature of geoJSON.features) {
    const stateName = feature.properties.name;
    if (!stateName || stateName === 'District of Columbia') continue;

    stateBoundaries[stateName] = {
      geometry: feature.geometry,
      coordinates: feature.geometry.coordinates
    };
  }

  // Store as a JSON file that can be loaded by the app
  const fs = require('fs');
  fs.writeFileSync(
    './public/state-boundaries.json',
    JSON.stringify(stateBoundaries, null, 2)
  );

  console.log('✅ Saved state boundaries to public/state-boundaries.json');

  // Also add perch for New Hampshire
  console.log('\n🐟 Adding Yellow Perch to database...\n');

  const perchSpecies = [
    {
      common_name: 'Yellow Perch',
      scientific_name: 'Perca flavescens',
      water_type: 'freshwater',
      identifying_features: JSON.stringify([
        'Yellow to brass-colored body with 6-8 dark vertical bars',
        'Two separate dorsal fins',
        'Orange to bright red pelvic and anal fins',
        'Typically 6-12 inches long'
      ]),
    },
    {
      common_name: 'White Perch',
      scientific_name: 'Morone americana',
      water_type: 'both',
      identifying_features: JSON.stringify([
        'Silvery-white to dark gray-green color',
        'No vertical bars (unlike yellow perch)',
        'Deep compressed body',
        'Found in both fresh and brackish water'
      ]),
    }
  ];

  for (const perch of perchSpecies) {
    const { data: existing } = await supabase
      .from('species')
      .select('id')
      .eq('common_name', perch.common_name)
      .single();

    if (!existing) {
      const { data, error } = await supabase
        .from('species')
        .insert(perch)
        .select();

      if (error) {
        console.log(`❌ Error adding ${perch.common_name}:`, error.message);
      } else {
        console.log(`✅ Added ${perch.common_name}`);
      }
    } else {
      console.log(`✓ ${perch.common_name} already exists`);
    }
  }

  // Add NH perch regulations
  const { data: nhJurisdiction } = await supabase
    .from('jurisdictions')
    .select('id')
    .eq('name', 'New Hampshire')
    .single();

  if (nhJurisdiction) {
    for (const perch of perchSpecies) {
      const { data: species } = await supabase
        .from('species')
        .select('id')
        .eq('common_name', perch.common_name)
        .single();

      if (species) {
        const { data: existingReg } = await supabase
          .from('regulations')
          .select('id')
          .eq('species_id', species.id)
          .eq('jurisdiction_id', nhJurisdiction.id)
          .single();

        if (!existingReg) {
          const { error } = await supabase
            .from('regulations')
            .insert({
              species_id: species.id,
              jurisdiction_id: nhJurisdiction.id,
              min_size_inches: null,
              max_size_inches: null,
              bag_limit_per_person: 25,
              fishing_mode: 'all',
              effective_date: '2026-01-01',
              source_url: 'https://www.eregulations.com/newhampshire/fishing/freshwater',
              last_verified_at: new Date().toISOString(),
            });

          if (!error) {
            console.log(`✅ Added ${perch.common_name} regulation for NH (25 bag limit, no size limit)`);
          }
        } else {
          console.log(`✓ ${perch.common_name} regulation already exists for NH`);
        }
      }
    }
  }

  console.log('\n✅ Setup complete!');
  console.log('\nNow updating the legality API to use the boundary data...');
}

setupBoundaries().catch(console.error);
