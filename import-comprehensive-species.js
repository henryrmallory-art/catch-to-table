const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

async function importComprehensiveData() {
  console.log('📦 Starting comprehensive fish species import...\n');

  // Read the comprehensive JSON data
  const jsonData = JSON.parse(
    fs.readFileSync('./fishing_regulations_data_2026.json', 'utf8')
  );

  console.log(`Data compiled: ${jsonData.metadata.compiled_date}`);
  console.log(`Sources: ${jsonData.metadata.sources.length} state agencies\n`);

  // Track what we're adding
  let speciesAdded = 0;
  let regulationsAdded = 0;
  const errors = [];

  // First, get existing jurisdictions
  const { data: jurisdictions } = await supabase
    .from('jurisdictions')
    .select('id, name');

  const jurisdictionMap = {};
  jurisdictions?.forEach(j => {
    jurisdictionMap[j.name] = j.id;
    // Also map state abbreviations to full names
    const stateNames = {
      'FL': 'Florida',
      'TX': 'Texas',
      'CA': 'California',
      'NC': 'North Carolina',
      'LA': 'Louisiana',
      'AK': 'Alaska'
    };
    Object.entries(stateNames).forEach(([abbr, name]) => {
      if (j.name === name) {
        jurisdictionMap[abbr] = j.id;
      }
    });
  });

  console.log(`Found ${Object.keys(jurisdictionMap).length} existing jurisdictions\n`);

  // Process each state's species
  for (const state of jsonData.states) {
    console.log(`\n🗺️  Processing ${state.state_name} (${state.state_abbreviation})...`);

    const jurisdictionId = jurisdictionMap[state.state_name] || jurisdictionMap[state.state_abbreviation];

    if (!jurisdictionId) {
      console.log(`   ⚠️  Jurisdiction not found for ${state.state_name}, skipping regulations`);
    }

    for (const speciesData of state.species) {
      // Check if species already exists
      const { data: existing } = await supabase
        .from('species')
        .select('id')
        .eq('common_name', speciesData.common_name)
        .single();

      let speciesId;

      if (existing) {
        speciesId = existing.id;
        console.log(`   ✓ ${speciesData.common_name} (already exists)`);
      } else {
        // Add new species
        const waterType = speciesData.water_type === 'anadromous' ? 'both' : (speciesData.water_type || 'saltwater');

        const { data: newSpecies, error } = await supabase
          .from('species')
          .insert({
            common_name: speciesData.common_name,
            scientific_name: speciesData.scientific_name,
            water_type: waterType,
            identifying_features: extractIdentifyingFeatures(speciesData),
            image_url: null, // Can be added later
          })
          .select()
          .single();

        if (error) {
          console.log(`   ❌ Error adding ${speciesData.common_name}: ${error.message}`);
          errors.push({ species: speciesData.common_name, error: error.message });
          continue;
        }

        speciesId = newSpecies.id;
        speciesAdded++;
        console.log(`   ✅ Added ${speciesData.common_name}`);
      }

      // Add regulation for this species in this state
      if (jurisdictionId && speciesId) {
        // Check if regulation already exists
        const { data: existingReg } = await supabase
          .from('regulations')
          .select('id')
          .eq('species_id', speciesId)
          .eq('jurisdiction_id', jurisdictionId)
          .single();

        if (existingReg) {
          console.log(`      → Regulation already exists`);
          continue;
        }

        const regulation = {
          species_id: speciesId,
          jurisdiction_id: jurisdictionId,
          min_size_inches: speciesData.minimum_size_inches,
          max_size_inches: speciesData.maximum_size_inches,
          bag_limit_per_person: parseBagLimit(speciesData.bag_limit_daily),
          fishing_mode: 'all', // Default to all modes
          season_open: parseSeasonDate(speciesData.season_open),
          season_close: parseSeasonDate(speciesData.season_closed),
          effective_date: speciesData.effective_dates ? `${speciesData.effective_dates}-01-01` : '2026-01-01',
          source_url: getSourceUrl(state.state_abbreviation),
          last_verified_at: new Date().toISOString(),
        };

        const { error: regError } = await supabase
          .from('regulations')
          .insert(regulation);

        if (regError) {
          console.log(`      ❌ Regulation error: ${regError.message}`);
        } else {
          regulationsAdded++;
          console.log(`      ✅ Added regulation`);
        }
      }
    }
  }

  // Process federal species
  if (jsonData.multi_state_federal_species) {
    console.log(`\n\n🌊 Processing Federal Waters Species...`);

    for (const speciesData of jsonData.multi_state_federal_species) {
      // Check if species already exists
      const { data: existing } = await supabase
        .from('species')
        .select('id')
        .eq('common_name', speciesData.common_name)
        .single();

      if (!existing) {
        const waterType = speciesData.water_type === 'anadromous' ? 'both' : (speciesData.water_type || 'saltwater');

        const { data: newSpecies, error } = await supabase
          .from('species')
          .insert({
            common_name: speciesData.common_name,
            scientific_name: speciesData.scientific_name,
            water_type: waterType,
            identifying_features: extractIdentifyingFeatures(speciesData),
            image_url: null,
          })
          .select()
          .single();

        if (!error) {
          speciesAdded++;
          console.log(`   ✅ Added ${speciesData.common_name}`);
        } else {
          console.log(`   ❌ Error adding ${speciesData.common_name}: ${error.message}`);
        }
      } else {
        console.log(`   ✓ ${speciesData.common_name} (already exists)`);
      }
    }
  }

  // Summary
  console.log('\n\n═══════════════════════════════════════════');
  console.log('📊 IMPORT SUMMARY');
  console.log('═══════════════════════════════════════════');

  const { count: totalSpecies } = await supabase
    .from('species')
    .select('*', { count: 'exact', head: true });

  const { count: totalRegulations } = await supabase
    .from('regulations')
    .select('*', { count: 'exact', head: true });

  console.log(`✅ Species added: ${speciesAdded}`);
  console.log(`✅ Regulations added: ${regulationsAdded}`);
  console.log(`\n📈 Total in database:`);
  console.log(`   Species: ${totalSpecies}`);
  console.log(`   Regulations: ${totalRegulations}`);
  console.log(`   Jurisdictions: ${Object.keys(jurisdictionMap).length / 2}`); // Divided by 2 because we have abbr + full name

  if (errors.length > 0) {
    console.log(`\n⚠️  Errors encountered: ${errors.length}`);
    errors.forEach(e => console.log(`   - ${e.species}: ${e.error}`));
  }

  console.log('\n✅ Import complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Add species images (image_url field)');
  console.log('   2. Expand regulations to remaining 44 states');
  console.log('   3. Add more species per state');
  console.log('   4. Implement PostGIS for geographic boundaries');
}

// Helper functions
function extractIdentifyingFeatures(speciesData) {
  const features = [];

  if (speciesData.special_regulations) {
    features.push(speciesData.special_regulations);
  }

  if (speciesData.geographic_restrictions) {
    features.push(`Geographic: ${speciesData.geographic_restrictions}`);
  }

  if (speciesData.minimum_size_notes) {
    features.push(speciesData.minimum_size_notes);
  }

  return features.length > 0 ? JSON.stringify(features) : null;
}

function parseBagLimit(bagLimit) {
  if (!bagLimit || typeof bagLimit !== 'string') return null;

  // Extract first number from string like "2 per person" or "1 per person in Atlantic"
  const match = bagLimit.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function parseSeasonDate(dateStr) {
  if (!dateStr || dateStr === 'Variable' || dateStr === 'Year-round') return null;

  // Try to extract date patterns like "June 1" or "2026-06-01"
  // For now, return null for complex cases - can be enhanced later
  return null;
}

function isYearRound(speciesData) {
  const openStr = (speciesData.season_open || '').toLowerCase();
  const closeStr = (speciesData.season_closed || '').toLowerCase();

  return openStr.includes('year-round') ||
         openStr.includes('open year') ||
         (openStr === 'all year' && !closeStr);
}

function buildSpecialRestrictions(speciesData) {
  const restrictions = [];

  if (speciesData.special_regulations) {
    restrictions.push(speciesData.special_regulations);
  }

  if (speciesData.bag_limit_notes) {
    restrictions.push(`Bag: ${speciesData.bag_limit_notes}`);
  }

  if (speciesData.minimum_size_notes) {
    restrictions.push(`Size: ${speciesData.minimum_size_notes}`);
  }

  if (speciesData.geographic_restrictions) {
    restrictions.push(`Location: ${speciesData.geographic_restrictions}`);
  }

  return restrictions.length > 0 ? restrictions.join('; ') : null;
}

function getSourceUrl(stateAbbr) {
  const urls = {
    'FL': 'https://myfwc.com/fishing/saltwater/recreational/',
    'TX': 'https://tpwd.texas.gov/regulations/outdoor-annual/fishing/',
    'CA': 'https://wildlife.ca.gov/Fishing',
    'NC': 'https://www.ncwildlife.org/fishing',
    'LA': 'https://www.wlf.louisiana.gov/subhome/recreational-fishing',
    'AK': 'https://www.adfg.alaska.gov/index.cfm?adfg=fishregulations.main',
  };
  return urls[stateAbbr] || null;
}

// Run the import
importComprehensiveData().catch(console.error);
