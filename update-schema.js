const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

async function updateSchema() {
  console.log('📋 Updating database schema...\n');

  try {
    // Add missing columns to species table
    console.log('Adding columns to species table...');

    await supabase.rpc('execute_sql', {
      query: `
        ALTER TABLE species
        ADD COLUMN IF NOT EXISTS min_size_reference numeric,
        ADD COLUMN IF NOT EXISTS max_size_reference numeric;
      `
    });

    console.log('✅ Updated species table\n');

    // Add missing column to regulations table
    console.log('Adding columns to regulations table...');

    await supabase.rpc('execute_sql', {
      query: `
        ALTER TABLE regulations
        ADD COLUMN IF NOT EXISTS special_restrictions text;
      `
    });

    console.log('✅ Updated regulations table\n');

    console.log('✅ Schema update complete!');
    console.log('\nRun: node import-comprehensive-species.js');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Note: RPC function may not exist. Add columns manually in Supabase:');
    console.log('\nFor species table:');
    console.log('  ALTER TABLE species ADD COLUMN IF NOT EXISTS min_size_reference numeric;');
    console.log('  ALTER TABLE species ADD COLUMN IF NOT EXISTS max_size_reference numeric;');
    console.log('\nFor regulations table:');
    console.log('  ALTER TABLE regulations ADD COLUMN IF NOT EXISTS special_restrictions text;');
  }
}

updateSchema();
