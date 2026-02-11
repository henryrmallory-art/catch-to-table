# US Fishing Regulations Database

## Overview

This repository contains a comprehensive PostgreSQL database schema and initial data for US fishing regulations across multiple states and federal waters. The data was compiled from official state fish and wildlife agencies and NOAA Fisheries as of February 2026.

## Contents

1. **fishing_regulations_data_2026.json** - Raw compiled data in JSON format
2. **fishing_regulations_schema.sql** - Complete PostgreSQL database schema
3. **import_sample_data.sql** - SQL script to import initial data for 6 states
4. **This README** - Documentation and usage guide

## Database Schema

### Core Tables

#### states
Stores US states and territories with geographic center coordinates.
- Primary data: state name, abbreviation, latitude, longitude
- Covers all 50 states + DC + territories (sample data includes 6 states)

#### species
Master list of fish species with taxonomic information.
- Includes common name, scientific name, family, water type
- Currently includes 27 commonly caught recreational species

#### regulations
Core fishing regulations by state and species.
- Size limits (minimum/maximum)
- Bag limits (daily, possession, vessel)
- Seasonal restrictions
- Geographic jurisdiction (state/federal/inland/coastal/joint)
- Special regulations and slot limits
- Effective date ranges

#### federal_regulations
Federal waters regulations managed by NOAA and other agencies.
- Covers Highly Migratory Species (HMS)
- Includes billfish, tuna, and other pelagic species
- Permit requirements
- Annual vessel limits

#### license_requirements
State-specific fishing license requirements.
- Freshwater vs saltwater distinctions
- Age requirements
- Cost information
- Additional permit requirements (steelhead cards, salmon cards, etc.)

#### regional_variations
Sub-state regional regulation differences.
- Allows for management areas within states
- Override values for regional differences
- Can store geographic boundaries

#### special_restrictions
Additional restrictions and requirements.
- Gear restrictions (circle hooks, etc.)
- Harvest reporting requirements
- Time of day restrictions
- Vessel type restrictions

#### regulation_contacts
Contact information for state agencies.
- Phone numbers, websites
- Direct links to regulations
- Emergency hotlines

#### regulation_updates
Audit trail for regulation changes.
- Tracks all modifications
- Emergency orders
- Seasonal adjustments
- Historical data

#### measurement_methods
Standard fish measurement techniques.
- Total length, fork length, curved fork length
- Lower-jaw fork length (billfish)
- Definitions and diagrams

### Views

#### v_current_regulations
Shows all currently active regulations across states.
- Filters by effective dates
- Includes all key regulation details

#### v_species_by_state
Summary of species with regulations by state.
- Useful for understanding state coverage
- Shows last verification dates

#### v_open_seasons
Real-time season status for all species.
- Shows which species are currently open
- Identifies upcoming seasons

### Functions

#### is_species_in_season(state_id, species_id, check_date)
Check if a species is currently in season for a given state and date.

#### get_species_regulations(state_abbr, species_common_name)
Retrieve current regulations for a specific species in a state.

## Installation

### 1. Create Database

```sql
CREATE DATABASE fishing_regulations;
\c fishing_regulations
```

### 2. Run Schema Creation

```bash
psql -d fishing_regulations -f fishing_regulations_schema.sql
```

### 3. Import Sample Data

```bash
psql -d fishing_regulations -f import_sample_data.sql
```

## Current Data Coverage

### States Included (Sample Data)
1. Florida (FL) - 10 species
2. Texas (TX) - 4 species
3. California (CA) - 4 species
4. North Carolina (NC) - 4 species
5. Louisiana (LA) - 2 species
6. Alaska (AK) - 4 species

### Federal Regulations
- Blue Marlin
- White Marlin
- Sailfish
- Yellowfin Tuna
- Blackfin Tuna

### Species Covered

**Saltwater:**
- Red Snapper
- Grouper (Gag, Red, Black)
- Mahi-Mahi (Dolphinfish)
- Spotted Seatrout (Speckled Trout)
- Red Drum (Redfish)
- Striped Bass
- Bluefish
- Flounder (Summer, Southern)
- Rockfish
- Pacific Halibut
- Lingcod
- Billfish (Marlin, Sailfish)
- Tuna (Yellowfin, Blackfin)

**Freshwater:**
- Largemouth Bass
- Smallmouth Bass
- Rainbow Trout
- Walleye

**Anadromous:**
- Striped Bass
- Steelhead
- King Salmon (Chinook)
- Coho Salmon
- Sockeye Salmon

## Usage Examples

### Query Current Regulations for a State

```sql
SELECT * FROM v_current_regulations
WHERE state_abbreviation = 'FL'
ORDER BY common_name;
```

### Check If Species Is In Season

```sql
SELECT is_species_in_season(
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Red Snapper'),
    CURRENT_DATE
);
```

### Get Species Regulations

```sql
SELECT * FROM get_species_regulations('TX', 'Red Snapper');
```

### Find All Open Seasons

```sql
SELECT state_name, common_name, season_status, water_jurisdiction
FROM v_open_seasons
WHERE season_status IN ('Open Year-Round', 'Currently Open')
ORDER BY state_name, common_name;
```

### Species by Water Type

```sql
SELECT water_type, COUNT(*) as species_count
FROM species
GROUP BY water_type;
```

### Regulations Requiring Special Permits

```sql
SELECT s.state_name, sp.common_name, r.special_regulations
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE r.special_regulations ILIKE '%permit%' OR r.special_regulations ILIKE '%tag%';
```

### Slot Limit Regulations

```sql
SELECT s.state_name, sp.common_name,
       r.minimum_size_inches, r.maximum_size_inches,
       r.slot_limit_description
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE r.slot_limit_description IS NOT NULL;
```

## Data Sources

All data compiled from official sources as of February 10, 2026:

### State Agencies
- [Florida Fish and Wildlife Conservation Commission (FWC)](https://myfwc.com/fishing/)
- [Texas Parks and Wildlife Department (TPWD)](https://tpwd.texas.gov/regulations/outdoor-annual/fishing/)
- [California Department of Fish and Wildlife (CDFW)](https://wildlife.ca.gov/Fishing)
- [North Carolina Wildlife Resources Commission](https://www.ncwildlife.org/fishing)
- [North Carolina Division of Marine Fisheries](https://www.deq.nc.gov/marine-fisheries/recreational-size-and-bag-limits)
- [Louisiana Department of Wildlife and Fisheries (LDWF)](https://www.wlf.louisiana.gov/subhome/recreational-fishing)
- [Alaska Department of Fish and Game (ADFG)](https://www.adfg.alaska.gov/index.cfm?adfg=fishregulations.main)

### Federal Agencies
- [NOAA Fisheries - Atlantic Highly Migratory Species](https://www.fisheries.noaa.gov/atlantic-highly-migratory-species)
- [NOAA Fisheries - Recreational Fishing](https://www.fisheries.noaa.gov/recreational-fishing)

### Additional Resources
- [eRegulations Digital Fishing Guides](https://www.eregulations.com)
- [Fish Rules Mobile App](https://fishrulesapp.com/)

## Important Notes

### Regulatory Compliance
1. **Always verify current regulations** before fishing. This database is a reference tool, not a legal document.
2. **Emergency orders** can change regulations at any time and supersede published regulations.
3. **Check for proclamations** issued by state agencies.
4. **Federal waters** (3-200 nautical miles offshore) may have different regulations than state waters.
5. **Charter/for-hire** vessels may have different limits than private recreational anglers.

### Data Accuracy
- Last compiled: February 10, 2026
- Regulations are subject to change without notice
- Some seasonal dates are announced annually (e.g., red snapper, salmon seasons)
- Always consult official state agency websites or phone hotlines

### Measurement Standards
Fish measurements vary by species and jurisdiction:
- **Total Length**: Tip of snout to end of tail (compressed)
- **Fork Length**: Tip of snout to fork in tail
- **Curved Fork Length**: Following body curve from snout to tail fork
- **Lower-Jaw Fork Length**: Lower jaw to tail fork (billfish)

### Geographic Boundaries
- **State Waters**: Typically 0-3 nautical miles (Atlantic) or 0-9 nautical miles (Gulf) from shore
- **Federal Waters**: Beyond state waters to 200 nautical mile EEZ
- **Inland Waters**: Lakes, rivers, streams
- **Coastal/Joint Waters**: Areas where state coastal and inland jurisdictions overlap

## Future Enhancements

### Planned Additions
1. **Complete State Coverage**: Add remaining 44 states + DC + US territories
2. **Additional Species**:
   - More freshwater species (catfish, crappie, pike, muskie, panfish)
   - More saltwater species by region
   - Sharks and rays
   - Shellfish and crustaceans
3. **Geographic Features**:
   - PostGIS integration for precise boundaries
   - Marine Protected Areas (MPAs)
   - Fishing zone maps
4. **Enhanced Data**:
   - Historical regulation data
   - Seasonal pattern analysis
   - Stock assessment information
   - Tournament exemptions
5. **Mobile Integration**:
   - REST API for mobile apps
   - Real-time regulation updates
   - GPS-based regulation lookup

### Data Gaps (Current Release)
- Only 6 of 51+ jurisdictions included
- Limited freshwater species coverage
- Some scientific names may be incomplete
- Federal EEZ boundaries not precisely defined
- Tribal fishing regulations not included
- Some regional variations within states not captured

## Contributing

To contribute updated regulations:

1. Verify information from official sources
2. Document the source and date
3. Update both JSON and SQL files
4. Include effective dates
5. Note any special restrictions or requirements

## API Integration Ideas

This database schema is designed to support:
- RESTful APIs for mobile apps
- Real-time regulation lookups
- GPS-based species identification
- Catch logging applications
- Compliance checking tools
- Educational resources

Example API endpoints could include:
- `GET /api/states/{state}/species/{species}/regulations`
- `GET /api/regulations/current?lat={lat}&lng={lng}`
- `GET /api/species/{species}/seasons?date={date}`
- `POST /api/catch/validate` (validate a catch against regulations)

## License Considerations

**Important**: Fishing regulations are public domain information published by government agencies. However:
- This compilation and database structure may have its own licensing
- Always attribute original sources (state agencies, NOAA)
- Verify liability and accuracy requirements for public-facing applications
- Consider consulting with legal counsel for commercial use

## Support and Updates

For questions about this database:
- Check official state agency websites for current regulations
- Contact state fish and wildlife agencies directly (see regulation_contacts table)
- Verify all information before making fishing decisions

## Disclaimer

This database is provided for informational purposes only. It is not a legal document and should not be used as the sole source for regulatory compliance. Always verify current regulations with official state and federal agencies before fishing. Regulations can change at any time through emergency orders, proclamations, or legislative action. The compilers of this database assume no liability for errors, omissions, or outdated information.

## Version History

### Version 1.0 (2026-02-10)
- Initial release
- 6 states with sample data
- 27 species
- Federal HMS regulations
- Complete PostgreSQL schema
- Views, functions, and triggers

## Contact Information

State Agency Contact Numbers (from database):
- Florida FWC: 850-488-4676
- Texas TPWD: 512-389-4800
- California CDFW: 916-445-0411
- North Carolina WRC: 919-707-0220
- North Carolina DMF: 252-515-5500 / 800-682-2632
- Louisiana LDWF: 225-765-2898
- Alaska ADFG: 907-465-4100
- NOAA HMS Management: 301-713-2347

---

**Remember**: When in doubt, don't fish! Always verify regulations before wetting a line.
