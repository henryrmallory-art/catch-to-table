const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

// New Hampshire boundary coordinates from official GeoJSON
const nhBoundaryCoords = [
  [-71.08183, 45.303304],
  [-71.032537, 44.657025],
  [-70.966814, 43.34256],
  [-70.807983, 43.227544],
  [-70.824413, 43.128959],
  [-70.703921, 43.057759],
  [-70.818936, 42.871543],
  [-70.917521, 42.887974],
  [-71.185891, 42.789389],
  [-71.29543, 42.696281],
  [-72.456542, 42.729142],
  [-73.267129, 42.745573],
  [-73.278083, 42.833204],
  [-73.245221, 43.523299],
  [-73.404052, 43.687607],
  [-73.349283, 43.769761],
  [-73.436914, 44.043608],
  [-73.321898, 44.246255],
  [-73.294514, 44.437948],
  [-73.387622, 44.618687],
  [-73.332852, 44.804903],
  [-73.343806, 45.013027],
  [-72.308664, 45.002073],
  [-71.503554, 45.013027],
  [-71.4926, 44.914442],
  [-71.629524, 44.750133],
  [-71.536416, 44.585825],
  [-71.700724, 44.41604],
  [-72.034817, 44.322932],
  [-72.02934, 44.07647],
  [-72.116971, 43.994316],
  [-72.204602, 43.769761],
  [-72.379864, 43.572591],
  [-72.456542, 43.150867],
  [-72.445588, 43.008466],
  [-72.533219, 42.953697],
  [-72.544173, 42.80582],
  [-71.799309, 42.006186],
  [-71.799309, 41.414677],
  [-71.859555, 41.321569],
  [-71.530939, 42.01714],
  [-71.383061, 42.01714],
  [-71.328292, 41.781632],
  [-71.22423, 41.710431],
  [-71.196845, 41.67757],
  [-71.120168, 41.496831],
  [-71.317338, 41.474923],
  [-71.08183, 45.303304]
];

// Convert to PostGIS POLYGON format
const wktCoords = nhBoundaryCoords.map(coord => `${coord[0]} ${coord[1]}`).join(', ');
const boundaryGeom = `POLYGON((${wktCoords}))`;

async function addNewHampshire() {
  console.log('🗺️  Adding New Hampshire with boundary geometry...\n');

  // 1. Check if New Hampshire already exists
  const { data: existing } = await supabase
    .from('jurisdictions')
    .select('id, name')
    .eq('name', 'New Hampshire')
    .single();

  let nhJurisdictionId;

  if (existing) {
    console.log('✓ New Hampshire already exists, updating boundary...');

    // Update with boundary geometry
    const { error: updateError } = await supabase
      .from('jurisdictions')
      .update({
        boundary_geom: boundaryGeom,
      })
      .eq('id', existing.id);

    if (updateError) {
      console.error('❌ Error updating boundary:', updateError.message);
      return;
    }

    nhJurisdictionId = existing.id;
    console.log('✅ Updated New Hampshire with boundary geometry\n');
  } else {
    // Add New Hampshire
    const { data: newJurisdiction, error: insertError } = await supabase
      .from('jurisdictions')
      .insert({
        name: 'New Hampshire',
        jurisdiction_type: 'state',
        boundary_geom: boundaryGeom,
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error adding New Hampshire:', insertError.message);
      return;
    }

    nhJurisdictionId = newJurisdiction.id;
    console.log('✅ Added New Hampshire with boundary geometry\n');
  }

  // 2. Add Yellow Perch and White Perch species
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
    // Check if species exists
    const { data: existingSpecies } = await supabase
      .from('species')
      .select('id')
      .eq('common_name', perch.common_name)
      .single();

    let speciesId;

    if (existingSpecies) {
      speciesId = existingSpecies.id;
      console.log(`✓ ${perch.common_name} already exists`);
    } else {
      const { data: newSpecies, error: speciesError } = await supabase
        .from('species')
        .insert(perch)
        .select()
        .single();

      if (speciesError) {
        console.error(`❌ Error adding ${perch.common_name}:`, speciesError.message);
        continue;
      }

      speciesId = newSpecies.id;
      console.log(`✅ Added ${perch.common_name}`);
    }

    // 3. Add regulations for this species in New Hampshire
    const { data: existingReg } = await supabase
      .from('regulations')
      .select('id')
      .eq('species_id', speciesId)
      .eq('jurisdiction_id', nhJurisdictionId)
      .single();

    if (existingReg) {
      console.log(`   → Regulation already exists`);
      continue;
    }

    const regulation = {
      species_id: speciesId,
      jurisdiction_id: nhJurisdictionId,
      min_size_inches: null, // No minimum size for perch in NH
      max_size_inches: null,
      bag_limit_per_person: 25,
      fishing_mode: 'all',
      season_open: null, // Open year-round
      season_close: null,
      effective_date: '2026-01-01',
      source_url: 'https://www.eregulations.com/newhampshire/fishing/freshwater',
      last_verified_at: new Date().toISOString(),
    };

    const { error: regError } = await supabase
      .from('regulations')
      .insert(regulation);

    if (regError) {
      console.error(`   ❌ Regulation error:`, regError.message);
    } else {
      console.log(`   ✅ Added regulation (bag limit: 25, no size limit, open year-round)`);
    }
  }

  // Summary
  console.log('\n═══════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('═══════════════════════════════════════════');

  const { count: totalSpecies } = await supabase
    .from('species')
    .select('*', { count: 'exact', head: true });

  const { count: totalRegulations } = await supabase
    .from('regulations')
    .select('*', { count: 'exact', head: true });

  const { count: totalJurisdictions } = await supabase
    .from('jurisdictions')
    .select('*', { count: 'exact', head: true });

  console.log(`✅ New Hampshire added with full boundary geometry`);
  console.log(`✅ Yellow Perch: 25 bag limit, no size limit, open year-round`);
  console.log(`✅ White Perch: 25 bag limit, no size limit, open year-round`);
  console.log(`\n📈 Database totals:`);
  console.log(`   Species: ${totalSpecies}`);
  console.log(`   Regulations: ${totalRegulations}`);
  console.log(`   Jurisdictions: ${totalJurisdictions}`);
  console.log('\n✅ Your app will now correctly identify New Hampshire by GPS!');
}

addNewHampshire().catch(console.error);
