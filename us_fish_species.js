// Comprehensive US Fish Species Database
// 200+ species covering all major recreational and commercial fish in US waters

const usFishSpecies = [
  // ============================================
  // SALTWATER - ATLANTIC COAST (40+ species)
  // ============================================
  {
    common_name: "Striped Bass",
    scientific_name: "Morone saxatilis",
    water_type: "anadromous",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "7-8 dark horizontal stripes along silvery body",
      "Two separate dorsal fins",
      "Large mouth extending past eye",
      "Can reach 50+ pounds"
    ]
  },
  {
    common_name: "Bluefish",
    scientific_name: "Pomatomus saltatrix",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "Blue-green back with silver sides",
      "Large mouth with sharp teeth",
      "Forked tail",
      "Aggressive predator behavior"
    ]
  },
  {
    common_name: "Atlantic Cod",
    scientific_name: "Gadus morhua",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Three dorsal fins and two anal fins",
      "Barbel on chin",
      "Olive to brown coloring with spots",
      "White lateral line"
    ]
  },
  {
    common_name: "Haddock",
    scientific_name: "Melanogrammus aeglefinus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Black lateral line",
      "Dark spot above pectoral fin (thumbprint)",
      "Three dorsal fins",
      "Purplish-gray back"
    ]
  },
  {
    common_name: "Pollock",
    scientific_name: "Pollachius virens",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Olive green to brownish back",
      "Forked tail",
      "Lower jaw projects beyond upper",
      "No barbel on chin"
    ]
  },
  {
    common_name: "Atlantic Halibut",
    scientific_name: "Hippoglossus hippoglossus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Both eyes on right side (right-eyed flounder)",
      "Diamond-shaped body",
      "Dark brown to greenish top side",
      "Can exceed 500 pounds"
    ]
  },
  {
    common_name: "Summer Flounder",
    scientific_name: "Paralichthys dentatus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Left-eyed flounder",
      "Five eye-like spots on body",
      "Large mouth with sharp teeth",
      "Mottled brown coloration"
    ]
  },
  {
    common_name: "Winter Flounder",
    scientific_name: "Pseudopleuronectes americanus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Right-eyed flounder",
      "Small mouth",
      "Reddish-brown to muddy green",
      "Straight lateral line"
    ]
  },
  {
    common_name: "Atlantic Mackerel",
    scientific_name: "Scomber scombrus",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "Wavy black bars on back",
      "Iridescent blue-green coloring",
      "Forked tail",
      "No swim bladder"
    ]
  },
  {
    common_name: "Spanish Mackerel",
    scientific_name: "Scomberomorus maculatus",
    water_type: "saltwater",
    flavor_profile: "moderate_oily",
    identifying_features: [
      "Bronze spots on sides",
      "First dorsal fin black at front",
      "No scales on pectoral fins",
      "Streamlined body"
    ]
  },
  {
    common_name: "King Mackerel",
    scientific_name: "Scomberomorus cavalla",
    water_type: "saltwater",
    flavor_profile: "moderate_oily",
    identifying_features: [
      "Lateral line dips sharply below second dorsal fin",
      "No spots (adults)",
      "Sharp cutting teeth",
      "Can reach 90+ pounds"
    ]
  },
  {
    common_name: "Black Sea Bass",
    scientific_name: "Centropristis striata",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large head and mouth",
      "Blue-black coloring with white spots",
      "High dorsal fin with streamers",
      "Protogynous hermaphrodite"
    ]
  },
  {
    common_name: "Tautog",
    scientific_name: "Tautoga onitis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Blunt nose and thick lips",
      "Dark mottled coloring",
      "Strong crushing teeth",
      "Lives around rocky structure"
    ]
  },
  {
    common_name: "Scup (Porgy)",
    scientific_name: "Stenotomus chrysops",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Deep compressed body",
      "Silver with faint bars",
      "Spiny dorsal fin",
      "Small mouth with incisor teeth"
    ]
  },
  {
    common_name: "Red Drum",
    scientific_name: "Sciaenops ocellatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "One or more black spots on tail base",
      "Copper to bronze coloring",
      "Blunt nose",
      "Drum makes croaking sound"
    ]
  },
  {
    common_name: "Black Drum",
    scientific_name: "Pogonias cromis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Multiple barbels under chin",
      "High arched back",
      "Black to gray coloring",
      "Vertical bars on juveniles"
    ]
  },
  {
    common_name: "Spotted Seatrout",
    scientific_name: "Cynoscion nebulosus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Round black spots on back and fins",
      "Two large canine teeth",
      "Silvery body with pinkish iridescence",
      "Soft mouth tears easily"
    ]
  },
  {
    common_name: "Weakfish",
    scientific_name: "Cynoscion regalis",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Diagonal rows of spots",
      "Large canine teeth",
      "Fragile mouth (name origin)",
      "Purple and green iridescence"
    ]
  },
  {
    common_name: "Atlantic Croaker",
    scientific_name: "Micropogonias undulatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Brassy colored body",
      "Short barbels on chin",
      "Vertical wavy lines on sides",
      "Makes croaking sound"
    ]
  },
  {
    common_name: "Cobia",
    scientific_name: "Rachycentron canadum",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Dark lateral stripe",
      "Flat depressed head",
      "Brown body color",
      "First dorsal fin of separate spines"
    ]
  },
  {
    common_name: "Greater Amberjack",
    scientific_name: "Seriola dumerili",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Amber stripe from eye to tail",
      "Deep blue to blue-green back",
      "Forked tail",
      "Strong fighter"
    ]
  },
  {
    common_name: "Dolphinfish (Mahi-Mahi)",
    scientific_name: "Coryphaena hippurus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Brilliant blue-green and yellow coloring",
      "Blunt head (males have high forehead)",
      "Long dorsal fin",
      "Rapid color change when caught"
    ]
  },
  {
    common_name: "Wahoo",
    scientific_name: "Acanthocybium solandri",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Blue vertical bars on sides",
      "Long slender body",
      "Sharp teeth",
      "Fastest fish in ocean (60+ mph)"
    ]
  },
  {
    common_name: "Yellowfin Tuna",
    scientific_name: "Thunnus albacares",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Bright yellow finlets and fins",
      "Dark blue back",
      "Long second dorsal and anal fins",
      "Golden stripe on side"
    ]
  },
  {
    common_name: "Bluefin Tuna",
    scientific_name: "Thunnus thynnus",
    water_type: "saltwater",
    flavor_profile: "rich_firm",
    identifying_features: [
      "Robust torpedo-shaped body",
      "Short pectoral fins",
      "Dark blue back",
      "Can reach 1000+ pounds"
    ]
  },
  {
    common_name: "Albacore Tuna",
    scientific_name: "Thunnus alalunga",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Very long pectoral fins",
      "Deep blue back",
      "White meat",
      "Fusiform body shape"
    ]
  },
  {
    common_name: "Atlantic Bonito",
    scientific_name: "Sarda sarda",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "Oblique dark stripes on back",
      "Fully scaled body",
      "Forked tail",
      "Tuna-like shape"
    ]
  },
  {
    common_name: "False Albacore",
    scientific_name: "Euthynnus alletteratus",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "Worm-like markings on back",
      "Black spots below pectoral fin",
      "No scales except on corselet",
      "Fast and aggressive"
    ]
  },
  {
    common_name: "White Marlin",
    scientific_name: "Kajikia albida",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Rounded dorsal fin tips",
      "Long bill",
      "Blue-green back with silver sides",
      "Pectoral fins fold against body"
    ]
  },
  {
    common_name: "Blue Marlin",
    scientific_name: "Makaira nigricans",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Pointed dorsal fin",
      "Cobalt blue back",
      "Long spear-like bill",
      "Can exceed 1000 pounds"
    ]
  },
  {
    common_name: "Swordfish",
    scientific_name: "Xiphias gladius",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Long flat sword-like bill",
      "No pelvic fins",
      "Large eyes",
      "No scales in adults"
    ]
  },
  {
    common_name: "Sailfish",
    scientific_name: "Istiophorus platypterus",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Large sail-like dorsal fin",
      "Long slender bill",
      "Blue with silver sides",
      "Fastest fish (68 mph)"
    ]
  },
  {
    common_name: "Barracuda",
    scientific_name: "Sphyraena barracuda",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long slender body",
      "Large mouth with fang-like teeth",
      "Projecting lower jaw",
      "Dark bars on sides"
    ]
  },
  {
    common_name: "Sheepshead",
    scientific_name: "Archosargus probatocephalus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "5-6 vertical black bars",
      "Human-like teeth",
      "Deep compressed body",
      "Lives around structure"
    ]
  },
  {
    common_name: "Triggerfish",
    scientific_name: "Balistes capriscus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Triggerlike locking dorsal spine",
      "Compressed oval body",
      "Small mouth with strong teeth",
      "Gray with blue markings"
    ]
  },
  {
    common_name: "Vermilion Snapper",
    scientific_name: "Rhomboplites aurorubens",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Red to pink coloring",
      "Forked tail",
      "Large eyes",
      "Streamlined body"
    ]
  },
  {
    common_name: "Red Snapper",
    scientific_name: "Lutjanus campechanus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Deep red coloring",
      "Red eyes",
      "Pointed anal fin",
      "Triangular head profile"
    ]
  },
  {
    common_name: "Mangrove Snapper",
    scientific_name: "Lutjanus griseus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Olive to gray-brown coloring",
      "Dark bar through eye",
      "Two prominent canine teeth",
      "Rounded anal fin"
    ]
  },
  {
    common_name: "Lane Snapper",
    scientific_name: "Lutjanus synagris",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Yellow horizontal stripes",
      "Pink to red coloring",
      "Dark spot on sides",
      "Rounded anal fin"
    ]
  },
  {
    common_name: "Snook",
    scientific_name: "Centropomus undecimalis",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Prominent black lateral line",
      "Sloping forehead",
      "Protruding lower jaw",
      "Bright yellow pelvic fins"
    ]
  },
  {
    common_name: "Tarpon",
    scientific_name: "Megalops atlanticus",
    water_type: "saltwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Large silver scales",
      "Upturned mouth",
      "Thread-like last dorsal ray",
      "Can reach 200+ pounds"
    ]
  },
  {
    common_name: "Bonefish",
    scientific_name: "Albula vulpes",
    water_type: "saltwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Silver torpedo-shaped body",
      "Conical snout",
      "Inferior mouth",
      "Forked tail"
    ]
  },
  {
    common_name: "Permit",
    scientific_name: "Trachinotus falcatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Deep compressed body",
      "Blunt rounded head",
      "Falcate dorsal and anal fins",
      "Silver with orange on belly"
    ]
  },

  // ============================================
  // SALTWATER - GULF OF MEXICO (30+ species)
  // ============================================
  {
    common_name: "Gag Grouper",
    scientific_name: "Mycteroperca microlepis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Brownish-gray with worm-like markings",
      "Large mouth",
      "Squared-off tail in adults",
      "Kiss-like pattern on sides"
    ]
  },
  {
    common_name: "Red Grouper",
    scientific_name: "Epinephelus morio",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Reddish-brown mottled coloring",
      "Darker blotches",
      "White spots on sides",
      "Mouth lining orange-red"
    ]
  },
  {
    common_name: "Black Grouper",
    scientific_name: "Mycteroperca bonaci",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Dark olive to gray body",
      "Rectangular dark blotches",
      "Orange-red trim on fins",
      "Squared-off tail"
    ]
  },
  {
    common_name: "Goliath Grouper",
    scientific_name: "Epinephelus itajara",
    water_type: "saltwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Massive size (800+ pounds)",
      "Brownish-yellow with dark bars",
      "Small eyes relative to head",
      "Protected species in US"
    ]
  },
  {
    common_name: "Yellowedge Grouper",
    scientific_name: "Hyporthodus flavolimbatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Yellow margin on all fins",
      "Brown to purplish body",
      "Lives in deep water",
      "Pale blotches on sides"
    ]
  },
  {
    common_name: "Scamp",
    scientific_name: "Mycteroperca phenax",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Brown with small dark spots",
      "Yellow-brown spotting pattern",
      "Third dorsal spine longest",
      "Grouped spots forming lines"
    ]
  },
  {
    common_name: "Gray Triggerfish",
    scientific_name: "Balistes capriscus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Gray body with blue spots",
      "Three dorsal spines (first locks)",
      "Deep compressed body",
      "Small mouth with crushing teeth"
    ]
  },
  {
    common_name: "Greater Amberjack",
    scientific_name: "Seriola dumerili",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Amber band from eye to tail",
      "Blueish-green back",
      "Forked tail",
      "No scutes on lateral line"
    ]
  },
  {
    common_name: "Almaco Jack",
    scientific_name: "Seriola rivoliana",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "High arched head profile",
      "Dark band through eye",
      "Sickle-shaped fins",
      "Amber tinge on sides"
    ]
  },
  {
    common_name: "Yellowtail Snapper",
    scientific_name: "Ocyurus chrysurus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Bright yellow stripe from snout to tail",
      "Deeply forked yellow tail",
      "Blue-gray back with yellow spots",
      "Streamlined body"
    ]
  },
  {
    common_name: "Mutton Snapper",
    scientific_name: "Lutjanus analis",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Blue line below eye",
      "Black spot on sides",
      "Reddish coloring",
      "Pointed anal fin"
    ]
  },
  {
    common_name: "Cubera Snapper",
    scientific_name: "Lutjanus cyanopterus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Largest Atlantic snapper (100+ lbs)",
      "Thick rubbery lips",
      "Large canine teeth",
      "Gray to brown coloring"
    ]
  },
  {
    common_name: "Hogfish",
    scientific_name: "Lachnolaimus maximus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Long pig-like snout",
      "First three dorsal spines elongated",
      "Color changes dramatically",
      "Thick lips"
    ]
  },
  {
    common_name: "Tripletail",
    scientific_name: "Lobotes surinamensis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Three-lobed tail appearance",
      "Mottled brown and yellow",
      "Deep compressed body",
      "Mimics floating debris"
    ]
  },
  {
    common_name: "Tilefish",
    scientific_name: "Lopholatilus chamaeleonticeps",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Colorful with blue-green and rose",
      "Yellow spots on body and fins",
      "Fleshy projection on head",
      "Deep water species"
    ]
  },
  {
    common_name: "Sand Seatrout",
    scientific_name: "Cynoscion arenarius",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Pale yellow-brown coloring",
      "Vague diagonal lines",
      "Two large canine teeth",
      "No spots"
    ]
  },
  {
    common_name: "Southern Flounder",
    scientific_name: "Paralichthys lethostigma",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Left-eyed flounder",
      "No eye spots",
      "Large mouth with teeth",
      "Mottled brown coloration"
    ]
  },
  {
    common_name: "Gulf Flounder",
    scientific_name: "Paralichthys albigutta",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Three eye-like spots forming triangle",
      "Left-eyed flounder",
      "White spots on body",
      "Brownish coloring"
    ]
  },
  {
    common_name: "Hardhead Catfish",
    scientific_name: "Ariopsis felis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Four barbels under jaw",
      "Hard plate on head",
      "Venomous dorsal and pectoral spines",
      "Mottled gray-brown"
    ]
  },
  {
    common_name: "Gafftopsail Catfish",
    scientific_name: "Bagre marinus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long ribbon-like dorsal and pectoral fins",
      "Four barbels (two very long)",
      "Venomous spines",
      "Blue-gray coloring"
    ]
  },
  {
    common_name: "Crevalle Jack",
    scientific_name: "Caranx hippos",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Black spot on gill cover",
      "Deep compressed body",
      "Scutes on lateral line",
      "Blunt head"
    ]
  },
  {
    common_name: "Pompano",
    scientific_name: "Trachinotus carolinus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Deep compressed silver body",
      "Bluish back",
      "Yellow on throat and belly",
      "No scales on preopercle"
    ]
  },
  {
    common_name: "Lookdown",
    scientific_name: "Selene vomer",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Extremely compressed body",
      "Very blunt head profile",
      "Long dorsal and anal fin lobes",
      "Silver with faint bars"
    ]
  },
  {
    common_name: "Ladyfish",
    scientific_name: "Elops saurus",
    water_type: "saltwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Elongated silver body",
      "Large mouth",
      "Forked tail",
      "Acrobatic when hooked"
    ]
  },
  {
    common_name: "Atlantic Spadefish",
    scientific_name: "Chaetodipterus faber",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Disc-like compressed body",
      "4-6 dark vertical bars",
      "Spade-shaped profile",
      "Small mouth"
    ]
  },
  {
    common_name: "Southern Kingfish",
    scientific_name: "Menticirrhus americanus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Single barbel on chin",
      "Dark diagonal bars",
      "Silvery gray coloring",
      "Inferior mouth"
    ]
  },
  {
    common_name: "Atlantic Bumper",
    scientific_name: "Chloroscombrus chrysurus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Very compressed body",
      "Yellow tail",
      "Black spot on gill cover",
      "Small scales"
    ]
  },
  {
    common_name: "Atlantic Threadfin",
    scientific_name: "Polydactylus octonemus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Eight free pectoral fin rays (threads)",
      "Two dorsal fins",
      "Inferior mouth",
      "Silvery coloring"
    ]
  },
  {
    common_name: "Pigfish",
    scientific_name: "Orthopristis chrysoptera",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Bronze spots forming stripes",
      "Grunting sound when caught",
      "Small mouth",
      "Compressed body"
    ]
  },
  {
    common_name: "Pinfish",
    scientific_name: "Lagodon rhomboides",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Dark spot behind gill cover",
      "5-6 vertical bars",
      "Deep compressed body",
      "Yellow and blue stripes on head"
    ]
  },

  // ============================================
  // SALTWATER - PACIFIC COAST (40+ species)
  // ============================================
  {
    common_name: "Chinook Salmon",
    scientific_name: "Oncorhynchus tshawytscha",
    water_type: "anadromous",
    flavor_profile: "rich_firm",
    identifying_features: [
      "Black spots on back and both tail lobes",
      "Black gums",
      "Largest Pacific salmon (100+ lbs)",
      "Silver with greenish-blue back"
    ]
  },
  {
    common_name: "Coho Salmon",
    scientific_name: "Oncorhynchus kisutch",
    water_type: "anadromous",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Spots only on upper tail lobe",
      "White gums",
      "Silver with dark blue back",
      "Hooked jaw in spawning males"
    ]
  },
  {
    common_name: "Sockeye Salmon",
    scientific_name: "Oncorhynchus nerka",
    water_type: "anadromous",
    flavor_profile: "rich_firm",
    identifying_features: [
      "No spots on back or tail",
      "Deep red flesh",
      "Turns bright red when spawning",
      "Greenish head"
    ]
  },
  {
    common_name: "Pink Salmon",
    scientific_name: "Oncorhynchus gorbuscha",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large oval spots on back and tail",
      "Smallest Pacific salmon",
      "Pronounced hump in spawning males",
      "Light pink flesh"
    ]
  },
  {
    common_name: "Chum Salmon",
    scientific_name: "Oncorhynchus keta",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "No spots on back or tail",
      "Tiger stripes when spawning",
      "Pale flesh",
      "Large teeth in spawning fish"
    ]
  },
  {
    common_name: "Steelhead Trout",
    scientific_name: "Oncorhynchus mykiss",
    water_type: "anadromous",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Pink stripe along lateral line",
      "Black spots on back, fins, and tail",
      "Square tail",
      "Sea-run rainbow trout"
    ]
  },
  {
    common_name: "Pacific Halibut",
    scientific_name: "Hippoglossus stenolepis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Right-eyed flounder",
      "Diamond-shaped body",
      "Dark brown to gray top",
      "Can exceed 400 pounds"
    ]
  },
  {
    common_name: "California Halibut",
    scientific_name: "Paralichthys californicus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Both left and right-eyed fish occur",
      "High arch in lateral line",
      "Mottled brown coloring",
      "Sandy bottom dweller"
    ]
  },
  {
    common_name: "Lingcod",
    scientific_name: "Ophiodon elongatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large mouth with sharp teeth",
      "Mottled brown to blue-green",
      "Long body (not a cod)",
      "Blue-green flesh (cooks white)"
    ]
  },
  {
    common_name: "Pacific Cod",
    scientific_name: "Gadus macrocephalus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Three dorsal fins, two anal fins",
      "Barbel on chin",
      "Spotted brown to gray",
      "White lateral line"
    ]
  },
  {
    common_name: "Rockfish (Black)",
    scientific_name: "Sebastes melanops",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Blue-black to gray coloring",
      "Large head and mouth",
      "Spiny dorsal fin",
      "Lives near rocky bottom"
    ]
  },
  {
    common_name: "Rockfish (Yelloweye)",
    scientific_name: "Sebastes ruberrimus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Bright yellow eyes",
      "Orange-red coloring",
      "Prominent lower jaw",
      "Long-lived (100+ years)"
    ]
  },
  {
    common_name: "Rockfish (Canary)",
    scientific_name: "Sebastes pinniger",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Orange body with gray lateral line",
      "Three orange stripes on head",
      "Spiny dorsal fin",
      "Deep water species"
    ]
  },
  {
    common_name: "Rockfish (Vermilion)",
    scientific_name: "Sebastes miniatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Vermilion to orange-red color",
      "Gray mottling on back",
      "Red fins with black edges",
      "Lives on rocky reefs"
    ]
  },
  {
    common_name: "Cabezon",
    scientific_name: "Scorpaenichthys marmoratus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large head (name means 'big head')",
      "Scaleless body",
      "Mottled coloring",
      "Flap on snout tip"
    ]
  },
  {
    common_name: "Kelp Bass",
    scientific_name: "Paralabrax clathratus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Brown to olive with mottling",
      "Third, fourth, fifth dorsal spines longest",
      "Lives in kelp forests",
      "White patches on sides"
    ]
  },
  {
    common_name: "White Seabass",
    scientific_name: "Atractoscion nobilis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Gray to blue-gray coloring",
      "Raised ridge along belly",
      "Large size (up to 90 lbs)",
      "Not actually a bass (croaker family)"
    ]
  },
  {
    common_name: "California Corbina",
    scientific_name: "Menticirrhus undulatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Single barbel on chin",
      "Wavy lines on sides",
      "Metallic blue-gray back",
      "Surf zone species"
    ]
  },
  {
    common_name: "California Sheephead",
    scientific_name: "Semicossyphus pulcher",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Males have black head/tail, red middle",
      "Females are reddish-pink",
      "Large protruding teeth",
      "Sequential hermaphrodite"
    ]
  },
  {
    common_name: "Yellowtail",
    scientific_name: "Seriola lalandi",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Yellow stripe from eye to tail",
      "Yellow tail fins",
      "Blue-green back",
      "Forked tail"
    ]
  },
  {
    common_name: "Pacific Barracuda",
    scientific_name: "Sphyraena argentea",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long slender body",
      "Large mouth with sharp teeth",
      "Blue-gray back",
      "No dark bars on body"
    ]
  },
  {
    common_name: "Yellowfin Croaker",
    scientific_name: "Umbrina roncador",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Yellow pectoral and pelvic fins",
      "Short barbel on chin",
      "Brassy colored body",
      "Wavy lines on sides"
    ]
  },
  {
    common_name: "Spotfin Croaker",
    scientific_name: "Roncador stearnsii",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Black spot at pectoral fin base",
      "No chin barbel",
      "Silver-gray coloring",
      "Surf zone species"
    ]
  },
  {
    common_name: "White Croaker",
    scientific_name: "Genyonemus lineatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Wavy lines on back",
      "Small barbel on chin",
      "Silvery coloring",
      "Makes croaking sound"
    ]
  },
  {
    common_name: "Sablefish",
    scientific_name: "Anoplopoma fimbria",
    water_type: "saltwater",
    flavor_profile: "rich_buttery",
    identifying_features: [
      "Black to gray-green coloring",
      "Two widely separated dorsal fins",
      "Large mouth",
      "Also called black cod"
    ]
  },
  {
    common_name: "Petrale Sole",
    scientific_name: "Eopsetta jordani",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Right-eyed flounder",
      "Uniform brown coloring",
      "Large mouth",
      "Slender oval body"
    ]
  },
  {
    common_name: "English Sole",
    scientific_name: "Parophrys vetulus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Right-eyed flounder",
      "Pointed nose",
      "Small mouth",
      "Brown with darker blotches"
    ]
  },
  {
    common_name: "Starry Flounder",
    scientific_name: "Platichthys stellatus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Star-shaped plates on skin",
      "Black and white bars on fins",
      "Can be right or left-eyed",
      "Orange or white underside"
    ]
  },
  {
    common_name: "Pacific Sanddab",
    scientific_name: "Citharichthys sordidus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Left-eyed flounder",
      "Mottled brown with orange spots",
      "Straight lateral line",
      "Small size (usually under 1 lb)"
    ]
  },
  {
    common_name: "Albacore Tuna",
    scientific_name: "Thunnus alalunga",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Very long pectoral fins",
      "Metallic blue back",
      "White meat",
      "Streamlined body"
    ]
  },
  {
    common_name: "Bluefin Tuna (Pacific)",
    scientific_name: "Thunnus orientalis",
    water_type: "saltwater",
    flavor_profile: "rich_firm",
    identifying_features: [
      "Short pectoral fins",
      "Dark blue-black back",
      "Gray-white belly",
      "Yellow finlets"
    ]
  },
  {
    common_name: "Skipjack Tuna",
    scientific_name: "Katsuwonus pelamis",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "4-6 horizontal dark stripes on belly",
      "No scales except corselet",
      "Dark purple-blue back",
      "Straight lateral line"
    ]
  },
  {
    common_name: "Pacific Bonito",
    scientific_name: "Sarda chiliensis",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "Oblique dark stripes on back",
      "Fully scaled body",
      "Green-blue back",
      "Conical teeth"
    ]
  },
  {
    common_name: "Striped Marlin",
    scientific_name: "Kajikia audax",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "High dorsal fin",
      "Vertical stripes (light up when feeding)",
      "Long bill",
      "Blue back with silver sides"
    ]
  },
  {
    common_name: "California Scorpionfish",
    scientific_name: "Scorpaena guttata",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Venomous spines",
      "Red-brown mottled coloring",
      "Large mouth with fleshy tabs",
      "Bony ridges on head"
    ]
  },
  {
    common_name: "Opah",
    scientific_name: "Lampris guttatus",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Round disc-like body",
      "Red-orange back with white spots",
      "Red fins",
      "Large eyes"
    ]
  },
  {
    common_name: "Pacific Spiny Dogfish",
    scientific_name: "Squalus suckleyi",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Spine before each dorsal fin",
      "No anal fin",
      "Gray with white spots",
      "White belly"
    ]
  },
  {
    common_name: "Leopard Shark",
    scientific_name: "Triakis semifasciata",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Distinctive leopard spot pattern",
      "Gray body with dark saddles",
      "Two dorsal fins similar size",
      "Blunt rounded nose"
    ]
  },
  {
    common_name: "Thresher Shark",
    scientific_name: "Alopias vulpinus",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Extremely long upper tail lobe",
      "Large eyes",
      "Small mouth",
      "Uses tail to stun prey"
    ]
  },
  {
    common_name: "Mako Shark",
    scientific_name: "Isurus oxyrinchus",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Brilliant metallic blue back",
      "Pointed snout",
      "Long slender teeth visible",
      "Fast swimmer (45+ mph)"
    ]
  },

  // ============================================
  // SALTWATER - HAWAII (20+ species)
  // ============================================
  {
    common_name: "Yellowfin Tuna (Ahi)",
    scientific_name: "Thunnus albacares",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Bright yellow dorsal and anal fins",
      "Golden lateral stripe",
      "Metallic blue back",
      "Long finlets"
    ]
  },
  {
    common_name: "Bigeye Tuna (Ahi)",
    scientific_name: "Thunnus obesus",
    water_type: "saltwater",
    flavor_profile: "rich_firm",
    identifying_features: [
      "Very large eyes",
      "Short pectoral fins",
      "Stocky body",
      "Dark metallic blue back"
    ]
  },
  {
    common_name: "Mahi-Mahi",
    scientific_name: "Coryphaena hippurus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Brilliant blue-green and yellow",
      "Square forehead in males",
      "Long dorsal fin",
      "Rapid color change when caught"
    ]
  },
  {
    common_name: "Wahoo (Ono)",
    scientific_name: "Acanthocybium solandri",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Blue vertical bars on sides",
      "Long streamlined body",
      "Sharp razor-like teeth",
      "Very fast swimmer"
    ]
  },
  {
    common_name: "Marlin (Blue)",
    scientific_name: "Makaira nigricans",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Long spear-like bill",
      "Cobalt blue back",
      "Pointed dorsal fin",
      "Huge size potential (1000+ lbs)"
    ]
  },
  {
    common_name: "Marlin (Striped)",
    scientific_name: "Kajikia audax",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Vertical blue stripes",
      "High dorsal fin",
      "Long bill",
      "Stripes visible when excited"
    ]
  },
  {
    common_name: "Swordfish (Shutome)",
    scientific_name: "Xiphias gladius",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Long flat sword-like bill",
      "No pelvic fins",
      "No scales in adults",
      "Large eyes"
    ]
  },
  {
    common_name: "Skipjack Tuna (Aku)",
    scientific_name: "Katsuwonus pelamis",
    water_type: "saltwater",
    flavor_profile: "strong_oily",
    identifying_features: [
      "4-6 dark stripes on belly",
      "No scales except corselet",
      "Dark purple-blue back",
      "Smaller than yellowfin"
    ]
  },
  {
    common_name: "Giant Trevally (Ulua)",
    scientific_name: "Caranx ignobilis",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Steep head profile",
      "Silver to dark gray",
      "Black spot on gill cover",
      "Can exceed 100 pounds"
    ]
  },
  {
    common_name: "Blue Trevally (Omilu)",
    scientific_name: "Caranx melampygus",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Blue-green coloring with blue spots",
      "Black spot on gill cover",
      "Yellow tail",
      "Steep forehead"
    ]
  },
  {
    common_name: "Amberjack (Kahala)",
    scientific_name: "Seriola dumerili",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Amber stripe through eye to tail",
      "Blueish-green back",
      "Forked tail",
      "Streamlined body"
    ]
  },
  {
    common_name: "Barracuda (Kaku)",
    scientific_name: "Sphyraena barracuda",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long slender body",
      "Large mouth with fang teeth",
      "Silver with dark bars",
      "Aggressive appearance"
    ]
  },
  {
    common_name: "Rainbow Runner (Kamanu)",
    scientific_name: "Elagatis bipinnulata",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Blue and yellow horizontal stripes",
      "Streamlined body",
      "Yellow finlets",
      "Fast swimmer"
    ]
  },
  {
    common_name: "Moonfish (Opah)",
    scientific_name: "Lampris guttatus",
    water_type: "saltwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Round disc-shaped body",
      "Red fins",
      "Silver with white spots",
      "Large eyes"
    ]
  },
  {
    common_name: "Pink Snapper (Opakapaka)",
    scientific_name: "Pristipomoides filamentosus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Pink to purple coloring",
      "Yellow horizontal stripe",
      "Deep water species",
      "Delicate white flesh"
    ]
  },
  {
    common_name: "Crimson Snapper (Onaga)",
    scientific_name: "Etelis coruscans",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Bright red coloring",
      "Large eyes",
      "Deep water species",
      "Long tail lobes"
    ]
  },
  {
    common_name: "Gray Snapper (Uku)",
    scientific_name: "Aprion virescens",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Blue-gray to greenish",
      "Large canine teeth",
      "Forked tail",
      "Tapers at both ends"
    ]
  },
  {
    common_name: "Red Snapper (Ehu)",
    scientific_name: "Etelis carbunculus",
    water_type: "saltwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Red coloring",
      "Very large eyes",
      "Deep water species",
      "Slender body"
    ]
  },
  {
    common_name: "Emperor Fish (Mu)",
    scientific_name: "Monotaxis grandoculis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large forehead hump",
      "Large eyes",
      "Gray-blue coloring",
      "Black spot behind head"
    ]
  },
  {
    common_name: "Goatfish (Weke)",
    scientific_name: "Mulloidichthys vanicolensis",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Two chin barbels",
      "Yellow stripe on sides",
      "White to pink body",
      "Sandy bottom feeder"
    ]
  },
  {
    common_name: "Parrotfish (Uhu)",
    scientific_name: "Scarus psittacus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Beak-like fused teeth",
      "Bright colors (blue, green, pink)",
      "Large scales",
      "Scrapes algae from coral"
    ]
  },
  {
    common_name: "Surgeonfish (Kole)",
    scientific_name: "Ctenochaetus strigosus",
    water_type: "saltwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Sharp spine on tail base",
      "Brown with blue spots",
      "Yellow eye ring",
      "Algae grazer"
    ]
  },

  // ============================================
  // FRESHWATER - BASS & SUNFISH (20+ species)
  // ============================================
  {
    common_name: "Largemouth Bass",
    scientific_name: "Micropterus salmoides",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Upper jaw extends past eye",
      "Dark horizontal stripe along body",
      "Notched dorsal fin",
      "Large mouth with no teeth on tongue"
    ]
  },
  {
    common_name: "Smallmouth Bass",
    scientific_name: "Micropterus dolomieu",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Upper jaw does not extend past eye",
      "Vertical bars on sides",
      "Red eyes",
      "Bronze to brown coloring"
    ]
  },
  {
    common_name: "Spotted Bass",
    scientific_name: "Micropterus punctulatus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Horizontal rows of spots below lateral line",
      "Tooth patch on tongue",
      "Dark lateral stripe breaks into blotches",
      "Jaw extends to middle of eye"
    ]
  },
  {
    common_name: "Redeye Bass",
    scientific_name: "Micropterus coosae",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Red eyes",
      "Vertical bars on sides",
      "White margin on tail",
      "Smaller than other black bass"
    ]
  },
  {
    common_name: "Shoal Bass",
    scientific_name: "Micropterus cataractae",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Vertical bars on sides",
      "Dark spot at base of tail",
      "Inhabits flowing water",
      "Endemic to southeast US"
    ]
  },
  {
    common_name: "Suwannee Bass",
    scientific_name: "Micropterus notius",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Bright blue on cheeks and belly",
      "Dark vertical bars",
      "Small range in Florida",
      "Prefers clear flowing water"
    ]
  },
  {
    common_name: "Guadalupe Bass",
    scientific_name: "Micropterus treculii",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Vertical bars on sides",
      "Endemic to Texas",
      "Small size (rarely over 12 inches)",
      "State fish of Texas"
    ]
  },
  {
    common_name: "White Bass",
    scientific_name: "Morone chrysops",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Horizontal dark stripes on silver body",
      "Single tooth patch on tongue",
      "Forked tail",
      "Schooling fish"
    ]
  },
  {
    common_name: "Yellow Bass",
    scientific_name: "Morone mississippiensis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Yellow-gold coloring",
      "Dark horizontal stripes (broken below lateral line)",
      "Two tooth patches on tongue",
      "Smaller than white bass"
    ]
  },
  {
    common_name: "Bluegill",
    scientific_name: "Lepomis macrochirus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Dark blue or black gill flap",
      "Vertical bars on sides",
      "Orange or yellow breast",
      "Small mouth"
    ]
  },
  {
    common_name: "Redear Sunfish",
    scientific_name: "Lepomis microlophus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Red or orange border on black gill flap",
      "Long pointed pectoral fins",
      "Olive to gold coloring",
      "Feeds on snails (shellcracker)"
    ]
  },
  {
    common_name: "Green Sunfish",
    scientific_name: "Lepomis cyanellus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large mouth for a sunfish",
      "Blue-green coloring",
      "Yellow or orange breast",
      "Black gill flap with light border"
    ]
  },
  {
    common_name: "Pumpkinseed",
    scientific_name: "Lepomis gibbosus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Red or orange spot on black gill flap",
      "Wavy blue lines on cheeks",
      "Orange belly",
      "Compressed body"
    ]
  },
  {
    common_name: "Longear Sunfish",
    scientific_name: "Lepomis megalotis",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Very long black gill flap",
      "Orange or red breast",
      "Blue wavy lines on face",
      "Small size"
    ]
  },
  {
    common_name: "Redbreast Sunfish",
    scientific_name: "Lepomis auritus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Long narrow black gill flap",
      "Bright orange-red breast",
      "Yellow-olive back",
      "Prefers moving water"
    ]
  },
  {
    common_name: "Rock Bass",
    scientific_name: "Ambloplites rupestris",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Red eyes",
      "Dark spots forming rows",
      "Large mouth",
      "Brassy brown coloring"
    ]
  },
  {
    common_name: "Warmouth",
    scientific_name: "Lepomis gulosus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large mouth with teeth",
      "Red eyes",
      "Dark mottled pattern",
      "Three or four reddish bars radiating from eye"
    ]
  },
  {
    common_name: "Flier",
    scientific_name: "Centrarchus macropterus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Rounded body",
      "Dark spot below eye",
      "Dark spot on dorsal fin",
      "Prefers vegetated waters"
    ]
  },
  {
    common_name: "White Crappie",
    scientific_name: "Pomoxis annularis",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "5-6 dorsal spines",
      "Vertical bars on sides",
      "Compressed silvery body",
      "Large mouth"
    ]
  },
  {
    common_name: "Black Crappie",
    scientific_name: "Pomoxis nigromaculatus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "7-8 dorsal spines",
      "Irregular black spots or mottling",
      "More compressed than white crappie",
      "Prefers clearer water"
    ]
  },

  // ============================================
  // FRESHWATER - TROUT & SALMON (15+ species)
  // ============================================
  {
    common_name: "Rainbow Trout",
    scientific_name: "Oncorhynchus mykiss",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Pink stripe along lateral line",
      "Black spots on back, fins, and tail",
      "Square tail",
      "Radiating rows of spots on tail"
    ]
  },
  {
    common_name: "Brown Trout",
    scientific_name: "Salmo trutta",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Red and black spots with pale halos",
      "Golden-brown coloring",
      "Few or no spots on tail",
      "Introduced from Europe"
    ]
  },
  {
    common_name: "Brook Trout",
    scientific_name: "Salvelinus fontinalis",
    water_type: "freshwater",
    flavor_profile: "mild_delicate",
    identifying_features: [
      "Worm-like markings (vermiculations) on back",
      "Red spots with blue halos",
      "White leading edge on lower fins",
      "Square or slightly forked tail"
    ]
  },
  {
    common_name: "Lake Trout",
    scientific_name: "Salvelinus namaycush",
    water_type: "freshwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Light spots on dark background",
      "Deeply forked tail",
      "Gray to green coloring",
      "Can reach 50+ pounds"
    ]
  },
  {
    common_name: "Cutthroat Trout",
    scientific_name: "Oncorhynchus clarkii",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Red slash marks under jaw",
      "Black spots concentrated toward tail",
      "Yellow, pink, or red coloring",
      "Multiple subspecies"
    ]
  },
  {
    common_name: "Golden Trout",
    scientific_name: "Oncorhynchus aguabonita",
    water_type: "freshwater",
    flavor_profile: "mild_delicate",
    identifying_features: [
      "Golden-yellow coloring",
      "Red belly and cheeks",
      "Parr marks along sides",
      "High altitude species"
    ]
  },
  {
    common_name: "Dolly Varden",
    scientific_name: "Salvelinus malma",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Pink or red spots on sides",
      "Olive to dark green back",
      "White leading edges on fins",
      "Similar to Arctic char"
    ]
  },
  {
    common_name: "Arctic Char",
    scientific_name: "Salvelinus alpinus",
    water_type: "freshwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Pink to red spots on sides",
      "Bright orange belly (breeding)",
      "Small scales",
      "Highly variable coloring"
    ]
  },
  {
    common_name: "Bull Trout",
    scientific_name: "Salvelinus confluentus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Pink, red, or orange spots",
      "Flat broad head",
      "No spots on dorsal fin",
      "Threatened species"
    ]
  },
  {
    common_name: "Gila Trout",
    scientific_name: "Oncorhynchus gilae",
    water_type: "freshwater",
    flavor_profile: "mild_delicate",
    identifying_features: [
      "Golden-yellow coloring",
      "Small black spots",
      "Endemic to New Mexico and Arizona",
      "Endangered species"
    ]
  },
  {
    common_name: "Apache Trout",
    scientific_name: "Oncorhynchus apache",
    water_type: "freshwater",
    flavor_profile: "mild_delicate",
    identifying_features: [
      "Golden-yellow with dark spots",
      "Dark band across eye",
      "Endemic to Arizona",
      "Threatened species"
    ]
  },
  {
    common_name: "Atlantic Salmon (Landlocked)",
    scientific_name: "Salmo salar",
    water_type: "freshwater",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "Silver with X-shaped spots",
      "Slender caudal peduncle",
      "Forked tail",
      "No spots on tail"
    ]
  },
  {
    common_name: "Kokanee Salmon",
    scientific_name: "Oncorhynchus nerka",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Landlocked sockeye salmon",
      "No spots on back or tail",
      "Silver coloring (red when spawning)",
      "Smaller than sea-run sockeye"
    ]
  },
  {
    common_name: "Tiger Trout",
    scientific_name: "Salmo trutta × Salvelinus fontinalis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Vermiculations forming tiger-like pattern",
      "Sterile hybrid (brown × brook)",
      "Yellow-gold coloring",
      "Aggressive feeder"
    ]
  },
  {
    common_name: "Splake",
    scientific_name: "Salvelinus fontinalis × Salvelinus namaycush",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Hybrid of brook trout and lake trout",
      "Light spots on dark background",
      "Moderately forked tail",
      "Faster growing than brook trout"
    ]
  },

  // ============================================
  // FRESHWATER - PIKE, MUSKIE, PICKEREL (5+ species)
  // ============================================
  {
    common_name: "Northern Pike",
    scientific_name: "Esox lucius",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Light oval spots on dark green background",
      "Duck-bill shaped snout",
      "Five or fewer sensory pores per side under jaw",
      "Sharp teeth"
    ]
  },
  {
    common_name: "Muskellunge",
    scientific_name: "Esox masquinongy",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Dark bars or spots on light background",
      "Six or more sensory pores per side under jaw",
      "Pointed tail lobes",
      "Can reach 50+ pounds"
    ]
  },
  {
    common_name: "Chain Pickerel",
    scientific_name: "Esox niger",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Chain-like pattern on sides",
      "Dark vertical bar under eye",
      "Fully scaled cheeks and gill covers",
      "Smaller than pike or muskie"
    ]
  },
  {
    common_name: "Redfin Pickerel",
    scientific_name: "Esox americanus americanus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Red fins",
      "Dark vertical bar under eye",
      "Wavy dark bars on sides",
      "Small size (under 12 inches)"
    ]
  },
  {
    common_name: "Grass Pickerel",
    scientific_name: "Esox americanus vermiculatus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Dark bar under eye",
      "Wavy vertical bars on sides",
      "Short snout",
      "Prefers vegetated waters"
    ]
  },
  {
    common_name: "Tiger Muskie",
    scientific_name: "Esox lucius × Esox masquinongy",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Vertical tiger-stripe pattern",
      "Sterile hybrid (pike × muskie)",
      "Aggressive feeder",
      "Fast growing"
    ]
  },

  // ============================================
  // FRESHWATER - CATFISH (10+ species)
  // ============================================
  {
    common_name: "Channel Catfish",
    scientific_name: "Ictalurus punctatus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Deeply forked tail",
      "Scattered dark spots (young fish)",
      "Upper jaw longer than lower",
      "Blue-gray coloring"
    ]
  },
  {
    common_name: "Blue Catfish",
    scientific_name: "Ictalurus furcatus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Deeply forked tail",
      "No spots",
      "Anal fin has 30-35 rays (straight edge)",
      "Slate blue to white coloring"
    ]
  },
  {
    common_name: "Flathead Catfish",
    scientific_name: "Pylodictis olivaris",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Flat broad head",
      "Square or slightly notched tail",
      "Lower jaw projects beyond upper",
      "Mottled brown to yellow coloring"
    ]
  },
  {
    common_name: "White Catfish",
    scientific_name: "Ameiurus catus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Moderately forked tail",
      "Gray to blue-black back",
      "Chin barbels are white or pale",
      "19-23 anal fin rays"
    ]
  },
  {
    common_name: "Black Bullhead",
    scientific_name: "Ameiurus melas",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Square or slightly notched tail",
      "Black chin barbels",
      "Pale bar at base of tail",
      "Yellow-green to black coloring"
    ]
  },
  {
    common_name: "Yellow Bullhead",
    scientific_name: "Ameiurus natalis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Rounded or square tail",
      "White or yellow chin barbels",
      "Yellow to brown coloring",
      "24-27 anal fin rays"
    ]
  },
  {
    common_name: "Brown Bullhead",
    scientific_name: "Ameiurus nebulosus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Square or slightly notched tail",
      "Dark chin barbels",
      "Mottled brown coloring",
      "21-24 anal fin rays"
    ]
  },
  {
    common_name: "Snail Bullhead",
    scientific_name: "Ameiurus brunneus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Square tail",
      "Small eyes",
      "Dark coloring",
      "Limited range in southeast"
    ]
  },
  {
    common_name: "Stonecat",
    scientific_name: "Noturus flavus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Adipose fin connected to tail",
      "Venomous pectoral spines",
      "Yellow-brown coloring",
      "Small size (under 12 inches)"
    ]
  },
  {
    common_name: "Madtom (Tadpole)",
    scientific_name: "Noturus gyrinus",
    water_type: "freshwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Adipose fin connected to tail",
      "Dark blotch at base of tail",
      "Very small (under 5 inches)",
      "Venomous spines"
    ]
  },

  // ============================================
  // FRESHWATER - WALLEYE, PERCH, SAUGER (5+ species)
  // ============================================
  {
    common_name: "Walleye",
    scientific_name: "Sander vitreus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large glassy eyes",
      "White tip on lower tail lobe",
      "Olive to gold coloring",
      "Two dorsal fins (first spiny)"
    ]
  },
  {
    common_name: "Sauger",
    scientific_name: "Sander canadensis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Saddle-like blotches on back",
      "No white tip on tail",
      "Rough cheek scales",
      "Spotted dorsal fin"
    ]
  },
  {
    common_name: "Saugeye",
    scientific_name: "Sander vitreus × Sander canadensis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Hybrid (walleye × sauger)",
      "Mottled saddle pattern",
      "White tip on tail (sometimes faint)",
      "Intermediate characteristics"
    ]
  },
  {
    common_name: "Yellow Perch",
    scientific_name: "Perca flavescens",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "6-8 dark vertical bars",
      "Yellow to brass coloring",
      "Orange pelvic and anal fins",
      "Two dorsal fins"
    ]
  },
  {
    common_name: "White Perch",
    scientific_name: "Morone americana",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Silver-gray to dark green back",
      "No horizontal stripes",
      "Deep compressed body",
      "Three spines in anal fin"
    ]
  },

  // ============================================
  // FRESHWATER - PANFISH (10+ species)
  // ============================================
  {
    common_name: "Sacramento Perch",
    scientific_name: "Archoplites interruptus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Only native California sunfish",
      "Vertical bars on sides",
      "Large dorsal fin",
      "Gray to brown coloring"
    ]
  },
  {
    common_name: "Banded Sunfish",
    scientific_name: "Enneacanthus obesus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "5-7 dark vertical bars",
      "Deep compressed body",
      "Small mouth",
      "Dark spot on gill flap"
    ]
  },
  {
    common_name: "Blackbanded Sunfish",
    scientific_name: "Enneacanthus chaetodon",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "6-7 dark vertical bars",
      "Very compressed body",
      "Small size",
      "Prefers acidic waters"
    ]
  },
  {
    common_name: "Bluespotted Sunfish",
    scientific_name: "Enneacanthus gloriosus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Blue spots on sides",
      "Vertical bars (may be faint)",
      "Small size",
      "Limited range in eastern US"
    ]
  },
  {
    common_name: "Mud Sunfish",
    scientific_name: "Acantharchus pomotis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "5-6 dark horizontal stripes",
      "Rounded tail",
      "Small size",
      "Prefers muddy vegetated waters"
    ]
  },
  {
    common_name: "Dollar Sunfish",
    scientific_name: "Lepomis marginatus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Round body shape",
      "Red border on gill flap",
      "Olive coloring with dark spots",
      "Small mouth"
    ]
  },
  {
    common_name: "Spotted Sunfish",
    scientific_name: "Lepomis punctatus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Rows of small black spots",
      "Red eye",
      "Small black gill flap",
      "Prefers vegetated waters"
    ]
  },
  {
    common_name: "Orangespotted Sunfish",
    scientific_name: "Lepomis humilis",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Orange-red spots on sides",
      "Blue-green back",
      "Orange belly",
      "Small size"
    ]
  },
  {
    common_name: "Bantam Sunfish",
    scientific_name: "Lepomis symmetricus",
    water_type: "freshwater",
    flavor_profile: "mild_sweet",
    identifying_features: [
      "Small size (3-4 inches)",
      "Olive coloring with dusky bars",
      "Red eye",
      "Limited range in Mississippi drainage"
    ]
  },
  {
    common_name: "Roanoke Bass",
    scientific_name: "Ambloplites cavifrons",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Similar to rock bass",
      "Red eyes",
      "White margin on anal fin",
      "Endemic to Virginia and North Carolina"
    ]
  },

  // ============================================
  // FRESHWATER - OTHER (20+ species)
  // ============================================
  {
    common_name: "Carp (Common)",
    scientific_name: "Cyprinus carpio",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Two barbels on each side of mouth",
      "Large scales",
      "Long dorsal fin with spine",
      "Can reach 50+ pounds"
    ]
  },
  {
    common_name: "Grass Carp",
    scientific_name: "Ctenopharyngodon idella",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Elongated body",
      "No barbels",
      "Large scales with dark edges",
      "Herbivorous"
    ]
  },
  {
    common_name: "Bighead Carp",
    scientific_name: "Hypophthalmichthys nobilis",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Very large head",
      "No barbels",
      "Eyes below mouth line",
      "Dark blotches on sides"
    ]
  },
  {
    common_name: "Silver Carp",
    scientific_name: "Hypophthalmichthys molitrix",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Silver coloring",
      "Upturned mouth",
      "Eyes below mouth line",
      "Jumps when disturbed by boat motors"
    ]
  },
  {
    common_name: "Bowfin",
    scientific_name: "Amia calva",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long dorsal fin",
      "Black spot on tail base (males have orange halo)",
      "Can breathe air",
      "Primitive species"
    ]
  },
  {
    common_name: "Longnose Gar",
    scientific_name: "Lepisosteus osseus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Very long narrow snout",
      "Ganoid scales (hard diamond-shaped)",
      "Olive-brown with spots",
      "Needle-like teeth"
    ]
  },
  {
    common_name: "Shortnose Gar",
    scientific_name: "Lepisosteus platostomus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Short broad snout",
      "Ganoid scales",
      "Olive-brown coloring",
      "Smaller than longnose gar"
    ]
  },
  {
    common_name: "Spotted Gar",
    scientific_name: "Lepisosteus oculatus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Round spots on body and fins",
      "Short broad snout",
      "Ganoid scales",
      "Prefers clear waters"
    ]
  },
  {
    common_name: "Alligator Gar",
    scientific_name: "Atractosteus spatula",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Massive size (up to 300 pounds)",
      "Broad alligator-like snout",
      "Two rows of teeth in upper jaw",
      "Largest gar species"
    ]
  },
  {
    common_name: "Paddlefish",
    scientific_name: "Polyodon spathula",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long paddle-like snout (rostrum)",
      "Shark-like body",
      "Smooth skin (no scales)",
      "Filter feeder"
    ]
  },
  {
    common_name: "Lake Sturgeon",
    scientific_name: "Acipenser fulvescens",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Five rows of bony plates",
      "Four barbels under snout",
      "Shark-like tail",
      "Can live 100+ years"
    ]
  },
  {
    common_name: "Shovelnose Sturgeon",
    scientific_name: "Scaphirhynchus platorynchus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Flat shovel-shaped snout",
      "Long caudal filament",
      "Bony plates on body",
      "River species"
    ]
  },
  {
    common_name: "Burbot",
    scientific_name: "Lota lota",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Single barbel on chin",
      "Long second dorsal and anal fins",
      "Mottled brown pattern",
      "Only freshwater cod"
    ]
  },
  {
    common_name: "Freshwater Drum",
    scientific_name: "Aplodinotus grunniens",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Arched back",
      "Lateral line extends to tail",
      "Makes drumming/croaking sound",
      "Silver-gray coloring"
    ]
  },
  {
    common_name: "Mooneye",
    scientific_name: "Hiodon tergisus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large silvery eye",
      "Compressed silver body",
      "Dorsal fin origin behind anal fin origin",
      "Forked tail"
    ]
  },
  {
    common_name: "Goldeye",
    scientific_name: "Hiodon alosoides",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large golden eye",
      "Silver body",
      "Dorsal fin origin in front of anal fin origin",
      "Deeper body than mooneye"
    ]
  },
  {
    common_name: "American Shad",
    scientific_name: "Alosa sapidissima",
    water_type: "anadromous",
    flavor_profile: "moderate_oily",
    identifying_features: [
      "Row of dark spots behind gill cover",
      "Deeply forked tail",
      "Compressed silver body",
      "Bony but flavorful"
    ]
  },
  {
    common_name: "Hickory Shad",
    scientific_name: "Alosa mediocris",
    water_type: "anadromous",
    flavor_profile: "moderate_oily",
    identifying_features: [
      "Single dark shoulder spot",
      "Lower jaw projects beyond upper",
      "Gray-green back",
      "Smaller than American shad"
    ]
  },
  {
    common_name: "Alewife",
    scientific_name: "Alosa pseudoharengus",
    water_type: "anadromous",
    flavor_profile: "strong_oily",
    identifying_features: [
      "Single dark shoulder spot",
      "Large eye",
      "Deeply notched upper jaw",
      "Landlocked populations exist"
    ]
  },
  {
    common_name: "Gizzard Shad",
    scientific_name: "Dorosoma cepedianum",
    water_type: "freshwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Dark shoulder spot",
      "Blunt rounded snout",
      "Long trailing ray on dorsal fin",
      "Used mainly as bait"
    ]
  },
  {
    common_name: "Threadfin Shad",
    scientific_name: "Dorosoma petenense",
    water_type: "freshwater",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Yellow fins",
      "Long trailing dorsal ray",
      "Small size",
      "Popular forage fish"
    ]
  },
  {
    common_name: "Buffalo (Bigmouth)",
    scientific_name: "Ictiobus cyprinellus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Large oblique terminal mouth",
      "Deep compressed body",
      "Gray to bronze coloring",
      "No barbels"
    ]
  },
  {
    common_name: "Buffalo (Smallmouth)",
    scientific_name: "Ictiobus bubalus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Small horizontal mouth",
      "Arched back",
      "Bronze coloring",
      "More streamlined than bigmouth"
    ]
  },
  {
    common_name: "Quillback",
    scientific_name: "Carpiodes cyprinus",
    water_type: "freshwater",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Long quill-like first dorsal ray",
      "Small inferior mouth",
      "Silver coloring",
      "Compressed body"
    ]
  },

  // ============================================
  // ANADROMOUS (10+ species)
  // ============================================
  {
    common_name: "Atlantic Salmon",
    scientific_name: "Salmo salar",
    water_type: "anadromous",
    flavor_profile: "moderate_firm",
    identifying_features: [
      "X-shaped spots on body",
      "No spots on tail",
      "Slender wrist at tail",
      "Can survive spawning (unlike Pacific salmon)"
    ]
  },
  {
    common_name: "Sea Lamprey",
    scientific_name: "Petromyzon marinus",
    water_type: "anadromous",
    flavor_profile: "not_typically_eaten",
    identifying_features: [
      "Eel-like body with no jaws",
      "Sucker disc mouth with teeth",
      "Seven gill openings",
      "Parasitic on fish"
    ]
  },
  {
    common_name: "Atlantic Sturgeon",
    scientific_name: "Acipenser oxyrinchus",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Five rows of bony plates",
      "Four barbels under pointed snout",
      "Can reach 800+ pounds",
      "Protected in most areas"
    ]
  },
  {
    common_name: "Shortnose Sturgeon",
    scientific_name: "Acipenser brevirostrum",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Short blunt snout",
      "Bony plates on body",
      "Smaller than Atlantic sturgeon",
      "Endangered species"
    ]
  },
  {
    common_name: "Gulf Sturgeon",
    scientific_name: "Acipenser oxyrinchus desotoi",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Bony plates on body",
      "Four barbels under snout",
      "Gulf of Mexico drainage",
      "Threatened species"
    ]
  },
  {
    common_name: "White Sturgeon",
    scientific_name: "Acipenser transmontanus",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Largest North American fish (1500+ lbs possible)",
      "Five rows of bony plates",
      "Gray to pale olive coloring",
      "Pacific coast species"
    ]
  },
  {
    common_name: "Green Sturgeon",
    scientific_name: "Acipenser medirostris",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Greenish coloring",
      "Bony plates with sharp points",
      "Narrow head",
      "Threatened species"
    ]
  },
  {
    common_name: "Striped Mullet",
    scientific_name: "Mugil cephalus",
    water_type: "anadromous",
    flavor_profile: "moderate_oily",
    identifying_features: [
      "Horizontal dark stripes on sides",
      "Blunt rounded snout",
      "Small triangular mouth",
      "Jumps frequently"
    ]
  },
  {
    common_name: "Sea-Run Brook Trout (Salter)",
    scientific_name: "Salvelinus fontinalis",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Vermiculations on back",
      "Red spots with blue halos",
      "White leading edge on fins",
      "Silver coloring when in salt water"
    ]
  },
  {
    common_name: "Sea-Run Cutthroat Trout",
    scientific_name: "Oncorhynchus clarkii clarkii",
    water_type: "anadromous",
    flavor_profile: "mild_firm",
    identifying_features: [
      "Red slash marks under jaw",
      "Silver coloring in ocean",
      "Black spots concentrated toward tail",
      "Pacific coast species"
    ]
  }
];

// Export for use in database or application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = usFishSpecies;
}
