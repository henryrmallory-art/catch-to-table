-- Sample Data Import for Fishing Regulations Database
-- This file contains sample INSERT statements based on the 2026 research data
-- Run this after creating the schema with fishing_regulations_schema.sql

-- =====================================================
-- INSERT STATES
-- =====================================================

INSERT INTO states (state_name, state_abbreviation, latitude, longitude) VALUES
    ('Florida', 'FL', 27.994402, -81.760254),
    ('Texas', 'TX', 31.968599, -99.901813),
    ('California', 'CA', 36.778259, -119.417931),
    ('North Carolina', 'NC', 35.782169, -80.793457),
    ('Louisiana', 'LA', 30.984298, -91.962333),
    ('Alaska', 'AK', 63.588753, -154.493062)
ON CONFLICT (state_abbreviation) DO NOTHING;

-- =====================================================
-- INSERT LICENSE REQUIREMENTS
-- =====================================================

INSERT INTO license_requirements (state_id, water_type, requirement_description, minimum_age, additional_notes, effective_date) VALUES
    ((SELECT state_id FROM states WHERE state_abbreviation = 'FL'), 'freshwater', 'Basic freshwater fishing license required', 16, 'Required for residents and non-residents age 16+', '2026-01-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'FL'), 'saltwater', 'Saltwater fishing license required', 16, 'State waters extend from shore to 3 miles in Atlantic, 9 miles in Gulf of Mexico', '2026-01-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'TX'), 'both', 'Fishing license required for all waters', 17, 'Possession limit equals double the bag limit unless otherwise noted', '2025-09-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'CA'), 'both', 'Sport fishing license required', 16, 'Additional report cards required for steelhead and salmon in some waters', '2026-01-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'NC'), 'freshwater', 'Inland fishing license required', 16, 'Inland regulations effective August 1, 2025 to July 31, 2026', '2025-08-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'NC'), 'saltwater', 'Coastal recreational fishing license required', 16, 'Coastal regulations effective January 26, 2026', '2026-01-26'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'LA'), 'freshwater', 'Basic Fishing License required', 18, 'Required for freshwater species', '2026-01-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'LA'), 'saltwater', 'Saltwater License required', 18, 'Required for areas south of saltwater line', '2026-01-01'),
    ((SELECT state_id FROM states WHERE state_abbreviation = 'AK'), 'both', 'Sport fishing license required', 16, 'Emergency Orders (EOs) supersede published regulations', '2026-01-01')
ON CONFLICT (state_id, water_type) DO NOTHING;

-- =====================================================
-- INSERT SPECIES
-- =====================================================

INSERT INTO species (common_name, scientific_name, species_family, water_type, description) VALUES
    ('Red Snapper', 'Lutjanus campechanus', 'Lutjanidae', 'saltwater', 'Popular reef fish found in Gulf of Mexico and Atlantic Ocean'),
    ('Gag Grouper', 'Mycteroperca microlepis', 'Serranidae', 'saltwater', 'Large grouper species found in Atlantic and Gulf waters'),
    ('Red Grouper', 'Epinephelus morio', 'Serranidae', 'saltwater', 'Common grouper in Gulf of Mexico and Atlantic'),
    ('Black Grouper', 'Mycteroperca bonaci', 'Serranidae', 'saltwater', 'Prized grouper species primarily in Atlantic waters'),
    ('Mahi-Mahi', 'Coryphaena hippurus', 'Coryphaenidae', 'saltwater', 'Fast-swimming pelagic fish, also called dolphinfish'),
    ('Spotted Seatrout', 'Cynoscion nebulosus', 'Sciaenidae', 'saltwater', 'Popular inshore gamefish, also called speckled trout'),
    ('Red Drum', 'Sciaenops ocellatus', 'Sciaenidae', 'saltwater', 'Inshore and nearshore species, also called redfish'),
    ('Largemouth Bass', 'Micropterus salmoides', 'Centrarchidae', 'freshwater', 'Most popular freshwater gamefish in North America'),
    ('Smallmouth Bass', 'Micropterus dolomieu', 'Centrarchidae', 'freshwater', 'Popular gamefish preferring cooler, clearer waters'),
    ('Striped Bass', 'Morone saxatilis', 'Moronidae', 'anadromous', 'Anadromous species found in both fresh and saltwater'),
    ('Bluefish', 'Pomatomus saltatrix', 'Pomatomidae', 'saltwater', 'Aggressive predator found along Atlantic coast'),
    ('Summer Flounder', 'Paralichthys dentatus', 'Paralichthyidae', 'saltwater', 'Popular flatfish along Atlantic coast'),
    ('Southern Flounder', 'Paralichthys lethostigma', 'Paralichthyidae', 'saltwater', 'Important flatfish in Gulf and South Atlantic'),
    ('Rockfish', 'Sebastes spp.', 'Sebastidae', 'saltwater', 'Large genus of Pacific groundfish'),
    ('Rainbow Trout', 'Oncorhynchus mykiss', 'Salmonidae', 'freshwater', 'Popular trout species, steelhead is anadromous form'),
    ('Steelhead', 'Oncorhynchus mykiss', 'Salmonidae', 'anadromous', 'Anadromous form of rainbow trout'),
    ('King Salmon', 'Oncorhynchus tshawytscha', 'Salmonidae', 'anadromous', 'Largest Pacific salmon species, also called chinook'),
    ('Coho Salmon', 'Oncorhynchus kisutch', 'Salmonidae', 'anadromous', 'Pacific salmon species, also called silver salmon'),
    ('Sockeye Salmon', 'Oncorhynchus nerka', 'Salmonidae', 'anadromous', 'Pacific salmon valued for red flesh'),
    ('Pacific Halibut', 'Hippoglossus stenolepis', 'Pleuronectidae', 'saltwater', 'Large flatfish in North Pacific'),
    ('Lingcod', 'Ophiodon elongatus', 'Hexagrammidae', 'saltwater', 'Large predatory fish in North Pacific'),
    ('Blue Marlin', 'Makaira nigricans', 'Istiophoridae', 'saltwater', 'Large billfish, highly prized gamefish'),
    ('White Marlin', 'Kajikia albida', 'Istiophoridae', 'saltwater', 'Smaller marlin species in Atlantic'),
    ('Sailfish', 'Istiophorus platypterus', 'Istiophoridae', 'saltwater', 'Fast billfish known for acrobatic jumps'),
    ('Yellowfin Tuna', 'Thunnus albacares', 'Scombridae', 'saltwater', 'Large tuna species in tropical and subtropical waters'),
    ('Blackfin Tuna', 'Thunnus atlanticus', 'Scombridae', 'saltwater', 'Smaller tuna species in Atlantic'),
    ('Walleye', 'Sander vitreus', 'Percidae', 'freshwater', 'Popular gamefish in northern US and Canada')
ON CONFLICT (common_name, scientific_name) DO NOTHING;

-- =====================================================
-- INSERT REGULATIONS - FLORIDA
-- =====================================================

-- Florida Red Snapper
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, season_description, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Red Snapper' AND scientific_name = 'Lutjanus campechanus'),
    16, '20 inches in Atlantic waters',
    2, '2 per person in Gulf state and federal waters; 1 per person in Atlantic federal waters',
    NULL, NULL, 'Variable season dates announced annually. Atlantic harvest currently closed. Gulf season typically ~60 days starting in June.', FALSE,
    'both', 'Different regulations for Gulf vs Atlantic waters',
    'Season dates announced annually by NOAA and FWC. Atlantic season determined by NOAA.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Gag Grouper
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, is_year_round,
    water_jurisdiction, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Gag Grouper'),
    24,
    1, 'Within 3-grouper aggregate bag limit',
    '2026-05-01', '2026-12-31', FALSE,
    'both', 'Closed January 1 - April 30 in Atlantic. Zero bag limit for captain and crew of for-hire vessels in Gulf.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Red Grouper
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Red Grouper'),
    20,
    3, 'Within 3-grouper aggregate bag limit',
    '2026-05-01', '2026-12-31', FALSE,
    'both', 'Atlantic federal waters closed January 1 - April 30',
    'Zero bag limit for captain and crew of for-hire vessels in Gulf.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Black Grouper
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Black Grouper'),
    24,
    1, 'Within 3-grouper aggregate bag limit',
    '2026-05-01', '2026-12-31', FALSE,
    'both', 'Atlantic only. Federal waters closed January 1 - April 30.',
    'Zero bag limit for captain and crew of for-hire vessels in Gulf.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Mahi-Mahi
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes, vessel_limit,
    is_year_round, water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Mahi-Mahi'),
    20, 'Fork length in Atlantic; no minimum in Gulf',
    5, '5 per person', 30,
    TRUE, 'state_waters', 'Different size limits for Atlantic vs Gulf',
    'Captain and crew bag limits prohibited statewide on for-hire vessels. Vessel limit: 30 fish in Atlantic state waters.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Spotted Seatrout
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Spotted Seatrout'),
    15,
    NULL, 'Regional bag limits vary; possession of one fish over 19 inches allowed',
    TRUE, 'state_waters', 'Regional variations throughout state',
    'One fish over 19 inches per vessel (or per person if shore fishing) included in bag limit.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Red Drum
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, maximum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, is_catch_and_release_only,
    water_jurisdiction, geographic_restrictions, special_regulations, slot_limit_description,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Red Drum'),
    18, 27,
    1, 'Regional variations; catch-and-release only in Indian River Lagoon',
    TRUE, FALSE,
    'state_waters', 'Multiple management regions with different limits',
    'Slot limit enforced. Harvest prohibited in Indian River Lagoon (catch-and-release only).',
    '18-27 inches',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Largemouth Bass
INSERT INTO regulations (
    state_id, species_id,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Largemouth Bass'),
    5, '5 black bass total (all Micropterus species combined), only 1 may be 16 inches or longer',
    TRUE, 'state_waters',
    'TrophyCatch program allows temporary possession over limits for documentation. State record submissions allowed. Special regulations on some water bodies.',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- Florida Striped Bass
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, geographic_restrictions,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
    (SELECT species_id FROM species WHERE common_name = 'Striped Bass'),
    18,
    3, 'Applies to Suwannee River system',
    TRUE, 'state_waters', 'Suwannee River system only',
    '2026-01-01', 'Florida Fish and Wildlife Conservation Commission', '2026-02-10'
);

-- =====================================================
-- INSERT REGULATIONS - TEXAS
-- =====================================================

-- Texas Red Snapper
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, season_description, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'TX'),
    (SELECT species_id FROM species WHERE common_name = 'Red Snapper'),
    15, '15 inches in state waters; 16 inches in federal waters when open',
    4, '4 per person in state waters year-round; 2 per person in federal waters when open',
    NULL, NULL, 'Year-round in state waters (0-9 nautical miles). Federal waters closed January 1 - May 21, 2026; open May 22, 2026.', FALSE,
    'both', 'State waters (0-9 nautical miles) vs federal waters',
    'Circle hooks required. Federal season may close if quota reached.',
    '2026-01-01', 'Texas Parks and Wildlife Department', '2026-02-10'
);

-- Texas Spotted Seatrout
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, maximum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, special_regulations, slot_limit_description,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'TX'),
    (SELECT species_id FROM species WHERE common_name = 'Spotted Seatrout'),
    15, 20,
    3, '3 per day within slot limit. One oversized fish (28+ inches) allowed with special tag per license year.',
    TRUE, 'state_waters',
    'Slot limit: 15-20 inches. Oversized Spotted Seatrout Tag and Bonus Tag system for fish over 28 inches. Effective March 2024.',
    '15-20 inches',
    '2024-03-26', 'Texas Parks and Wildlife Department', '2026-02-10'
);

-- Texas Largemouth Bass
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'TX'),
    (SELECT species_id FROM species WHERE common_name = 'Largemouth Bass'),
    14,
    5, '5 fish combined of largemouth, smallmouth, Alabama, Guadalupe, and spotted bass',
    TRUE, 'state_waters', 'Statewide with exceptions on specific water bodies',
    'Some water bodies have different regulations (check Exceptions to Statewide Regulations).',
    '2025-09-01', 'Texas Parks and Wildlife Department', '2026-02-10'
);

-- Texas Smallmouth Bass
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'TX'),
    (SELECT species_id FROM species WHERE common_name = 'Smallmouth Bass'),
    14,
    5, '5 fish combined of largemouth, smallmouth, Alabama, Guadalupe, and spotted bass',
    TRUE, 'state_waters', 'Combined bag limit with other black bass species.',
    '2025-09-01', 'Texas Parks and Wildlife Department', '2026-02-10'
);

-- =====================================================
-- INSERT REGULATIONS - CALIFORNIA
-- =====================================================

-- California Rockfish
INSERT INTO regulations (
    state_id, species_id,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, is_year_round,
    water_jurisdiction, special_regulations, is_protected,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'CA'),
    (SELECT species_id FROM species WHERE common_name = 'Rockfish'),
    10, '10 total Rockfish, Cabezon, and Greenling in aggregate. 2-fish sub-bag limit for Canary Rockfish.',
    '2026-04-01', '2026-12-31', FALSE,
    'state_waters',
    'Bronzespotted, Cowcod, Quillback, and Yelloweye Rockfish may not be taken or possessed at any time. Check for in-season changes.',
    FALSE,
    '2026-01-01', 'California Department of Fish and Wildlife', '2026-02-10'
);

-- California Rainbow Trout
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes, possession_limit,
    season_open_date, season_close_date, season_description, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'CA'),
    (SELECT species_id FROM species WHERE common_name = 'Rainbow Trout'),
    12, 'Varies by water body; 12 inches for most lakes and Delta',
    5, 'Daily bag limit', 10,
    '2026-04-25', '2026-11-15', 'Year-round for lakes and reservoirs; April 25 - November 15 for streams/rivers', FALSE,
    'state_waters', 'Different seasons for lakes/reservoirs vs streams/rivers',
    'Specific regulations vary by water body. Check special regulations for location.',
    '2026-01-01', 'California Department of Fish and Wildlife', '2026-02-10'
);

-- California Steelhead
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    water_jurisdiction, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'CA'),
    (SELECT species_id FROM species WHERE common_name = 'Steelhead'),
    16,
    NULL, 'Varies by water body. Steelhead Report Card required.',
    'state_waters',
    'Steelhead defined as rainbow trout >16 inches in anadromous waters. Only hatchery steelhead (adipose fin clipped) may be retained in many waters; wild steelhead must be released. Report card ($10.29) required.',
    '2026-01-01', 'California Department of Fish and Wildlife', '2026-02-10'
);

-- California Largemouth Bass
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, minimum_size_notes,
    bag_limit_daily,
    is_year_round, water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'CA'),
    (SELECT species_id FROM species WHERE common_name = 'Largemouth Bass'),
    12, 'Varies by water body',
    5,
    TRUE, 'state_waters', 'Varies by water body',
    'Check specific regulations for each water body. Some waters may have closures.',
    '2026-01-01', 'California Department of Fish and Wildlife', '2026-02-10'
);

-- =====================================================
-- INSERT REGULATIONS - NORTH CAROLINA
-- =====================================================

-- North Carolina Striped Bass (Atlantic Ocean)
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, maximum_size_inches, minimum_size_notes,
    bag_limit_daily,
    is_year_round, season_description,
    water_jurisdiction, geographic_restrictions, special_regulations, slot_limit_description,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'NC'),
    (SELECT species_id FROM species WHERE common_name = 'Striped Bass'),
    28, 31, 'Atlantic Ocean: 28-31 inch slot limit. Inland: 18 inch minimum.',
    1,
    TRUE, 'Closed May 1 - September 30 in Albemarle Sound Striped Bass Management Area joint waters. Closed in Albemarle Sound and Central Southern Management Areas.',
    'coastal', 'Multiple management areas with different regulations',
    'Harvest slot limit in Atlantic. Gigging, spearing, or gaffing prohibited. Closed in Albemarle Sound and Central Southern Management Areas.',
    '28-31 inches',
    '2026-01-26', 'North Carolina Division of Marine Fisheries', '2026-02-10'
);

-- North Carolina Bluefish
INSERT INTO regulations (
    state_id, species_id,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'NC'),
    (SELECT species_id FROM species WHERE common_name = 'Bluefish'),
    5, '5 fish for private anglers; 7 fish for for-hire anglers',
    TRUE, 'state_waters',
    'Bag limit increase effective January 1, 2026 based on improved stock assessment.',
    '2026-01-01', 'North Carolina Division of Marine Fisheries', '2026-02-10'
);

-- North Carolina Summer Flounder
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily,
    season_open_date, season_close_date, season_description, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'NC'),
    (SELECT species_id FROM species WHERE common_name = 'Summer Flounder'),
    15,
    1,
    '2026-05-15', '2026-09-30', 'Two separate open seasons: May 15-Sept 30 & Oct 10-Dec 31', FALSE,
    'state_waters', 'Internal Coastal and Joint Fishing Waters',
    '1 per person per day during open season. Second season opens October 10.',
    '2026-01-26', 'North Carolina Division of Marine Fisheries', '2026-02-10'
);

-- North Carolina Southern Flounder
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily,
    season_open_date, season_close_date, season_description, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'NC'),
    (SELECT species_id FROM species WHERE common_name = 'Southern Flounder'),
    15,
    1,
    '2025-09-01', '2025-09-14', 'Very limited season (2025 dates; check for 2026 updates)', FALSE,
    'state_waters', 'Internal Coastal and Joint Fishing Waters',
    'Harvest must be reported at deq.nc.gov/report-my-fish (effective December 1, 2025).',
    '2025-09-01', 'North Carolina Division of Marine Fisheries', '2026-02-10'
);

-- =====================================================
-- INSERT REGULATIONS - LOUISIANA
-- =====================================================

-- Louisiana Spotted Seatrout
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'LA'),
    (SELECT species_id FROM species WHERE common_name = 'Spotted Seatrout'),
    13,
    15, '15 per person; no more than 2 fish over 25 inches can be retained. New regulations (13-20 inch slot, 2 over 20 inches) effective November 20.',
    TRUE, 'state_waters',
    'Size and bag limit changes went into effect November 20. Only 2 fish over 25 inches (or 20 inches under new rules) allowed.',
    '2025-11-20', 'Louisiana Department of Wildlife and Fisheries', '2026-02-10'
);

-- Louisiana Red Drum
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, maximum_size_inches,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, special_regulations, slot_limit_description,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'LA'),
    (SELECT species_id FROM species WHERE common_name = 'Red Drum'),
    16, 27,
    4, '4 fish per person within slot limit',
    TRUE, 'state_waters',
    'Slot limit: 16-27 inches total length. Retention over maximum prohibited.',
    '16-27 inches',
    '2026-01-01', 'Louisiana Department of Wildlife and Fisheries', '2026-02-10'
);

-- =====================================================
-- INSERT REGULATIONS - ALASKA
-- =====================================================

-- Alaska King Salmon
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes,
    season_open_date, season_close_date, is_year_round,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'AK'),
    (SELECT species_id FROM species WHERE common_name = 'King Salmon'),
    28, 'Southeast Alaska and Yakutat region',
    1, '1 per day for residents (Southeast/Yakutat). Limits vary by region and residency.',
    '2025-04-03', '2026-04-30', FALSE,
    'state_waters', 'Regulations vary significantly by region and drainage',
    'Specific to Southeast Alaska and Yakutat. Check area-specific regulations. Emergency Orders frequently issued.',
    '2025-04-03', 'Alaska Department of Fish and Game', '2026-02-10'
);

-- Alaska Pacific Halibut
INSERT INTO regulations (
    state_id, species_id,
    bag_limit_daily, bag_limit_notes,
    water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'AK'),
    (SELECT species_id FROM species WHERE common_name = 'Pacific Halibut'),
    1, 'Nonresidents: 1 daily; varies by charter vs unguided. Charter vessels in Homer: 2 daily (1 any size, 1 under 27 inches).',
    'federal', 'Limits vary by management unit (e.g., Homer has different charter limits)',
    'International Pacific Halibut Commission (IPHC) regulations. Daily limits remained same for 2026 unguided sectors.',
    '2026-01-01', 'Alaska Department of Fish and Game / IPHC', '2026-02-10'
);

-- Alaska Rockfish
INSERT INTO regulations (
    state_id, species_id,
    bag_limit_daily, bag_limit_notes,
    is_year_round, water_jurisdiction, geographic_restrictions, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'AK'),
    (SELECT species_id FROM species WHERE common_name = 'Rockfish'),
    6, 'Nonresidents: 6 per day. Pelagic rockfish in Southeast: 5 daily, 10 possession in some areas.',
    TRUE, 'state_waters', 'Regional variations',
    'Pelagic rockfish regulations vary by area (Petersburg, Wrangell, Kake areas).',
    '2026-01-01', 'Alaska Department of Fish and Game', '2026-02-10'
);

-- Alaska Lingcod
INSERT INTO regulations (
    state_id, species_id, minimum_size_inches, maximum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes,
    water_jurisdiction, special_regulations, slot_limit_description,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT state_id FROM states WHERE state_abbreviation = 'AK'),
    (SELECT species_id FROM species WHERE common_name = 'Lingcod'),
    30, 35, '30-35 inches OR 55+ inches',
    1, '1 per day, 1 in possession. Annual limit: 2 fish (1 at 30-35 inches, 1 at 55+ inches).',
    'state_waters',
    'Slot limit with option for one trophy fish. Annual limit of 2 fish with size requirements.',
    '30-35 inches OR 55+ inches',
    '2026-01-01', 'Alaska Department of Fish and Game', '2026-02-10'
);

-- =====================================================
-- INSERT FEDERAL REGULATIONS
-- =====================================================

-- Blue Marlin (Federal)
INSERT INTO federal_regulations (
    species_id, management_agency,
    minimum_size_inches, minimum_size_notes,
    bag_limit_daily, annual_limit, vessel_annual_limit, bag_limit_notes,
    is_year_round, geographic_scope,
    permit_required, permit_type, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT species_id FROM species WHERE common_name = 'Blue Marlin'),
    'NOAA Fisheries',
    99, 'Lower-jaw fork length in federal waters',
    NULL, NULL, 250, 'No daily limit, but 250 fish per vessel per year combined for blue marlin, white marlin, and roundscale spearfish',
    TRUE, 'Atlantic Ocean and Gulf of Mexico',
    TRUE, 'HMS Angling or HMS Charterboat/Headboat permit',
    'Cannot retain if hammerhead or oceanic whitetip shark on board.',
    '2026-01-01', 'NOAA Fisheries', '2026-02-10'
);

-- White Marlin (Federal)
INSERT INTO federal_regulations (
    species_id, management_agency,
    minimum_size_inches, minimum_size_notes,
    bag_limit_daily, vessel_annual_limit, bag_limit_notes,
    is_year_round, geographic_scope,
    permit_required, permit_type, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT species_id FROM species WHERE common_name = 'White Marlin'),
    'NOAA Fisheries',
    66, 'Lower-jaw fork length',
    NULL, 250, 'No daily limit, but 250 fish per vessel per year combined with blue marlin and roundscale spearfish',
    TRUE, 'Atlantic Ocean and Gulf of Mexico',
    TRUE, 'HMS Angling or HMS Charterboat/Headboat permit',
    'Cannot retain if hammerhead or oceanic whitetip shark on board.',
    '2026-01-01', 'NOAA Fisheries', '2026-02-10'
);

-- Sailfish (Federal)
INSERT INTO federal_regulations (
    species_id, management_agency,
    minimum_size_inches, minimum_size_notes,
    is_year_round, geographic_scope,
    permit_required, permit_type, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT species_id FROM species WHERE common_name = 'Sailfish'),
    'NOAA Fisheries',
    63, 'Lower-jaw fork length',
    TRUE, 'Atlantic Ocean and Gulf of Mexico',
    TRUE, 'HMS Angling or HMS Charterboat/Headboat permit',
    'Cannot retain if hammerhead or oceanic whitetip shark on board.',
    '2026-01-01', 'NOAA Fisheries', '2026-02-10'
);

-- Yellowfin Tuna (Federal)
INSERT INTO federal_regulations (
    species_id, management_agency,
    minimum_size_inches, minimum_size_notes,
    bag_limit_daily, bag_limit_notes,
    is_year_round, geographic_scope,
    permit_required, permit_type, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT species_id FROM species WHERE common_name = 'Yellowfin Tuna'),
    'NOAA Fisheries',
    27, 'Curved fork length',
    3, '3 per angler per day or trip',
    TRUE, 'Atlantic Ocean and Gulf of Mexico',
    TRUE, 'HMS Angling or HMS Charterboat/Headboat permit',
    'Must be landed with tail and one pectoral fin attached.',
    '2026-01-01', 'NOAA Fisheries', '2026-02-10'
);

-- Blackfin Tuna (Federal)
INSERT INTO federal_regulations (
    species_id, management_agency,
    is_year_round, geographic_scope,
    permit_required, special_regulations,
    effective_start_date, regulation_source, last_verified_date
) VALUES (
    (SELECT species_id FROM species WHERE common_name = 'Blackfin Tuna'),
    'NOAA Fisheries',
    TRUE, 'Atlantic Ocean and Gulf of Mexico',
    FALSE, 'Does not require HMS permit (unlike other HMS species).',
    '2026-01-01', 'NOAA Fisheries', '2026-02-10'
);

-- =====================================================
-- INSERT SPECIAL RESTRICTIONS
-- =====================================================

-- Red Snapper - Circle Hook Requirement (Texas)
INSERT INTO special_restrictions (regulation_id, restriction_type, restriction_description, is_mandatory)
SELECT r.regulation_id, 'gear', 'Circle hooks required when fishing for red snapper', TRUE
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE s.state_abbreviation = 'TX' AND sp.common_name = 'Red Snapper';

-- Southern Flounder - Harvest Reporting (North Carolina)
INSERT INTO special_restrictions (regulation_id, restriction_type, restriction_description, is_mandatory)
SELECT r.regulation_id, 'harvest_reporting', 'All Southern Flounder harvested must be reported at deq.nc.gov/report-my-fish', TRUE
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE s.state_abbreviation = 'NC' AND sp.common_name = 'Southern Flounder';

-- Spotted Seatrout - Oversized Tag (Texas)
INSERT INTO special_restrictions (regulation_id, restriction_type, restriction_description, is_mandatory)
SELECT r.regulation_id, 'license_type', 'Oversized Spotted Seatrout Tag required for fish over 28 inches. Bonus Tag also available.', TRUE
FROM regulations r
JOIN states s ON r.state_id = s.state_id
JOIN species sp ON r.species_id = sp.species_id
WHERE s.state_abbreviation = 'TX' AND sp.common_name = 'Spotted Seatrout';

-- =====================================================
-- INSERT REGULATION CONTACTS
-- =====================================================

INSERT INTO regulation_contacts (state_id, agency_name, phone, website_url, regulations_url) VALUES
    ((SELECT state_id FROM states WHERE state_abbreviation = 'FL'),
     'Florida Fish and Wildlife Conservation Commission',
     '850-488-4676',
     'https://myfwc.com',
     'https://myfwc.com/fishing/'),

    ((SELECT state_id FROM states WHERE state_abbreviation = 'TX'),
     'Texas Parks and Wildlife Department',
     '512-389-4800',
     'https://tpwd.texas.gov',
     'https://tpwd.texas.gov/regulations/outdoor-annual/fishing/'),

    ((SELECT state_id FROM states WHERE state_abbreviation = 'CA'),
     'California Department of Fish and Wildlife',
     '916-445-0411',
     'https://wildlife.ca.gov',
     'https://wildlife.ca.gov/Fishing'),

    ((SELECT state_id FROM states WHERE state_abbreviation = 'NC'),
     'North Carolina Wildlife Resources Commission',
     '919-707-0220',
     'https://www.ncwildlife.org',
     'https://www.ncwildlife.org/fishing'),

    ((SELECT state_id FROM states WHERE state_abbreviation = 'NC'),
     'North Carolina Division of Marine Fisheries',
     '252-515-5500',
     'https://www.deq.nc.gov/about/divisions/marine-fisheries',
     'https://www.deq.nc.gov/marine-fisheries/recreational-size-and-bag-limits'),

    ((SELECT state_id FROM states WHERE state_abbreviation = 'LA'),
     'Louisiana Department of Wildlife and Fisheries',
     '225-765-2898',
     'https://www.wlf.louisiana.gov',
     'https://www.wlf.louisiana.gov/subhome/recreational-fishing'),

    ((SELECT state_id FROM states WHERE state_abbreviation = 'AK'),
     'Alaska Department of Fish and Game',
     '907-465-4100',
     'https://www.adfg.alaska.gov',
     'https://www.adfg.alaska.gov/index.cfm?adfg=fishregulations.main')
ON CONFLICT DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check record counts
SELECT 'States' as table_name, COUNT(*) as record_count FROM states
UNION ALL
SELECT 'Species', COUNT(*) FROM species
UNION ALL
SELECT 'Regulations', COUNT(*) FROM regulations
UNION ALL
SELECT 'Federal Regulations', COUNT(*) FROM federal_regulations
UNION ALL
SELECT 'License Requirements', COUNT(*) FROM license_requirements
UNION ALL
SELECT 'Special Restrictions', COUNT(*) FROM special_restrictions
UNION ALL
SELECT 'Regulation Contacts', COUNT(*) FROM regulation_contacts;

-- Sample query: Get all regulations for a state
-- SELECT * FROM v_current_regulations WHERE state_abbreviation = 'FL' ORDER BY common_name;

-- Sample query: Get species in season now
-- SELECT * FROM v_open_seasons WHERE season_status IN ('Open Year-Round', 'Currently Open');
