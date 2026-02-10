-- ============================================
-- CATCH-TO-TABLE DATABASE SCHEMA
-- ============================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SPECIES TABLE
-- ============================================
CREATE TABLE species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  common_name TEXT NOT NULL,
  scientific_name TEXT,
  species_group TEXT, -- e.g., 'reef', 'pelagic', 'flatfish', 'freshwater'
  water_type TEXT NOT NULL CHECK (water_type IN ('saltwater', 'freshwater', 'both')),
  image_url TEXT,
  identifying_features JSONB, -- { "key_marks": [...], "confusable_with": [...] }
  handling_notes JSONB, -- { "bleed": bool, "ice_method": "...", "gut_timing": "...", "fillet_style": "..." }
  flavor_profile TEXT, -- e.g., "mild, flaky, white"
  is_hms BOOLEAN DEFAULT FALSE, -- Highly Migratory Species (tuna/billfish/swordfish)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JURISDICTIONS TABLE
-- ============================================
CREATE TABLE jurisdictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., "New York", "Federal Atlantic"
  jurisdiction_type TEXT NOT NULL CHECK (jurisdiction_type IN ('state', 'federal', 'territory')),
  boundary GEOMETRY(MULTIPOLYGON, 4326), -- PostGIS geometry for geo-lookup
  agency_name TEXT, -- e.g., "NYSDEC", "NOAA"
  agency_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jurisdictions_boundary ON jurisdictions USING GIST (boundary);

-- ============================================
-- REGULATIONS TABLE
-- ============================================
CREATE TABLE regulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_id UUID REFERENCES species(id) ON DELETE CASCADE,
  jurisdiction_id UUID REFERENCES jurisdictions(id) ON DELETE CASCADE,

  -- Season
  season_open DATE, -- NULL = year-round open
  season_close DATE, -- NULL = year-round open
  season_notes TEXT, -- e.g., "Closed Feb 1 - Mar 15"

  -- Size limits (inches)
  min_size_inches NUMERIC(5,2),
  max_size_inches NUMERIC(5,2),
  slot_limit_min NUMERIC(5,2), -- slot limit lower bound
  slot_limit_max NUMERIC(5,2), -- slot limit upper bound

  -- Bag limits
  bag_limit_per_person INTEGER,
  bag_limit_per_vessel INTEGER,
  possession_limit INTEGER,

  -- Fishing mode modifiers
  fishing_mode TEXT CHECK (fishing_mode IN ('shore', 'private_boat', 'for_hire', 'all')),

  -- Meta
  effective_date DATE NOT NULL,
  expiry_date DATE,
  source_url TEXT NOT NULL,
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(species_id, jurisdiction_id, fishing_mode, effective_date)
);

CREATE INDEX idx_regulations_species ON regulations(species_id);
CREATE INDEX idx_regulations_jurisdiction ON regulations(jurisdiction_id);
CREATE INDEX idx_regulations_dates ON regulations(effective_date, expiry_date);

-- ============================================
-- USER PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  home_state TEXT,
  preferred_water_type TEXT DEFAULT 'saltwater',
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CATCH LOG (Proof Log)
-- ============================================
CREATE TABLE catch_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  species_id UUID REFERENCES species(id),

  -- Identification
  species_confirmed BOOLEAN DEFAULT FALSE,
  ai_confidence NUMERIC(3,2), -- 0.00 to 1.00
  ai_top_3 JSONB, -- [{ "species_id": "...", "confidence": 0.92 }, ...]

  -- Location
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  location_point GEOMETRY(POINT, 4326),
  jurisdiction_id UUID REFERENCES jurisdictions(id),
  fishing_mode TEXT CHECK (fishing_mode IN ('shore', 'private_boat', 'for_hire')),

  -- Measurement
  measured_length_inches NUMERIC(5,2),
  measurement_method TEXT CHECK (measurement_method IN ('ar_ruler', 'reference_object', 'manual')),
  measurement_photo_url TEXT,

  -- Decision
  decision TEXT CHECK (decision IN ('keep', 'release', 'undecided')),
  decision_reason TEXT, -- "In season, meets size limit, within bag limit"

  -- Photos
  photo_url TEXT,

  -- Timestamps
  caught_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Crew tracking
  crew_size INTEGER DEFAULT 1,
  angler_number INTEGER DEFAULT 1 -- which angler caught this
);

CREATE INDEX idx_catch_log_user ON catch_log(user_id);
CREATE INDEX idx_catch_log_location ON catch_log USING GIST (location_point);
CREATE INDEX idx_catch_log_date ON catch_log(caught_at);

-- ============================================
-- RECIPES TABLE
-- ============================================
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_id UUID REFERENCES species(id) ON DELETE CASCADE,
  title TEXT NOT NULL, -- e.g., "Pan-Seared Striped Bass"
  method TEXT NOT NULL CHECK (method IN ('pan_sear', 'grill', 'ceviche', 'bake', 'fry', 'smoke', 'raw')),
  ingredients JSONB NOT NULL, -- ["1 lb fillet", "2 tbsp butter", ...]
  steps JSONB NOT NULL, -- ["Pat dry...", "Heat pan...", ...]
  cook_time_minutes INTEGER,
  is_raw_safe BOOLEAN DEFAULT FALSE, -- only show ceviche/crudo if true
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE catch_log ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Catch log: users can CRUD their own
CREATE POLICY "Users can view own catches" ON catch_log FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own catches" ON catch_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own catches" ON catch_log FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own catches" ON catch_log FOR DELETE USING (auth.uid() = user_id);

-- Species, jurisdictions, regulations, recipes: public read
ALTER TABLE species ENABLE ROW LEVEL SECURITY;
ALTER TABLE jurisdictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read species" ON species FOR SELECT USING (true);
CREATE POLICY "Public read jurisdictions" ON jurisdictions FOR SELECT USING (true);
CREATE POLICY "Public read regulations" ON regulations FOR SELECT USING (true);
CREATE POLICY "Public read recipes" ON recipes FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Find jurisdiction by lat/lng
CREATE OR REPLACE FUNCTION get_jurisdiction_by_location(lat NUMERIC, lng NUMERIC)
RETURNS TABLE(jurisdiction_id UUID, jurisdiction_name TEXT, jurisdiction_type TEXT, agency_name TEXT, agency_url TEXT)
LANGUAGE sql STABLE
AS $$
  SELECT j.id, j.name, j.jurisdiction_type, j.agency_name, j.agency_url
  FROM jurisdictions j
  WHERE ST_Contains(j.boundary, ST_SetSRID(ST_MakePoint(lng, lat), 4326))
  ORDER BY j.jurisdiction_type ASC; -- state regs first, then federal
$$;

-- Check legality for a species at a location on a date
CREATE OR REPLACE FUNCTION check_legality(
  p_species_id UUID,
  p_jurisdiction_id UUID,
  p_date DATE,
  p_fishing_mode TEXT DEFAULT 'all',
  p_measured_length NUMERIC DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  reg RECORD;
  result JSONB := '{"can_keep": false, "reasons": []}'::JSONB;
  reasons JSONB := '[]'::JSONB;
  can_keep BOOLEAN := true;
BEGIN
  SELECT * INTO reg
  FROM regulations r
  WHERE r.species_id = p_species_id
    AND r.jurisdiction_id = p_jurisdiction_id
    AND (r.fishing_mode = p_fishing_mode OR r.fishing_mode = 'all')
    AND r.effective_date <= p_date
    AND (r.expiry_date IS NULL OR r.expiry_date >= p_date)
  ORDER BY r.effective_date DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('can_keep', false, 'reasons', jsonb_build_array('No regulation data found for this species in this jurisdiction'), 'regulation', NULL);
  END IF;

  -- Check season
  IF reg.season_open IS NOT NULL AND reg.season_close IS NOT NULL THEN
    IF p_date < reg.season_open OR p_date > reg.season_close THEN
      can_keep := false;
      reasons := reasons || jsonb_build_array(format('Out of season (open %s to %s)', reg.season_open, reg.season_close));
    END IF;
  END IF;

  -- Check size
  IF p_measured_length IS NOT NULL THEN
    IF reg.min_size_inches IS NOT NULL AND p_measured_length < reg.min_size_inches THEN
      can_keep := false;
      reasons := reasons || jsonb_build_array(format('Below minimum size (%s" required, measured %s")', reg.min_size_inches, p_measured_length));
    END IF;
    IF reg.max_size_inches IS NOT NULL AND p_measured_length > reg.max_size_inches THEN
      can_keep := false;
      reasons := reasons || jsonb_build_array(format('Above maximum size (%s" max, measured %s")', reg.max_size_inches, p_measured_length));
    END IF;
  ELSE
    IF reg.min_size_inches IS NOT NULL THEN
      reasons := reasons || jsonb_build_array(format('Minimum size: %s" — measure to confirm', reg.min_size_inches));
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'can_keep', can_keep,
    'reasons', reasons,
    'regulation', jsonb_build_object(
      'min_size_inches', reg.min_size_inches,
      'max_size_inches', reg.max_size_inches,
      'bag_limit_per_person', reg.bag_limit_per_person,
      'bag_limit_per_vessel', reg.bag_limit_per_vessel,
      'season_open', reg.season_open,
      'season_close', reg.season_close,
      'season_notes', reg.season_notes,
      'source_url', reg.source_url,
      'last_verified_at', reg.last_verified_at,
      'fishing_mode', reg.fishing_mode
    )
  );
END;
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
