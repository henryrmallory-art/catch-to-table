const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

const states = [
  'Florida', 'Texas', 'California', 'North Carolina', 'Louisiana', 'Alaska',
  'Alabama', 'Georgia', 'South Carolina', 'Mississippi', 'Oregon', 'Washington',
  'Michigan', 'Minnesota', 'Wisconsin', 'Maine', 'Massachusetts', 'Rhode Island',
  'Connecticut', 'New Jersey', 'Delaware', 'Maryland', 'Virginia'
];

async function addJurisdictions() {
  console.log(`Adding ${states.length} US state jurisdictions...\n`);

  const jurisdictions = states.map(name => ({
    name,
    jurisdiction_type: 'state'
  }));

  const { data, error } = await supabase
    .from('jurisdictions')
    .insert(jurisdictions)
    .select();

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log(`✓ Added ${data.length} states`);

  const { count } = await supabase
    .from('jurisdictions')
    .select('*', { count: 'exact', head: true });

  console.log(`\nTotal jurisdictions in database: ${count}`);
  console.log('\n✅ Your app can now check regulations by location!');
}

addJurisdictions();
