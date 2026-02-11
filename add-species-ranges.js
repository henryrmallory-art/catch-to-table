const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

// Define which species are found in which regions
const speciesRanges = {
  // Saltwater - Atlantic Coast
  'Red Snapper': ['coastal-atlantic', 'coastal-gulf'],
  'Gag Grouper': ['coastal-atlantic', 'coastal-gulf'],
  'Red Grouper': ['coastal-atlantic', 'coastal-gulf'],
  'Black Grouper': ['coastal-atlantic', 'coastal-gulf'],
  'Mahi-Mahi': ['coastal-atlantic', 'coastal-gulf', 'coastal-pacific'],
  'Spotted Seatrout': ['coastal-atlantic', 'coastal-gulf'],
  'Red Drum': ['coastal-atlantic', 'coastal-gulf'],
  'Striped Bass': ['coastal-atlantic', 'freshwater-northeast', 'freshwater-southeast'],
  'Bluefish': ['coastal-atlantic'],
  'Summer Flounder': ['coastal-atlantic'],
  'Winter Flounder': ['coastal-atlantic'],
  'Southern Flounder': ['coastal-atlantic', 'coastal-gulf'],
  'Blue Marlin': ['coastal-atlantic', 'coastal-gulf'],
  'White Marlin': ['coastal-atlantic'],
  'Sailfish': ['coastal-atlantic', 'coastal-gulf', 'coastal-pacific'],
  'Yellowfin Tuna': ['coastal-atlantic', 'coastal-gulf', 'coastal-pacific'],
  'Blackfin Tuna': ['coastal-atlantic', 'coastal-gulf'],
  'Albacore Tuna': ['coastal-atlantic', 'coastal-pacific'],
  'Atlantic Bluefin Tuna': ['coastal-atlantic'],

  // Saltwater - Pacific Coast
  'Rockfish': ['coastal-pacific'],
  'Pacific Halibut': ['coastal-pacific'],
  'Lingcod': ['coastal-pacific'],

  // Freshwater - Nationwide
  'Largemouth Bass': ['freshwater-nationwide'],
  'Smallmouth Bass': ['freshwater-nationwide'],
  'Spotted Bass': ['freshwater-south', 'freshwater-midwest'],
  'Channel Catfish': ['freshwater-nationwide'],
  'Flathead Catfish': ['freshwater-nationwide'],

  // Freshwater - Trout (cold water)
  'Rainbow Trout': ['freshwater-nationwide'],
  'Brown Trout': ['freshwater-nationwide'],
  'Brook Trout': ['freshwater-northeast', 'freshwater-mountain'],
  'Cutthroat Trout': ['freshwater-mountain', 'freshwater-pacific'],
  'Apache Trout': ['freshwater-mountain'],
  'Gila Trout': ['freshwater-mountain'],

  // Freshwater - Regional
  'Walleye': ['freshwater-north', 'freshwater-great-lakes'],
  'Northern Pike': ['freshwater-north', 'freshwater-great-lakes'],
  'Yellow Perch': ['freshwater-nationwide'],
  'White Perch': ['freshwater-northeast', 'freshwater-great-lakes'],

  // Anadromous
  'Steelhead': ['coastal-pacific', 'freshwater-pacific', 'freshwater-great-lakes'],
  'Landlocked Salmon': ['freshwater-northeast'],
  'King Salmon': ['coastal-pacific', 'freshwater-pacific'],
  'Coho Salmon': ['coastal-pacific', 'freshwater-pacific', 'freshwater-great-lakes'],
  'Sockeye Salmon': ['coastal-pacific', 'freshwater-pacific'],
};

// Map states to regions
const stateRegions = {
  // Northeast Atlantic Coast
  'Maine': ['coastal-atlantic', 'freshwater-northeast'],
  'New Hampshire': ['coastal-atlantic', 'freshwater-northeast'],
  'Vermont': ['freshwater-northeast'],
  'Massachusetts': ['coastal-atlantic', 'freshwater-northeast'],
  'Rhode Island': ['coastal-atlantic', 'freshwater-northeast'],
  'Connecticut': ['coastal-atlantic', 'freshwater-northeast'],
  'New York': ['coastal-atlantic', 'freshwater-northeast', 'freshwater-great-lakes'],
  'New Jersey': ['coastal-atlantic', 'freshwater-northeast'],
  'Pennsylvania': ['freshwater-northeast', 'freshwater-great-lakes'],
  'Delaware': ['coastal-atlantic', 'freshwater-northeast'],
  'Maryland': ['coastal-atlantic', 'freshwater-northeast'],

  // Southeast Atlantic & Gulf Coast
  'Virginia': ['coastal-atlantic', 'freshwater-southeast'],
  'North Carolina': ['coastal-atlantic', 'freshwater-southeast'],
  'South Carolina': ['coastal-atlantic', 'freshwater-southeast'],
  'Georgia': ['coastal-atlantic', 'coastal-gulf', 'freshwater-southeast'],
  'Florida': ['coastal-atlantic', 'coastal-gulf', 'freshwater-southeast'],
  'Alabama': ['coastal-gulf', 'freshwater-southeast'],
  'Mississippi': ['coastal-gulf', 'freshwater-south'],
  'Louisiana': ['coastal-gulf', 'freshwater-south'],
  'Texas': ['coastal-gulf', 'freshwater-south'],

  // Southeast Interior
  'West Virginia': ['freshwater-southeast'],
  'Kentucky': ['freshwater-southeast'],
  'Tennessee': ['freshwater-southeast'],
  'Arkansas': ['freshwater-south'],
  'Oklahoma': ['freshwater-south'],

  // Great Lakes
  'Ohio': ['freshwater-great-lakes', 'freshwater-midwest'],
  'Michigan': ['freshwater-great-lakes', 'freshwater-north'],
  'Indiana': ['freshwater-great-lakes', 'freshwater-midwest'],
  'Illinois': ['freshwater-great-lakes', 'freshwater-midwest'],
  'Wisconsin': ['freshwater-great-lakes', 'freshwater-north'],
  'Minnesota': ['freshwater-great-lakes', 'freshwater-north'],

  // Northern Plains
  'North Dakota': ['freshwater-north'],
  'South Dakota': ['freshwater-north'],
  'Nebraska': ['freshwater-midwest'],
  'Kansas': ['freshwater-midwest'],
  'Iowa': ['freshwater-midwest'],
  'Missouri': ['freshwater-midwest'],

  // Mountain West
  'Montana': ['freshwater-mountain', 'freshwater-north'],
  'Wyoming': ['freshwater-mountain'],
  'Colorado': ['freshwater-mountain'],
  'Utah': ['freshwater-mountain'],
  'Idaho': ['freshwater-mountain', 'freshwater-pacific'],
  'Nevada': ['freshwater-mountain'],
  'New Mexico': ['freshwater-mountain'],
  'Arizona': ['freshwater-mountain'],

  // Pacific Coast
  'Washington': ['coastal-pacific', 'freshwater-pacific', 'freshwater-mountain'],
  'Oregon': ['coastal-pacific', 'freshwater-pacific', 'freshwater-mountain'],
  'California': ['coastal-pacific', 'freshwater-pacific', 'freshwater-mountain'],
  'Alaska': ['coastal-pacific', 'freshwater-pacific', 'freshwater-north'],
  'Hawaii': ['coastal-pacific'],
};

async function addSpeciesRanges() {
  console.log('🗺️  Adding species geographic ranges...\n');

  // Get all species
  const { data: allSpecies } = await supabase
    .from('species')
    .select('id, common_name');

  let updated = 0;

  for (const species of allSpecies || []) {
    const ranges = speciesRanges[species.common_name];

    if (ranges) {
      const { error } = await supabase
        .from('species')
        .update({
          geographic_range: ranges,
          habitat_description: getHabitatDescription(ranges)
        })
        .eq('id', species.id);

      if (error) {
        console.log(`❌ ${species.common_name}: ${error.message}`);
      } else {
        console.log(`✅ ${species.common_name}: ${ranges.join(', ')}`);
        updated++;
      }
    } else {
      // Default to freshwater-nationwide for unknown species
      const { error } = await supabase
        .from('species')
        .update({
          geographic_range: ['freshwater-nationwide'],
          habitat_description: 'Found in freshwater across the United States'
        })
        .eq('id', species.id);

      if (!error) {
        console.log(`⚠️  ${species.common_name}: defaulted to freshwater-nationwide`);
        updated++;
      }
    }
  }

  console.log(`\n✅ Updated ${updated} species with geographic ranges`);
  console.log('\nNow updating species identification to check location compatibility...');
}

function getHabitatDescription(ranges) {
  const descriptions = {
    'coastal-atlantic': 'Atlantic coastal waters',
    'coastal-gulf': 'Gulf of Mexico coastal waters',
    'coastal-pacific': 'Pacific coastal waters',
    'freshwater-northeast': 'Freshwater in Northeastern US',
    'freshwater-southeast': 'Freshwater in Southeastern US',
    'freshwater-south': 'Freshwater in Southern US',
    'freshwater-midwest': 'Freshwater in Midwestern US',
    'freshwater-north': 'Freshwater in Northern US',
    'freshwater-mountain': 'Freshwater in Mountain West',
    'freshwater-pacific': 'Freshwater in Pacific Northwest',
    'freshwater-great-lakes': 'Great Lakes and tributaries',
    'freshwater-nationwide': 'Freshwater nationwide'
  };

  return ranges.map(r => descriptions[r] || r).join(', ');
}

addSpeciesRanges().then(() => {
  console.log('\n📋 State-Region mapping ready for location validation');
  console.log('Export stateRegions for use in API:');
  console.log(JSON.stringify(stateRegions, null, 2));
}).catch(console.error);
