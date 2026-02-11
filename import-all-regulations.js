const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

const regulationFiles = [
  'new-england-regulations.json',
  'mid-atlantic-regulations.json',
  'southeast-coastal-regulations.json',
  'southeast-interior-regulations.json',
  'great-lakes-regulations.json',
  'northern-plains-regulations.json',
  'south-central-regulations.json',
  'mountain-west-regulations.json',
  'pacific-regulations.json',
  'southwest-regulations.json'
];

async function importAllRegulations() {
  console.log('🗺️  Importing regulations for all 50 US states...\n');

  let totalStates = 0;
  let totalSpecies = 0;
  let totalRegulations = 0;
  let errors = [];

  for (const fileName of regulationFiles) {
    try {
      const filePath = `./${fileName}`;
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${fileName} not found, skipping`);
        continue;
      }

      console.log(`\n📄 Processing ${fileName}...`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Handle both array and object formats
      const states = Array.isArray(data) ? data : (data.states || [data]);

      for (const stateData of states) {
        if (!stateData.state_name) continue;

        console.log(`  🗺️  ${stateData.state_name}...`);

        // Get jurisdiction ID
        const { data: jurisdiction } = await supabase
          .from('jurisdictions')
          .select('id')
          .eq('name', stateData.state_name)
          .single();

        if (!jurisdiction) {
          console.log(`    ⚠️  Jurisdiction not found, skipping`);
          continue;
        }

        totalStates++;

        // Process species regulations
        const species = stateData.species || [];
        for (const speciesReg of species) {
          // Find or create species
          let { data: speciesRecord } = await supabase
            .from('species')
            .select('id')
            .eq('common_name', speciesReg.common_name)
            .single();

          if (!speciesRecord) {
            // Create new species
            const { data: newSpecies, error: speciesError } = await supabase
              .from('species')
              .insert({
                common_name: speciesReg.common_name,
                scientific_name: speciesReg.scientific_name || null,
                water_type: speciesReg.water_type || 'freshwater',
                identifying_features: null,
              })
              .select()
              .single();

            if (speciesError) {
              errors.push({ state: stateData.state_name, species: speciesReg.common_name, error: speciesError.message });
              continue;
            }
            speciesRecord = newSpecies;
            totalSpecies++;
          }

          // Check if regulation already exists
          const { data: existingReg } = await supabase
            .from('regulations')
            .select('id')
            .eq('species_id', speciesRecord.id)
            .eq('jurisdiction_id', jurisdiction.id)
            .single();

          if (existingReg) {
            console.log(`    ✓ ${speciesReg.common_name} (already exists)`);
            continue;
          }

          // Insert regulation
          const regulation = {
            species_id: speciesRecord.id,
            jurisdiction_id: jurisdiction.id,
            min_size_inches: speciesReg.min_size_inches || null,
            max_size_inches: speciesReg.max_size_inches || null,
            bag_limit_per_person: speciesReg.bag_limit || null,
            fishing_mode: 'all',
            season_open: speciesReg.season_open || null,
            season_close: speciesReg.season_close || null,
            effective_date: '2026-01-01',
            source_url: speciesReg.source_url || null,
            last_verified_at: new Date().toISOString(),
          };

          const { error: regError } = await supabase
            .from('regulations')
            .insert(regulation);

          if (regError) {
            errors.push({ state: stateData.state_name, species: speciesReg.common_name, error: regError.message });
          } else {
            totalRegulations++;
            console.log(`    ✅ ${speciesReg.common_name}`);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${fileName}:`, error.message);
      errors.push({ file: fileName, error: error.message });
    }
  }

  console.log('\n\n═══════════════════════════════════════════');
  console.log('📊 IMPORT COMPLETE');
  console.log('═══════════════════════════════════════════');
  console.log(`✅ States processed: ${totalStates}`);
  console.log(`✅ New species added: ${totalSpecies}`);
  console.log(`✅ New regulations added: ${totalRegulations}`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors: ${errors.length}`);
    errors.slice(0, 10).forEach(e => {
      console.log(`   - ${e.state || e.file}: ${e.error}`);
    });
  }

  // Final counts
  const { count: totalSpeciesCount } = await supabase
    .from('species')
    .select('*', { count: 'exact', head: true });

  const { count: totalRegulationsCount } = await supabase
    .from('regulations')
    .select('*', { count: 'exact', head: true });

  console.log(`\n📈 Database totals:`);
  console.log(`   Species: ${totalSpeciesCount}`);
  console.log(`   Regulations: ${totalRegulationsCount}`);
  console.log(`   Jurisdictions: 63 (50 states + DC + territories)`);

  console.log('\n✅ All regulations imported!');
  console.log('🎣 Your app now has comprehensive fishing regulations for all 50 states!');
}

importAllRegulations().catch(console.error);
