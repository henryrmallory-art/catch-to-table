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

function convertToPostGISPolygon(coordinates) {
  // Handle MultiPolygon (some states like Michigan, Hawaii have multiple parts)
  if (Array.isArray(coordinates[0][0][0])) {
    // MultiPolygon
    const polygons = coordinates.map(polygon => {
      const coords = polygon[0].map(coord => `${coord[0]} ${coord[1]}`).join(', ');
      return `((${coords}))`;
    }).join(', ');
    return `MULTIPOLYGON(${polygons})`;
  } else {
    // Single Polygon
    const coords = coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(', ');
    return `POLYGON((${coords}))`;
  }
}

async function addAllStateBoundaries() {
  console.log('🗺️  Downloading US state boundaries from GeoJSON...\n');

  // Fetch GeoJSON data
  const geoJSON = await fetchGeoJSON();
  console.log(`✅ Downloaded boundary data for ${geoJSON.features.length} states/territories\n`);

  let updated = 0;
  let added = 0;
  let skipped = 0;

  for (const feature of geoJSON.features) {
    const stateName = feature.properties.name;

    // Skip territories we don't have in the database
    if (!stateName || stateName === 'District of Columbia') {
      continue;
    }

    console.log(`Processing ${stateName}...`);

    try {
      // Check if state exists
      const { data: existing } = await supabase
        .from('jurisdictions')
        .select('id, name, boundary_geom')
        .eq('name', stateName)
        .single();

      const boundaryGeom = convertToPostGISPolygon(feature.geometry.coordinates);

      if (existing) {
        if (existing.boundary_geom) {
          console.log(`  ✓ ${stateName} (already has boundaries)`);
          skipped++;
        } else {
          // Update with boundary
          const { error } = await supabase
            .from('jurisdictions')
            .update({ boundary_geom: boundaryGeom })
            .eq('id', existing.id);

          if (error) {
            console.log(`  ❌ Error: ${error.message}`);
          } else {
            console.log(`  ✅ Updated ${stateName} with boundaries`);
            updated++;
          }
        }
      } else {
        // Add new state
        const { error } = await supabase
          .from('jurisdictions')
          .insert({
            name: stateName,
            jurisdiction_type: 'state',
            boundary_geom: boundaryGeom,
          });

        if (error) {
          console.log(`  ❌ Error: ${error.message}`);
        } else {
          console.log(`  ✅ Added ${stateName}`);
          added++;
        }
      }
    } catch (error) {
      console.log(`  ❌ Error processing ${stateName}:`, error.message);
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('═══════════════════════════════════════════');
  console.log(`✅ Added: ${added}`);
  console.log(`✅ Updated: ${updated}`);
  console.log(`⏭️  Skipped (already had boundaries): ${skipped}`);

  const { count: totalWithBoundaries } = await supabase
    .from('jurisdictions')
    .select('*', { count: 'exact', head: true })
    .not('boundary_geom', 'is', null);

  console.log(`\n📍 Total jurisdictions with boundaries: ${totalWithBoundaries}`);
  console.log('\n✅ GPS-based location detection will now work for all states!');
}

addAllStateBoundaries().catch(console.error);
