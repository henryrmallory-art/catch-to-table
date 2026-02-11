const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

// All 50 US States + DC + Major Territories
const allJurisdictions = [
  // States A-M
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana',

  // States N-W
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',

  // DC and Territories
  'District of Columbia',
  'Puerto Rico',
  'US Virgin Islands',
  'Guam',
  'American Samoa',
  'Northern Mariana Islands'
];

async function addAllJurisdictions() {
  console.log(`Adding all US jurisdictions (${allJurisdictions.length} total)...\n`);

  // Check what exists
  const { data: existing } = await supabase
    .from('jurisdictions')
    .select('name');

  const existingNames = new Set(existing?.map(j => j.name) || []);

  const toAdd = allJurisdictions
    .filter(name => !existingNames.has(name))
    .map(name => ({
      name,
      jurisdiction_type: name.includes('Territory') || name.includes('Islands') || name.includes('Rico') || name.includes('Samoa') || name.includes('Guam') ? 'territory' : 'state'
    }));

  if (toAdd.length === 0) {
    console.log('✓ All jurisdictions already exist!');
  } else {
    const { data, error } = await supabase
      .from('jurisdictions')
      .insert(toAdd)
      .select();

    if (error) {
      console.error('Error:', error.message);
      return;
    }

    console.log(`✓ Added ${data.length} new jurisdictions`);
  }

  const { count } = await supabase
    .from('jurisdictions')
    .select('*', { count: 'exact', head: true });

  console.log(`\n✅ Total jurisdictions: ${count}`);
  console.log('All 50 US states + DC + 5 territories covered!');
}

addAllJurisdictions();
