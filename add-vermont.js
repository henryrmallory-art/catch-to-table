const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

async function addVermont() {
  console.log('🗺️  Adding Vermont perch regulations...\n');

  // Get Vermont jurisdiction
  const { data: vtJurisdiction } = await supabase
    .from('jurisdictions')
    .select('id')
    .eq('name', 'Vermont')
    .single();

  if (!vtJurisdiction) {
    console.log('❌ Vermont jurisdiction not found in database');
    return;
  }

  console.log('✓ Found Vermont jurisdiction\n');

  // Get perch species
  const perchSpecies = ['Yellow Perch', 'White Perch'];

  for (const perchName of perchSpecies) {
    const { data: species } = await supabase
      .from('species')
      .select('id')
      .eq('common_name', perchName)
      .single();

    if (!species) {
      console.log(`⚠️  ${perchName} not found, skipping`);
      continue;
    }

    // Check if regulation already exists
    const { data: existingReg } = await supabase
      .from('regulations')
      .select('id')
      .eq('species_id', species.id)
      .eq('jurisdiction_id', vtJurisdiction.id)
      .single();

    if (existingReg) {
      console.log(`✓ ${perchName} regulation already exists`);
      continue;
    }

    // Add regulation
    // Vermont: 50 panfish aggregate (includes perch), no size limit
    const { error } = await supabase
      .from('regulations')
      .insert({
        species_id: species.id,
        jurisdiction_id: vtJurisdiction.id,
        min_size_inches: null, // No minimum size
        max_size_inches: null,
        bag_limit_per_person: 50, // 50 panfish aggregate
        fishing_mode: 'all',
        effective_date: '2026-01-01',
        source_url: 'https://www.vtfishandwildlife.com/updated-fishing-regulations-overview',
        last_verified_at: new Date().toISOString(),
      });

    if (error) {
      console.log(`❌ Error adding ${perchName}:`, error.message);
    } else {
      console.log(`✅ Added ${perchName} regulation (50 panfish aggregate, no size limit)`);
    }
  }

  console.log('\n✅ Vermont perch regulations added!');
  console.log('Note: 50 fish aggregate includes all panfish (perch, bluegill, crappie, etc.)');
}

addVermont().catch(console.error);
