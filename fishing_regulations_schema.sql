-- PostgreSQL Database Schema for Fishing Regulations
-- Created: 2026-02-10
-- This schema supports comprehensive fishing regulations data for US states and territories

-- Enable PostGIS extension for geographic data (optional but recommended)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- =====================================================
-- TABLE: states
-- Stores information about US states and territories
-- =====================================================
CREATE TABLE IF NOT EXISTS states (
    state_id SERIAL PRIMARY KEY,
    state_name VARCHAR(100) NOT NULL UNIQUE,
    state_abbreviation VARCHAR(2) NOT NULL UNIQUE,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    -- Alternative: Use PostGIS geometry type
    -- geom GEOMETRY(POINT, 4326),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on state abbreviation for faster lookups
CREATE INDEX idx_states_abbreviation ON states(state_abbreviation);

COMMENT ON TABLE states IS 'US states and territories with geographic center coordinates';
COMMENT ON COLUMN states.latitude IS 'Latitude of state center point';
COMMENT ON COLUMN states.longitude IS 'Longitude of state center point';

-- =====================================================
-- TABLE: license_requirements
-- Stores fishing license requirements by state
-- =====================================================
CREATE TABLE IF NOT EXISTS license_requirements (
    license_req_id SERIAL PRIMARY KEY,
    state_id INTEGER NOT NULL REFERENCES states(state_id) ON DELETE CASCADE,
    water_type VARCHAR(20) NOT NULL CHECK (water_type IN ('freshwater', 'saltwater', 'both')),
    requirement_description TEXT NOT NULL,
    minimum_age INTEGER,
    cost_resident DECIMAL(10, 2),
    cost_nonresident DECIMAL(10, 2),
    additional_notes TEXT,
    effective_date DATE,
    expiration_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_state_water_type UNIQUE (state_id, water_type)
);

CREATE INDEX idx_license_state ON license_requirements(state_id);

COMMENT ON TABLE license_requirements IS 'Fishing license requirements by state and water type';

-- =====================================================
-- TABLE: species
-- Master list of fish species
-- =====================================================
CREATE TABLE IF NOT EXISTS species (
    species_id SERIAL PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(150),
    species_family VARCHAR(100),
    water_type VARCHAR(20) NOT NULL CHECK (water_type IN ('freshwater', 'saltwater', 'anadromous', 'catadromous')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_common_scientific UNIQUE (common_name, scientific_name)
);

CREATE INDEX idx_species_common_name ON species(common_name);
CREATE INDEX idx_species_scientific_name ON species(scientific_name);
CREATE INDEX idx_species_water_type ON species(water_type);

COMMENT ON TABLE species IS 'Master list of fish species with taxonomy information';

-- =====================================================
-- TABLE: regulations
-- Core fishing regulations by state and species
-- =====================================================
CREATE TABLE IF NOT EXISTS regulations (
    regulation_id SERIAL PRIMARY KEY,
    state_id INTEGER NOT NULL REFERENCES states(state_id) ON DELETE CASCADE,
    species_id INTEGER NOT NULL REFERENCES species(species_id) ON DELETE CASCADE,

    -- Size limits
    minimum_size_inches DECIMAL(5, 2),
    minimum_size_notes TEXT,
    maximum_size_inches DECIMAL(5, 2),
    maximum_size_notes TEXT,

    -- Bag limits
    bag_limit_daily INTEGER,
    bag_limit_notes TEXT,
    possession_limit INTEGER,
    vessel_limit INTEGER,

    -- Season information
    season_open_date DATE,
    season_close_date DATE,
    season_description TEXT,
    is_year_round BOOLEAN DEFAULT FALSE,

    -- Jurisdiction
    water_jurisdiction VARCHAR(50) CHECK (water_jurisdiction IN ('state_waters', 'federal_waters', 'both', 'inland', 'coastal', 'joint')),
    geographic_restrictions TEXT,

    -- Special regulations
    special_regulations TEXT,
    slot_limit_description TEXT,
    is_catch_and_release_only BOOLEAN DEFAULT FALSE,
    is_protected BOOLEAN DEFAULT FALSE,

    -- Effective dates
    effective_start_date DATE NOT NULL,
    effective_end_date DATE,

    -- Metadata
    regulation_source VARCHAR(200),
    source_url TEXT,
    last_verified_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_state_species_effective UNIQUE (state_id, species_id, effective_start_date, water_jurisdiction)
);

CREATE INDEX idx_regulations_state ON regulations(state_id);
CREATE INDEX idx_regulations_species ON regulations(species_id);
CREATE INDEX idx_regulations_effective_dates ON regulations(effective_start_date, effective_end_date);
CREATE INDEX idx_regulations_jurisdiction ON regulations(water_jurisdiction);

COMMENT ON TABLE regulations IS 'Fishing regulations by state, species, and jurisdiction';
COMMENT ON COLUMN regulations.minimum_size_inches IS 'Minimum legal size in inches (total length unless noted)';
COMMENT ON COLUMN regulations.slot_limit_description IS 'Description of slot limits (e.g., "15-20 inches")';

-- =====================================================
-- TABLE: regional_variations
-- Handles sub-state regional regulation differences
-- =====================================================
CREATE TABLE IF NOT EXISTS regional_variations (
    regional_variation_id SERIAL PRIMARY KEY,
    regulation_id INTEGER NOT NULL REFERENCES regulations(regulation_id) ON DELETE CASCADE,
    region_name VARCHAR(200) NOT NULL,
    region_description TEXT,

    -- Override values (NULL means use parent regulation value)
    override_minimum_size_inches DECIMAL(5, 2),
    override_maximum_size_inches DECIMAL(5, 2),
    override_bag_limit_daily INTEGER,
    override_season_open_date DATE,
    override_season_close_date DATE,
    override_notes TEXT,

    -- Geographic definition (optional)
    region_boundary_description TEXT,
    -- Alternative: Use PostGIS
    -- region_geom GEOMETRY(MULTIPOLYGON, 4326),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_regional_regulation ON regional_variations(regulation_id);

COMMENT ON TABLE regional_variations IS 'Sub-state regional variations in fishing regulations';

-- =====================================================
-- TABLE: special_restrictions
-- Additional restrictions and requirements
-- =====================================================
CREATE TABLE IF NOT EXISTS special_restrictions (
    restriction_id SERIAL PRIMARY KEY,
    regulation_id INTEGER NOT NULL REFERENCES regulations(regulation_id) ON DELETE CASCADE,
    restriction_type VARCHAR(50) NOT NULL CHECK (restriction_type IN
        ('gear', 'method', 'bait', 'time_of_day', 'vessel_type', 'license_type', 'harvest_reporting', 'other')),
    restriction_description TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    penalty_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_restrictions_regulation ON special_restrictions(regulation_id);
CREATE INDEX idx_restrictions_type ON special_restrictions(restriction_type);

COMMENT ON TABLE special_restrictions IS 'Special restrictions such as gear requirements, harvest reporting, etc.';

-- =====================================================
-- TABLE: federal_regulations
-- Federal waters regulations (NOAA, etc.)
-- =====================================================
CREATE TABLE IF NOT EXISTS federal_regulations (
    federal_regulation_id SERIAL PRIMARY KEY,
    species_id INTEGER NOT NULL REFERENCES species(species_id) ON DELETE CASCADE,
    management_agency VARCHAR(100) NOT NULL,

    -- Size and bag limits
    minimum_size_inches DECIMAL(5, 2),
    minimum_size_notes TEXT,
    maximum_size_inches DECIMAL(5, 2),
    bag_limit_daily INTEGER,
    bag_limit_notes TEXT,
    annual_limit INTEGER,
    vessel_annual_limit INTEGER,

    -- Season
    season_open_date DATE,
    season_close_date DATE,
    season_description TEXT,

    -- Geographic scope
    geographic_scope VARCHAR(100), -- e.g., 'Atlantic Ocean', 'Gulf of Mexico', 'Pacific Ocean'

    -- Special requirements
    permit_required BOOLEAN DEFAULT FALSE,
    permit_type VARCHAR(100),
    special_regulations TEXT,

    -- Effective dates
    effective_start_date DATE NOT NULL,
    effective_end_date DATE,

    -- Metadata
    regulation_source VARCHAR(200),
    source_url TEXT,
    last_verified_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_federal_regulations_species ON federal_regulations(species_id);
CREATE INDEX idx_federal_regulations_scope ON federal_regulations(geographic_scope);
CREATE INDEX idx_federal_regulations_effective ON federal_regulations(effective_start_date, effective_end_date);

COMMENT ON TABLE federal_regulations IS 'Federal fishing regulations managed by NOAA and other federal agencies';

-- =====================================================
-- TABLE: regulation_updates
-- Audit trail for regulation changes
-- =====================================================
CREATE TABLE IF NOT EXISTS regulation_updates (
    update_id SERIAL PRIMARY KEY,
    regulation_id INTEGER REFERENCES regulations(regulation_id) ON DELETE SET NULL,
    federal_regulation_id INTEGER REFERENCES federal_regulations(federal_regulation_id) ON DELETE SET NULL,
    update_type VARCHAR(50) NOT NULL CHECK (update_type IN ('created', 'modified', 'deleted', 'emergency_order', 'seasonal_adjustment')),
    update_description TEXT NOT NULL,
    previous_value JSONB,
    new_value JSONB,
    updated_by VARCHAR(100),
    update_source VARCHAR(200),
    effective_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_updates_regulation ON regulation_updates(regulation_id);
CREATE INDEX idx_updates_federal ON regulation_updates(federal_regulation_id);
CREATE INDEX idx_updates_date ON regulation_updates(created_at);

COMMENT ON TABLE regulation_updates IS 'Audit trail of all regulation changes including emergency orders';

-- =====================================================
-- TABLE: measurement_methods
-- Definitions of measurement techniques
-- =====================================================
CREATE TABLE IF NOT EXISTS measurement_methods (
    measurement_method_id SERIAL PRIMARY KEY,
    method_name VARCHAR(50) NOT NULL UNIQUE,
    method_description TEXT NOT NULL,
    diagram_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO measurement_methods (method_name, method_description) VALUES
    ('total_length', 'Measured from the tip of the snout to the end of the tail with the tail compressed'),
    ('fork_length', 'Measured from the tip of the snout to the fork in the tail'),
    ('lower_jaw_fork_length', 'Measured from the lower jaw to the fork in the tail (used for billfish)'),
    ('curved_fork_length', 'Measured following the curve of the body from snout to tail fork')
ON CONFLICT (method_name) DO NOTHING;

COMMENT ON TABLE measurement_methods IS 'Standard fish measurement methods used in regulations';

-- =====================================================
-- TABLE: regulation_contacts
-- Contact information for state agencies
-- =====================================================
CREATE TABLE IF NOT EXISTS regulation_contacts (
    contact_id SERIAL PRIMARY KEY,
    state_id INTEGER REFERENCES states(state_id) ON DELETE CASCADE,
    agency_name VARCHAR(200) NOT NULL,
    department VARCHAR(200),
    phone VARCHAR(20),
    email VARCHAR(100),
    website_url TEXT,
    regulations_url TEXT,
    emergency_hotline VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_state ON regulation_contacts(state_id);

COMMENT ON TABLE regulation_contacts IS 'Contact information for state fish and wildlife agencies';

-- =====================================================
-- VIEWS: Useful queries for common use cases
-- =====================================================

-- Current active regulations view
CREATE OR REPLACE VIEW v_current_regulations AS
SELECT
    s.state_name,
    s.state_abbreviation,
    sp.common_name,
    sp.scientific_name,
    sp.water_type,
    r.minimum_size_inches,
    r.maximum_size_inches,
    r.bag_limit_daily,
    r.possession_limit,
    r.season_open_date,
    r.season_close_date,
    r.is_year_round,
    r.water_jurisdiction,
    r.special_regulations,
    r.is_catch_and_release_only,
    r.effective_start_date,
    r.effective_end_date
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE r.effective_start_date <= CURRENT_DATE
  AND (r.effective_end_date IS NULL OR r.effective_end_date >= CURRENT_DATE)
ORDER BY s.state_name, sp.common_name;

COMMENT ON VIEW v_current_regulations IS 'Currently active regulations for all states and species';

-- Species by state view
CREATE OR REPLACE VIEW v_species_by_state AS
SELECT
    s.state_name,
    s.state_abbreviation,
    sp.common_name,
    sp.scientific_name,
    sp.water_type,
    COUNT(r.regulation_id) as regulation_count,
    MAX(r.last_verified_date) as last_verified
FROM states s
JOIN regulations r ON s.state_id = r.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE r.effective_start_date <= CURRENT_DATE
  AND (r.effective_end_date IS NULL OR r.effective_end_date >= CURRENT_DATE)
GROUP BY s.state_name, s.state_abbreviation, sp.common_name, sp.scientific_name, sp.water_type
ORDER BY s.state_name, sp.common_name;

COMMENT ON VIEW v_species_by_state IS 'Summary of species with regulations by state';

-- Open seasons view
CREATE OR REPLACE VIEW v_open_seasons AS
SELECT
    s.state_name,
    sp.common_name,
    sp.scientific_name,
    r.season_open_date,
    r.season_close_date,
    r.is_year_round,
    r.water_jurisdiction,
    CASE
        WHEN r.is_year_round THEN 'Open Year-Round'
        WHEN CURRENT_DATE BETWEEN r.season_open_date AND r.season_close_date THEN 'Currently Open'
        WHEN CURRENT_DATE < r.season_open_date THEN 'Opens Soon'
        ELSE 'Closed'
    END as season_status
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE r.effective_start_date <= CURRENT_DATE
  AND (r.effective_end_date IS NULL OR r.effective_end_date >= CURRENT_DATE)
ORDER BY s.state_name, sp.common_name;

COMMENT ON VIEW v_open_seasons IS 'Season status for all regulated species';

-- =====================================================
-- FUNCTIONS: Helper functions
-- =====================================================

-- Function to check if a species is currently in season
CREATE OR REPLACE FUNCTION is_species_in_season(
    p_state_id INTEGER,
    p_species_id INTEGER,
    p_check_date DATE DEFAULT CURRENT_DATE
)
RETURNS BOOLEAN AS $$
DECLARE
    v_result BOOLEAN;
BEGIN
    SELECT
        CASE
            WHEN r.is_year_round THEN TRUE
            WHEN p_check_date BETWEEN r.season_open_date AND r.season_close_date THEN TRUE
            ELSE FALSE
        END INTO v_result
    FROM regulations r
    WHERE r.state_id = p_state_id
      AND r.species_id = p_species_id
      AND r.effective_start_date <= p_check_date
      AND (r.effective_end_date IS NULL OR r.effective_end_date >= p_check_date)
    LIMIT 1;

    RETURN COALESCE(v_result, FALSE);
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION is_species_in_season IS 'Check if a species is currently in season for a given state';

-- Function to get regulations for a species in a state
CREATE OR REPLACE FUNCTION get_species_regulations(
    p_state_abbr VARCHAR(2),
    p_species_common_name VARCHAR(100)
)
RETURNS TABLE (
    state_name VARCHAR(100),
    common_name VARCHAR(100),
    scientific_name VARCHAR(150),
    minimum_size DECIMAL(5,2),
    maximum_size DECIMAL(5,2),
    bag_limit INTEGER,
    season_info TEXT,
    special_regs TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        s.state_name,
        sp.common_name,
        sp.scientific_name,
        r.minimum_size_inches,
        r.maximum_size_inches,
        r.bag_limit_daily,
        CASE
            WHEN r.is_year_round THEN 'Year-round'
            ELSE CONCAT(
                TO_CHAR(r.season_open_date, 'Mon DD'),
                ' - ',
                TO_CHAR(r.season_close_date, 'Mon DD')
            )
        END::TEXT,
        r.special_regulations
    FROM regulations r
    JOIN states s ON r.state_id = s.state_id
    JOIN species sp ON r.species_id = sp.species_id
    WHERE s.state_abbreviation = p_state_abbr
      AND sp.common_name ILIKE p_species_common_name
      AND r.effective_start_date <= CURRENT_DATE
      AND (r.effective_end_date IS NULL OR r.effective_end_date >= CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_species_regulations IS 'Get current regulations for a species in a specific state';

-- =====================================================
-- TRIGGERS: Automatic timestamp updates
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON states
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_license_requirements_updated_at BEFORE UPDATE ON license_requirements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_species_updated_at BEFORE UPDATE ON species
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regulations_updated_at BEFORE UPDATE ON regulations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regional_variations_updated_at BEFORE UPDATE ON regional_variations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regulation_contacts_updated_at BEFORE UPDATE ON regulation_contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_federal_regulations_updated_at BEFORE UPDATE ON federal_regulations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- GRANT PERMISSIONS (adjust as needed for your setup)
-- =====================================================

-- Example: Grant read access to a specific role
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO fishing_app_readonly;
-- GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO fishing_app_readonly;

-- Example: Grant read/write access to application role
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO fishing_app_readwrite;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO fishing_app_readwrite;
