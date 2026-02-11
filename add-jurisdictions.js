const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

const jurisdictions = [
  {
    name: 'Florida',
    jurisdiction_type: 'state'
  },
  {
    jurisdiction_name: 'Texas State Waters',
    jurisdiction_type: 'state',
    state_code: 'TX',
    boundary_geom: `POLYGON((-106.6 36.5, -93.5 36.5, -93.5 25.8, -106.6 25.8, -106.6 36.5))`,
    effective_date: '2026-01-01'
  },
  {
    jurisdiction_name: 'California State Waters',
    jurisdiction_type: 'state',
    state_code: 'CA',
    boundary_geom: `POLYGON((-124.4 42.0, -114.1 42.0, -114.1 32.5, -124.4 32.5, -124.4 42.0))`,
    effective_date: '2026-01-01'
  },
  {
    jurisdiction_name: 'North Carolina State Waters',
    jurisdiction_type: 'state',
    state_code: 'NC',
    boundary_geom: `POLYGON((-84.3 36.6, -75.4 36.6, -75.4 33.8, -84.3 33.8, -84.3 36.6))`,
    effective_date: '2026-01-01'
  },
  {
    jurisdiction_name: 'Louisiana State Waters',
    jurisdiction_type: 'state',
    state_code: 'LA',
    boundary_geom: `POLYGON((-94.0 33.0, -88.8 33.0, -88.8 28.9, -94.0 28.9, -94.0 33.0))`,
    effective_date: '2026-01-01'
  },
  {
    jurisdiction_name: 'Alaska State Waters',
    jurisdiction_type: 'state',
    state_code: 'AK',
    boundary_geom: `POLYGON((-179.0 72.0, -129.0 72.0, -129.0 51.0, -179.0 51.0, -179.0 72.0))`,
    effective_date: '2026-01-01'
  }
];

// Sample regulations for each state - just a few key species
const regulations = [
  // Florida - Red Snapper
  {
    species_id: null, // Will be filled with actual ID
    jurisdiction_id: null, // Will be filled with actual ID
    min_size_inches: 16,
    bag_limit_per_person: 2,
    fishing_mode: 'private_boat',
    season_open: '2026-06-01',
    season_close: '2026-07-30',
    source_url: 'https://myfwc.com/fishing/saltwater/recreational/',
    last_verified_at: new Date().toISOString()
  },
  // Texas - Spotted Seatrout (Speckled Trout)
  {
    species_id: null,
    jurisdiction_id: null,
    min_size_inches: 15,
    max_size_inches: 25,
    bag_limit_per_person: 5,
    fishing_mode: 'shore',
    source_url: 'https://tpwd.texas.gov/regulations/outdoor-annual/fishing/',
    last_verified_at: new Date().toISOString()
  },
  // California - Rockfish
  {
    species_id: null,
    jurisdiction_id: null,
    min_size_inches: 12,
    bag_limit_per_person: 10,
    fishing_mode: 'private_boat',
    season_open: '2026-04-01',
    season_close: '2026-12-31',
    source_url: 'https://wildlife.ca.gov/Fishing',
    last_verified_at: new Date().toISOString()
  },
];

async function importData() {
  console.log('Importing jurisdictions and regulations...\n');

  // 1. Import jurisdictions
  console.log('Adding 6 US state jurisdictions...');
  const { data: jurisdictionData, error: jError } = await supabase
    .from('jurisdictions')
    .insert(jurisdictions)
    .select();

  if (jError) {
    console.error('Error adding jurisdictions:', jError.message);
    return;
  }

  console.log(`✓ Added ${jurisdictionData.length} jurisdictions\n`);

  // 2. Get species IDs for regulations
  const { data: speciesData } = await supabase
    .from('species')
    .select('id, common_name')
    .in('common_name', ['Red Snapper', 'Speckled Trout', 'Rockfish']);

  const speciesMap = {};
  speciesData?.forEach(s => {
    speciesMap[s.common_name] = s.id;
  });

  // 3. Add a few sample regulations
  console.log('Adding sample regulations...');

  const regsToInsert = [
    {
      ...regulations[0],
      species_id: speciesMap['Red Snapper'],
      jurisdiction_id: jurisdictionData.find(j => j.state_code === 'FL')?.id
    },
    {
      ...regulations[1],
      species_id: speciesMap['Speckled Trout'],
      jurisdiction_id: jurisdictionData.find(j => j.state_code === 'TX')?.id
    },
    {
      ...regulations[2],
      species_id: speciesMap['Rockfish'],
      jurisdiction_id: jurisdictionData.find(j => j.state_code === 'CA')?.id
    }
  ].filter(r => r.species_id && r.jurisdiction_id);

  if (regsToInsert.length > 0) {
    const { data: regData, error: rError } = await supabase
      .from('regulations')
      .insert(regsToInsert);

    if (rError) {
      console.error('Error adding regulations:', rError.message);
    } else {
      console.log(`✓ Added ${regsToInsert.length} sample regulations\n`);
    }
  }

  // 4. Summary
  console.log('=== SUMMARY ===');
  const { count: jCount } = await supabase
    .from('jurisdictions')
    .select('*', { count: 'exact', head: true });

  const { count: rCount } = await supabase
    .from('regulations')
    .select('*', { count: 'exact', head: true });

  console.log(`Total jurisdictions: ${jCount}`);
  console.log(`Total regulations: ${rCount}`);
  console.log('\nYour app can now check legality by location!');
}

importData().catch(console.error);
