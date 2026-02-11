# Fishing Regulations Research Summary
**Compiled:** February 10, 2026
**Researcher:** Claude Sonnet 4.5
**Project:** Catch to Table - US Fishing Regulations Database

---

## Executive Summary

This research project compiled comprehensive fishing regulations data for 6 major US fishing states (Florida, Texas, California, North Carolina, Louisiana, Alaska) plus federal waters regulations. The data is structured for immediate import into a PostgreSQL database and includes 27 commonly caught recreational species with detailed size limits, bag limits, seasonal restrictions, and special regulations.

## Deliverables

### 1. **fishing_regulations_data_2026.json** (34 KB)
Raw compiled data in JSON format with complete metadata, state information, and species regulations.

**Contents:**
- 6 states with complete coordinate data
- 27 species with scientific names
- Detailed regulations including:
  - Size limits (minimum/maximum)
  - Bag limits (daily, possession, vessel)
  - Seasonal open/close dates
  - Geographic restrictions
  - Special regulations
  - Effective dates
  - Water jurisdiction classifications

### 2. **fishing_regulations_schema.sql** (19 KB)
Production-ready PostgreSQL database schema with:
- 10 core tables (states, species, regulations, federal_regulations, etc.)
- 3 views for common queries
- 2 helper functions
- Automatic timestamp triggers
- Comprehensive indexes
- Foreign key constraints
- Check constraints for data integrity
- Comments and documentation

**Key Features:**
- Normalized relational design
- Support for regional variations within states
- Audit trail for regulation changes
- Special restrictions tracking
- Federal vs state waters distinction
- Emergency order tracking capability

### 3. **import_sample_data.sql** (37 KB)
Complete SQL import script with:
- 6 states with geographic coordinates
- 27 fish species with taxonomy
- 28+ state-level regulations
- 5 federal regulations
- License requirements by state
- Special restrictions (gear, reporting, tags)
- State agency contact information
- Verification queries

### 4. **FISHING_REGULATIONS_README.md** (12 KB)
Comprehensive documentation including:
- Database schema overview
- Installation instructions
- Usage examples with SQL queries
- Data source citations with URLs
- Important regulatory compliance notes
- Future enhancement roadmap
- API integration ideas
- Disclaimer and legal considerations

### 5. **regulations_quick_reference.csv** (8.6 KB)
Human-readable CSV file with all regulations for easy viewing in spreadsheet applications.

---

## States Covered

### 1. Florida (FL)
**Coordinates:** 27.994402°N, 81.760254°W
**Species Covered:** 10
- Red Snapper, Gag Grouper, Red Grouper, Black Grouper
- Mahi-Mahi (Dolphinfish)
- Spotted Seatrout, Red Drum (Redfish)
- Largemouth Bass, Striped Bass, Bluefish

**Key Features:**
- State waters: 0-3 miles (Atlantic), 0-9 miles (Gulf)
- Regional management areas (Panhandle, Big Bend, Tampa Bay, etc.)
- Indian River Lagoon catch-and-release zone for redfish
- TrophyCatch program for bass
- Complex grouper aggregate bag limits

### 2. Texas (TX)
**Coordinates:** 31.968599°N, 99.901813°W
**Species Covered:** 4
- Red Snapper
- Spotted Seatrout (Speckled Trout)
- Largemouth Bass, Smallmouth Bass

**Key Features:**
- Year-round red snapper in state waters (0-9 nautical miles)
- New spotted seatrout slot limit (15-20 inches, effective March 2024)
- Oversized Spotted Seatrout Tag system
- Circle hook requirement for red snapper
- Combined black bass bag limits

### 3. California (CA)
**Coordinates:** 36.778259°N, 119.417931°W
**Species Covered:** 4
- Rockfish (general regulations)
- Rainbow Trout
- Steelhead
- Largemouth Bass

**Key Features:**
- Seasonal rockfish closure (Jan 1 - Mar 31 for boat anglers)
- Prohibited rockfish species (Cowcod, Quillback, Yelloweye, Bronzespotted)
- Report card requirements for steelhead and salmon
- Wild vs hatchery steelhead distinction (adipose fin clipping)
- Different seasons for lakes/reservoirs vs streams/rivers

### 4. North Carolina (NC)
**Coordinates:** 35.782169°N, 80.793457°W
**Species Covered:** 4
- Striped Bass
- Bluefish
- Summer Flounder, Southern Flounder

**Key Features:**
- Multiple management areas for striped bass
- Slot limit for striped bass in Atlantic (28-31 inches)
- Albemarle Sound closures
- Mandatory harvest reporting for southern flounder
- Two separate flounder seasons
- Bluefish bag limit increase (Jan 2026)

### 5. Louisiana (LA)
**Coordinates:** 30.984298°N, 91.962333°W
**Species Covered:** 2
- Spotted Seatrout (Speckled Trout)
- Red Drum (Redfish)

**Key Features:**
- New speckled trout regulations (effective November 20)
- Slot limits for both species
- Retention limits on oversized fish
- Saltwater line boundary designation

### 6. Alaska (AK)
**Coordinates:** 63.588753°N, 154.493062°W
**Species Covered:** 4
- King Salmon (Chinook)
- Pacific Halibut
- Rockfish
- Lingcod

**Key Features:**
- Highly variable regulations by drainage and region
- Emergency Orders frequently issued
- IPHC (International Pacific Halibut Commission) management
- Unique lingcod slot limit (30-35" OR 55+")
- Annual limits in addition to daily limits
- Resident vs nonresident distinctions

---

## Federal Waters Regulations

**Managing Agency:** NOAA Fisheries
**Species Covered:** 5

### Billfish (HMS - Highly Migratory Species)
1. **Blue Marlin** - 99" minimum (lower-jaw fork length), 250/vessel/year combined limit
2. **White Marlin** - 66" minimum, 250/vessel/year combined limit
3. **Sailfish** - 63" minimum, no daily limit

### Tuna
4. **Yellowfin Tuna** - 27" minimum (curved fork length), 3 per angler per day
5. **Blackfin Tuna** - No minimum, no HMS permit required

**Key Requirements:**
- HMS Angling or Charterboat/Headboat permit required (except blackfin)
- Cannot retain billfish if hammerhead or oceanic whitetip shark aboard
- Must land tuna with tail and one pectoral fin attached

---

## Species Coverage Summary

### By Water Type
- **Saltwater:** 18 species
- **Freshwater:** 4 species
- **Anadromous:** 5 species

### Common Recreational Species Included

**Saltwater:**
- Snappers: Red Snapper
- Groupers: Gag, Red, Black
- Drums: Red Drum (Redfish), Spotted Seatrout
- Flatfish: Summer Flounder, Southern Flounder
- Pelagics: Mahi-Mahi, Bluefish
- Billfish: Blue Marlin, White Marlin, Sailfish
- Tuna: Yellowfin, Blackfin
- Rockfish (Pacific), Pacific Halibut, Lingcod

**Freshwater:**
- Bass: Largemouth, Smallmouth
- Trout: Rainbow Trout
- Other: Walleye

**Anadromous:**
- Striped Bass, Steelhead
- Salmon: King (Chinook), Coho, Sockeye

---

## Regulatory Complexity Highlights

### Multiple Jurisdictions
- **State waters** - Varies by coast (3 or 9 nautical miles)
- **Federal waters** - Beyond state waters to 200-mile EEZ
- **Inland waters** - Lakes, rivers, streams
- **Coastal/Joint waters** - Overlapping jurisdictions
- **International** - IPHC for halibut

### Special Management Measures
- **Slot limits** - TX seatrout (15-20"), LA redfish (16-27"), AK lingcod (30-35" or 55+")
- **Aggregate bag limits** - FL grouper (3 total, 1 gag/black max)
- **Vessel limits** - FL mahi-mahi (30/vessel in Atlantic)
- **Tag systems** - TX oversized seatrout tags
- **Closed areas** - FL Indian River Lagoon (redfish), NC Albemarle Sound (striped bass)
- **Protected species** - CA rockfish species, prohibited retention
- **Seasonal closures** - Variable by species and location
- **Gear restrictions** - Circle hooks for TX red snapper
- **Harvest reporting** - NC southern flounder mandatory reporting
- **Report cards** - CA steelhead and salmon

### Measurement Methods
- **Total Length** - Most common (tip of snout to tail compressed)
- **Fork Length** - Used for mahi-mahi, tuna
- **Curved Fork Length** - Specific tuna species
- **Lower-Jaw Fork Length** - Billfish only

---

## Data Quality and Verification

### Sources
All data compiled from official government sources:
- State fish and wildlife agency websites
- Official regulation booklets and PDFs
- NOAA Fisheries HMS management
- eRegulations digital guides
- Direct web searches of official sources

### Verification Status
- **Last Compiled:** February 10, 2026
- **Sources Verified:** All regulations cross-referenced with official state websites
- **URLs Documented:** All source URLs included in database and README
- **Effective Dates:** All regulations include effective date information

### Known Limitations
1. Only 6 of 51+ jurisdictions included (44 states + DC + 5 territories remaining)
2. Not all species in covered states included (focused on popular recreational species)
3. Some regional variations within states not fully captured
4. Seasonal dates for some species announced annually (not yet available for 2026)
5. Emergency orders and proclamations can change regulations at any time
6. Some scientific names may need verification
7. Federal EEZ boundaries not precisely mapped

---

## Database Features

### Schema Highlights
- **Normalized Design** - Reduces redundancy, ensures data integrity
- **Flexible Regional Variations** - Supports sub-state management areas
- **Audit Trail** - Tracks all regulation changes over time
- **Temporal Support** - Effective date ranges for historical data
- **Multi-jurisdiction** - Handles state, federal, coastal, inland, joint waters
- **Special Restrictions** - Separate table for gear, reporting, license requirements
- **Contact Information** - Agency phone numbers and websites

### Performance Optimizations
- Strategic indexes on commonly queried columns
- Views for complex common queries
- Helper functions for business logic
- Automatic timestamp updates via triggers

### Future-Proof Design
- PostGIS support comments (for geographic boundaries)
- JSONB fields for flexible metadata
- Support for emergency orders
- Annual vs daily limits
- Tournament exemptions (structure ready)

---

## Usage Scenarios

### For Anglers
- Look up current regulations before fishing
- Check if a species is in season
- Verify size and bag limits
- Find state agency contact information
- Understand measurement requirements

### For Developers
- Build fishing mobile apps
- GPS-based regulation lookup
- Catch logging with compliance checking
- Real-time regulation updates
- Educational fishing resources

### For Researchers
- Analyze regulation patterns across states
- Study conservation measures
- Track regulation changes over time
- Compare management approaches

### For Agencies
- Cross-state regulation comparison
- Standardization efforts
- Public information dissemination
- Compliance monitoring

---

## Next Steps for Complete Coverage

### Remaining States (Priority Order)

**High Priority (Major Fishing Destinations):**
1. Georgia - Inshore/offshore Atlantic
2. South Carolina - Coastal fisheries
3. Alabama - Gulf fisheries
4. Mississippi - Gulf fisheries
5. Oregon - Pacific salmon, rockfish
6. Washington - Pacific salmon, halibut, bottomfish
7. Michigan - Great Lakes walleye, salmon, trout
8. Minnesota - Walleye, northern pike
9. Wisconsin - Great Lakes and inland

**Medium Priority (Significant Fisheries):**
10. Virginia - Chesapeake Bay
11. Maryland - Chesapeake Bay
12. Delaware - Atlantic coast
13. New Jersey - Atlantic coast
14. New York - Great Lakes and Atlantic
15. Massachusetts - Atlantic groundfish
16. Maine - Lobster and groundfish
17. Rhode Island - Atlantic coast
18. Connecticut - Long Island Sound
19. Pennsylvania - Lake Erie and inland
20. Ohio - Lake Erie walleye

**Freshwater States:**
21-44. Remaining inland states (Kentucky, Tennessee, Missouri, Arkansas, Oklahoma, Kansas, Nebraska, etc.)

**Territories:**
45. Puerto Rico
46. US Virgin Islands
47. Guam
48. American Samoa
49. Northern Mariana Islands

**Special Jurisdictions:**
50. District of Columbia
51. Tribal fishing regulations (where applicable)

### Additional Species to Add

**Saltwater (High Priority):**
- Cobia, King Mackerel, Spanish Mackeah
- Wahoo, Barracuda
- Amberjack, Triggerfish
- Sheepshead, Black Sea Bass
- Tautog, Scup (Porgy)
- Weakfish, Croaker
- Sharks (various species)
- Swordfish, Bluefin Tuna

**Freshwater (High Priority):**
- Catfish (Channel, Blue, Flathead)
- Crappie (Black, White)
- Northern Pike, Muskie
- Perch (Yellow, White)
- Bluegill, Sunfish
- Brook Trout, Brown Trout, Lake Trout

**Regional Specialties:**
- Snook (FL)
- Tarpon (FL, Gulf)
- Bonefish (FL)
- Permit (FL)
- Alligator Gar (TX, LA)
- Sturgeon (Pacific, Atlantic, Great Lakes)

---

## Technical Implementation Notes

### Database Setup
```bash
# Create database
createdb fishing_regulations

# Import schema
psql -d fishing_regulations -f fishing_regulations_schema.sql

# Import data
psql -d fishing_regulations -f import_sample_data.sql

# Verify
psql -d fishing_regulations -c "SELECT * FROM v_current_regulations LIMIT 10;"
```

### Sample Queries
See FISHING_REGULATIONS_README.md for comprehensive query examples.

### API Endpoint Ideas
- `GET /api/states` - List all states
- `GET /api/states/{state}/species` - Species in a state
- `GET /api/species/{id}/regulations?state={state}` - Get regulations
- `GET /api/regulations/current?lat={lat}&lng={lng}` - GPS-based lookup
- `GET /api/seasons/open?date={date}&state={state}` - Open seasons
- `POST /api/catch/validate` - Validate a catch against regulations

---

## Important Disclaimers

### Legal Compliance
1. This database is a **reference tool only**, not a legal document
2. Always verify regulations with official state agencies before fishing
3. Emergency orders can change regulations without notice
4. Regulations may vary by specific water body within states
5. Charter/for-hire vessels may have different regulations
6. Always check for current proclamations and updates

### Data Accuracy
1. Regulations are subject to change at any time
2. Some seasonal dates are announced annually
3. Emergency closures can occur based on stock assessments
4. Special use permits may have different regulations
5. Tournament exemptions may apply in some cases

### Liability
The compilers assume no liability for errors, omissions, or outdated information. Users must verify all information independently with official sources.

---

## Maintenance and Updates

### Update Frequency Recommendations
- **Monthly:** Check for emergency orders and proclamations
- **Quarterly:** Verify seasonal date changes
- **Annually:** Complete review of all regulations
- **As Needed:** Immediate updates for major regulation changes

### Data Sources to Monitor
- State agency press releases
- NOAA Fisheries announcements
- Regional fishery management councils
- Interstate marine fisheries commissions
- State legislature fishing law changes

---

## Project Statistics

### Research Effort
- **States Researched:** 6 of 51+ jurisdictions
- **Species Documented:** 27 species
- **Regulations Compiled:** 28+ state regulations, 5+ federal regulations
- **Official Sources Consulted:** 13+ government websites
- **Web Searches Conducted:** 25+
- **Data Verification:** All regulations cross-referenced with official sources

### Deliverable Statistics
- **Total Files Created:** 5
- **Total Lines of Code (SQL):** ~1,000+
- **Database Tables:** 10
- **Database Views:** 3
- **Database Functions:** 2
- **JSON Data Size:** 34 KB
- **Documentation:** 12 KB README + this summary

### Coverage Statistics
- **US Population Coverage:** ~25% (based on 6 major fishing states)
- **Coastline Coverage:** Atlantic, Gulf of Mexico, Pacific (partial)
- **Species Representation:** ~30-40% of commonly caught recreational species
- **Jurisdiction Types:** State, Federal, Coastal, Inland, Joint, International

---

## Conclusion

This fishing regulations database provides a solid foundation for a comprehensive US fishing regulations system. The 6 states covered represent diverse fisheries management approaches across different regions:

- **Florida:** Complex regional management, multiple species, reef fish emphasis
- **Texas:** Year-round opportunities, slot limits, tag systems
- **California:** Seasonal management, protected species, report card systems
- **North Carolina:** Multiple jurisdictions, mandatory reporting, management areas
- **Louisiana:** Conservation-focused slot limits
- **Alaska:** Regional complexity, international coordination, emergency orders

The database schema is designed to scale to all 50+ jurisdictions and hundreds of additional species. The normalized structure, comprehensive indexing, and built-in audit capabilities make it production-ready for mobile applications, web services, and regulatory compliance tools.

### Recommended Next Steps
1. **Expand coverage** to top 10 fishing states
2. **Add API layer** for mobile app integration
3. **Implement GPS-based lookup** using PostGIS
4. **Create mobile app** for angler use
5. **Establish update process** for regulation changes
6. **Partner with state agencies** for official data feeds
7. **Add species identification** features
8. **Include fishing hotspots** and access points
9. **Integrate weather and tide** information
10. **Build catch logging** with photo upload

---

**Compiled by:** Claude Sonnet 4.5
**Date:** February 10, 2026
**Project:** Catch to Table Fishing Regulations Database
**Status:** Phase 1 Complete - Ready for PostgreSQL Import
