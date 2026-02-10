-- ============================================
-- MVP SPECIES (Top 10 Northeast Saltwater)
-- ============================================
INSERT INTO species (common_name, scientific_name, species_group, water_type, is_hms, flavor_profile, identifying_features, handling_notes) VALUES
('Striped Bass', 'Morone saxatilis', 'pelagic', 'both', false, 'Mild, flaky, white',
 '{"key_marks": ["Horizontal dark stripes along silver body", "Large mouth", "Two dorsal fins"], "confusable_with": ["Hybrid Striped Bass", "White Perch"]}',
 '{"bleed": true, "ice_method": "ice_slurry", "gut_timing": "immediately", "fillet_style": "skin_on"}'),

('Bluefish', 'Pomatomus saltatrix', 'pelagic', 'saltwater', false, 'Strong, oily, dark',
 '{"key_marks": ["Blue-green back", "Sharp teeth", "Forked tail"], "confusable_with": ["False Albacore"]}',
 '{"bleed": true, "ice_method": "ice_slurry", "gut_timing": "immediately", "fillet_style": "skin_off"}'),

('Summer Flounder (Fluke)', 'Paralichthys dentatus', 'flatfish', 'saltwater', false, 'Mild, sweet, delicate',
 '{"key_marks": ["Left-eyed flatfish", "Brown/olive top with spots", "Large mouth"], "confusable_with": ["Winter Flounder", "Windowpane Flounder"]}',
 '{"bleed": false, "ice_method": "ice_slurry", "gut_timing": "soon", "fillet_style": "skin_off"}'),

('Black Sea Bass', 'Centropristis striata', 'reef', 'saltwater', false, 'Mild, firm, white',
 '{"key_marks": ["Dark gray/black body", "Large dorsal fin", "Blue highlights near eyes"], "confusable_with": ["Tautog"]}',
 '{"bleed": false, "ice_method": "ice_slurry", "gut_timing": "soon", "fillet_style": "skin_on"}'),

('Tautog (Blackfish)', 'Tautoga onitis', 'reef', 'saltwater', false, 'Mild, firm, white',
 '{"key_marks": ["Blunt face", "Thick lips", "Dark mottled body", "Strong teeth"], "confusable_with": ["Black Sea Bass", "Cunner"]}',
 '{"bleed": false, "ice_method": "crushed_ice", "gut_timing": "later_ok", "fillet_style": "skin_off"}'),

('Scup (Porgy)', 'Stenotomus chrysops', 'reef', 'saltwater', false, 'Mild, slightly sweet',
 '{"key_marks": ["Silver, compressed body", "Spiny dorsal fin", "Small mouth"], "confusable_with": ["Pinfish"]}',
 '{"bleed": false, "ice_method": "crushed_ice", "gut_timing": "later_ok", "fillet_style": "whole_or_fillet"}'),

('Atlantic Cod', 'Gadus morhua', 'groundfish', 'saltwater', false, 'Mild, flaky, white',
 '{"key_marks": ["Chin barbel", "Three dorsal fins", "Lateral line curves above pectoral fin", "Speckled brown/green"], "confusable_with": ["Haddock", "Pollock"]}',
 '{"bleed": true, "ice_method": "ice_slurry", "gut_timing": "immediately", "fillet_style": "skin_off"}'),

('Bluefin Tuna', 'Thunnus thynnus', 'pelagic', 'saltwater', true, 'Rich, buttery, red',
 '{"key_marks": ["Dark blue/black back", "Silver belly", "Short pectoral fins", "Finlets behind second dorsal"], "confusable_with": ["Yellowfin Tuna", "Bigeye Tuna"]}',
 '{"bleed": true, "ice_method": "ice_slurry_immediately", "gut_timing": "immediately", "fillet_style": "loins"}'),

('Mahi-Mahi (Dolphinfish)', 'Coryphaena hippurus', 'pelagic', 'saltwater', false, 'Mild, sweet, firm',
 '{"key_marks": ["Bright green/blue/gold", "Blunt forehead (males)", "Long dorsal fin", "Forked tail"], "confusable_with": ["Pompano Dolphinfish"]}',
 '{"bleed": true, "ice_method": "ice_slurry", "gut_timing": "immediately", "fillet_style": "skin_on"}'),

('False Albacore', 'Euthynnus alletteratus', 'pelagic', 'saltwater', false, 'Strong, dark, oily',
 '{"key_marks": ["Dark wavy lines on back", "Spots below pectoral fin", "No stripes on belly"], "confusable_with": ["Atlantic Bonito", "Skipjack Tuna"]}',
 '{"bleed": true, "ice_method": "ice_slurry_immediately", "gut_timing": "immediately", "fillet_style": "loins_skin_off"}');

-- ============================================
-- MVP JURISDICTIONS (NY, CT, RI, MA, Federal)
-- ============================================
-- NOTE: For MVP, we use simplified bounding boxes.
-- In production, use actual state maritime boundary shapefiles.
INSERT INTO jurisdictions (name, jurisdiction_type, agency_name, agency_url, boundary) VALUES
('New York', 'state', 'NYSDEC', 'https://www.dec.ny.gov/outdoor/fishing.html',
 ST_GeomFromText('MULTIPOLYGON(((-74.3 40.4, -71.8 40.4, -71.8 41.4, -74.3 41.4, -74.3 40.4)))', 4326)),
('Connecticut', 'state', 'CT DEEP', 'https://portal.ct.gov/deep/fishing',
 ST_GeomFromText('MULTIPOLYGON(((-73.8 40.9, -71.7 40.9, -71.7 41.4, -73.8 41.4, -73.8 40.9)))', 4326)),
('Rhode Island', 'state', 'RI DEM', 'https://dem.ri.gov/fishing',
 ST_GeomFromText('MULTIPOLYGON(((-71.9 41.1, -71.1 41.1, -71.1 42.0, -71.9 42.0, -71.9 41.1)))', 4326)),
('Massachusetts', 'state', 'MA DMF', 'https://www.mass.gov/marine-fishing',
 ST_GeomFromText('MULTIPOLYGON(((-73.5 41.2, -69.9 41.2, -69.9 42.9, -73.5 42.9, -73.5 41.2)))', 4326)),
('Federal Atlantic', 'federal', 'NOAA Fisheries', 'https://www.fisheries.noaa.gov/',
 ST_GeomFromText('MULTIPOLYGON(((-76.0 35.0, -65.0 35.0, -65.0 45.0, -76.0 45.0, -76.0 35.0)))', 4326));

-- ============================================
-- SAMPLE REGULATIONS (2025 — verify against official sources)
-- ============================================
-- Striped Bass - NY
INSERT INTO regulations (species_id, jurisdiction_id, min_size_inches, max_size_inches, bag_limit_per_person, season_open, season_close, fishing_mode, effective_date, source_url, notes)
SELECT s.id, j.id, 28, 35, 1, '2025-04-15', '2025-12-15', 'all', '2025-01-01',
  'https://www.dec.ny.gov/outdoor/fishing/regulations/striped-bass', 'Slot limit: 28-35 inches. 1 per person per day.'
FROM species s, jurisdictions j WHERE s.common_name = 'Striped Bass' AND j.name = 'New York';

-- Bluefish - NY
INSERT INTO regulations (species_id, jurisdiction_id, min_size_inches, bag_limit_per_person, fishing_mode, effective_date, source_url, notes)
SELECT s.id, j.id, 12, 3, 'shore', '2025-01-01',
  'https://www.dec.ny.gov/outdoor/fishing/regulations/bluefish', 'Shore: 3 per person. No closed season.'
FROM species s, jurisdictions j WHERE s.common_name = 'Bluefish' AND j.name = 'New York';

INSERT INTO regulations (species_id, jurisdiction_id, min_size_inches, bag_limit_per_person, fishing_mode, effective_date, source_url, notes)
SELECT s.id, j.id, 12, 5, 'private_boat', '2025-01-01',
  'https://www.dec.ny.gov/outdoor/fishing/regulations/bluefish', 'Private boat: 5 per person.'
FROM species s, jurisdictions j WHERE s.common_name = 'Bluefish' AND j.name = 'New York';

-- Summer Flounder - NY
INSERT INTO regulations (species_id, jurisdiction_id, min_size_inches, bag_limit_per_person, season_open, season_close, fishing_mode, effective_date, source_url)
SELECT s.id, j.id, 19, 4, '2025-05-01', '2025-09-30', 'all', '2025-01-01',
  'https://www.dec.ny.gov/outdoor/fishing/regulations/summer-flounder'
FROM species s, jurisdictions j WHERE s.common_name = 'Summer Flounder (Fluke)' AND j.name = 'New York';

-- Black Sea Bass - NY
INSERT INTO regulations (species_id, jurisdiction_id, min_size_inches, bag_limit_per_person, season_open, season_close, fishing_mode, effective_date, source_url)
SELECT s.id, j.id, 16, 5, '2025-06-15', '2025-12-31', 'all', '2025-01-01',
  'https://www.dec.ny.gov/outdoor/fishing/regulations/black-sea-bass'
FROM species s, jurisdictions j WHERE s.common_name = 'Black Sea Bass' AND j.name = 'New York';

-- ============================================
-- MVP RECIPES
-- ============================================
INSERT INTO recipes (species_id, title, method, cook_time_minutes, is_raw_safe, ingredients, steps)
SELECT s.id, 'Pan-Seared Striped Bass', 'pan_sear', 12, false,
  '["1 lb striped bass fillet (skin on)", "2 tbsp butter", "1 lemon", "Salt & pepper", "Fresh thyme"]',
  '["Pat fillet dry, season with salt & pepper", "Heat butter in cast iron over medium-high until foaming", "Place fillet skin-side down, press gently for 4 min", "Flip, add thyme, cook 3 min more", "Squeeze lemon, serve immediately"]'
FROM species s WHERE s.common_name = 'Striped Bass';

INSERT INTO recipes (species_id, title, method, cook_time_minutes, is_raw_safe, ingredients, steps)
SELECT s.id, 'Grilled Striped Bass', 'grill', 10, false,
  '["1 lb striped bass fillet", "2 tbsp olive oil", "2 cloves garlic (minced)", "Lemon zest", "Salt & pepper"]',
  '["Preheat grill to medium-high", "Brush fillet with olive oil, garlic, lemon zest", "Season both sides with salt & pepper", "Grill skin-side down 5 min, flip 3-4 min", "Rest 2 minutes before serving"]'
FROM species s WHERE s.common_name = 'Striped Bass';

INSERT INTO recipes (species_id, title, method, cook_time_minutes, is_raw_safe, ingredients, steps)
SELECT s.id, 'Smoked Bluefish Dip', 'smoke', 45, false,
  '["1 lb bluefish fillet", "4 oz cream cheese", "2 tbsp lemon juice", "1 tbsp horseradish", "Smoked paprika"]',
  '["Smoke bluefish at 225°F for 30-40 min until flaky", "Let cool, then flake into bowl", "Mix with softened cream cheese, lemon juice, horseradish", "Season with smoked paprika, salt & pepper", "Serve with crackers or toasted bread"]'
FROM species s WHERE s.common_name = 'Bluefish';

INSERT INTO recipes (species_id, title, method, cook_time_minutes, is_raw_safe, ingredients, steps)
SELECT s.id, 'Grilled Mahi-Mahi Tacos', 'grill', 10, false,
  '["1 lb mahi-mahi fillet", "Corn tortillas", "1 avocado", "Lime", "Chipotle mayo"]',
  '["Season mahi with salt, pepper, lime juice", "Grill over high heat 3-4 min per side", "Warm tortillas on grill", "Slice mahi into strips", "Assemble tacos with avocado, chipotle mayo, lime"]'
FROM species s WHERE s.common_name = 'Mahi-Mahi (Dolphinfish)';
