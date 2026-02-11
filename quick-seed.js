const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sqnvnynvvkynubkyvekl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbnZueW52dmt5bnVia3l2ZWtsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDc2MDAxMiwiZXhwIjoyMDg2MzM2MDEyfQ.7LDKFxvMTudVVv4UylEPoNFYkBZ6_y-XH6zb45QRbP4'
);

const salt = [
  ['Red Snapper', 'Lutjanus campechanus', 'bright red', 'pointed snout'],
  ['Grouper', 'Epinephelus morio', 'large mouth', 'mottled brown-red'],
  ['Redfish', 'Sciaenops ocellatus', 'copper-bronze', 'black spot on tail'],
  ['Snook', 'Centropomus undecimalis', 'black lateral line', 'yellow fins'],
  ['Pompano', 'Trachinotus carolinus', 'deep body', 'yellow belly'],
  ['Yellowtail', 'Seriola lalandi', 'yellow tail', 'blue-green back'],
  ['Yellowfin Tuna', 'Thunnus albacares', 'bright yellow fins', 'torpedo shape'],
];

const fresh = [
  ['Largemouth Bass', 'Micropterus salmoides', 'dark horizontal band', 'large mouth'],
  ['Smallmouth Bass', 'Micropterus dolomieu', 'bronze color', 'vertical bars'],
  ['Bluegill', 'Lepomis macrochirus', 'dark ear flap', 'blue-purple sheen'],
  ['Crappie', 'Pomoxis nigromaculatus', 'black blotches', 'silver-green'],
  ['Yellow Perch', 'Perca flavescens', 'bright yellow', 'vertical dark bars'],
  ['Northern Pike', 'Esox lucius', 'long snout', 'green with light spots'],
  ['Walleye', 'Sander vitreus', 'white tip on tail', 'large glassy eyes'],
  ['Channel Catfish', 'Ictalurus punctatus', 'forked tail', 'black spots'],
  ['Rainbow Trout', 'Oncorhynchus mykiss', 'pink stripe', 'black spots on tail'],
  ['Brown Trout', 'Salmo trutta', 'red and black spots', 'golden-brown'],
];

async function seed() {
  const saltwater = salt.map(([n, s, f1, f2]) => ({
    common_name: n, scientific_name: s, water_type: 'saltwater',
    flavor_profile: 'mild_sweet', identifying_features: [f1, f2]
  }));

  const freshwater = fresh.map(([n, s, f1, f2]) => ({
    common_name: n, scientific_name: s, water_type: 'freshwater',
    flavor_profile: 'mild_sweet', identifying_features: [f1, f2]
  }));

  const all = [...saltwater, ...freshwater];
  console.log(`Adding ${all.length} species...`);

  const { data, error } = await supabase.from('species').insert(all);

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success!');
    const { count } = await supabase.from('species').select('*', { count: 'exact', head: true });
    console.log(`Total species: ${count}`);
  }
}

seed();
