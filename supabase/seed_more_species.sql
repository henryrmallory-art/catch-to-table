-- Add comprehensive list of common recreational fish species
-- Organized by region and water type

-- SALTWATER - ATLANTIC COAST
INSERT INTO species (common_name, scientific_name, flavor_profile, identifying_features) VALUES
('Red Snapper', 'Lutjanus campechanus', 'mild_sweet', ARRAY['bright red coloration', 'pointed snout', 'red eyes', 'forked tail']),
('Grouper (Red)', 'Epinephelus morio', 'mild_firm', ARRAY['large mouth', 'mottled brown-red coloring', 'robust body', 'spiny dorsal fin']),
('Grouper (Gag)', 'Mycteroperca microlepis', 'mild_firm', ARRAY['grayish with wavy markings', 'large mouth', 'squared tail', 'thick body']),
('Grouper (Black)', 'Mycteroperca bonaci', 'mild_firm', ARRAY['olive to dark gray', 'rectangular dark blotches', 'large head', 'squared tail']),
('Flounder (Southern)', 'Paralichthys lethostigma', 'mild_delicate', ARRAY['flat body', 'both eyes on left side', 'brown with spots', 'wide mouth']),
('Flounder (Winter)', 'Pseudopleuronectes americanus', 'mild_delicate', ARRAY['small mouth', 'straight lateral line', 'reddish-brown color', 'rounded tail']),
('Redfish (Red Drum)', 'Sciaenops ocellatus', 'mild_sweet', 'ARRAY['copper-bronze color', 'black spot on tail', 'powerful tail', 'no chin barbel']),
('Speckled Trout', 'Cynoscion nebulosus', 'mild_delicate', ARRAY['dark spots on back', 'protruding lower jaw', 'soft dorsal fin', 'silvery sides']),
('King Mackerel', 'Scomberomorus cavalla', 'strong_oily', ARRAY['torpedo shape', 'lateral line drops sharply', 'no black pigment', 'razor-sharp teeth']),
('Spanish Mackerel', 'Scomberomorus maculatus', 'moderate_oily', ARRAY['yellow spots on sides', 'no scales on pectoral fins', 'first dorsal fin black', 'forked tail']),
('Cobia', 'Rachycentron canadum', 'mild_firm', ARRAY['dark brown stripe', 'flat head', 'no dorsal spines', 'white belly']),
('Tarpon', 'Megalops atlanticus', 'not_recommended', ARRAY['large silver scales', 'upturned mouth', 'last dorsal ray elongated', 'massive size']),
('Snook', 'Centropomus undecimalis', 'mild_firm', ARRAY['prominent black lateral line', 'sloping forehead', 'protruding lower jaw', 'yellow fins']),
('Permit', 'Trachinotus falcatus', 'mild_firm', ARRAY['deep forked tail', 'silver body', 'dark dorsal fins', 'deep body']),
('Pompano', 'Trachinotus carolinus', 'mild_buttery', ARRAY['deep body', 'yellow on belly', 'forked tail', 'small mouth']),
('Triggerfish (Gray)', 'Balistes capriscus', 'sweet_firm', ARRAY['gray-blue coloration', 'white spots', 'trigger spine', 'fan-like tail']),
('Sheepshead', 'Archosargus probatocephalus', 'mild_sweet', ARRAY['vertical black stripes', 'deep body', 'human-like teeth', 'stubby nose']),
('Black Drum', 'Pogonias cromis', 'mild_firm', ARRAY['barbels on chin', 'high arched back', 'gray-bronze color', 'no tail spot']),
('Croaker (Atlantic)', 'Micropogonias undulatus', 'mild_sweet', ARRAY['brassy color', 'short barbels', 'diagonal stripes', 'croaking sound']),
('Spot', 'Leiostomus xanthurus', 'mild_sweet', ARRAY['distinct shoulder spot', 'yellow fins', 'short high body', 'small mouth']),

-- SALTWATER - GULF OF MEXICO
('Amberjack (Greater)', 'Seriola dumerili', 'mild_firm', ARRAY['amber stripe from eye', 'powerful tail', 'olive-brown back', 'large size']),
('Lane Snapper', 'Lutjanus synagris', 'mild_sweet', ARRAY['pink body', 'yellow stripes', 'red fins', 'black spot']),
('Mangrove Snapper', 'Lutjanus griseus', 'mild_sweet', ARRAY['gray-green color', 'orange-red fins', 'two fang-like teeth', 'no shoulder spot']),
('Vermilion Snapper', 'Rhomboplites aurorubens', 'mild_sweet', ARRAY['vermilion red color', 'short snout', 'yellow streaks', 'deeply forked tail']),
('Hogfish', 'Lachnolaimus maximus', 'mild_sweet', ARRAY['long snout', 'first dorsal spines elongated', 'mottled red-orange', 'fleshy lips']),
('Lionfish', 'Pterois volitans', 'mild_delicate', ARRAY['venomous spines', 'red and white stripes', 'fan-like pectoral fins', 'WARNING: invasive']),

-- SALTWATER - PACIFIC COAST
('Yellowtail', 'Seriola lalandi', 'moderate_firm', ARRAY['yellow tail and fins', 'blue-green back', 'yellow stripe', 'streamlined body']),
('Halibut (California)', 'Paralichthys californicus', 'mild_delicate', ARRAY['flat body', 'large mouth', 'eyes on left side', 'mottled brown']),
('Lingcod', 'Ophiodon elongatus', 'mild_firm', ARRAY['large mouth with teeth', 'mottled coloration', 'long body', 'blue-green meat when raw']),
('Rockfish (Vermilion)', 'Sebastes miniatus', 'mild_firm', ARRAY['bright red-orange', 'spiny head', 'large eyes', 'mottled sides']),
('Rockfish (Copper)', 'Sebastes caurinus', 'mild_firm', ARRAY['copper-pink color', 'white stripe', 'yellow eye', 'spiny dorsal']),
('Yellowfin Tuna', 'Thunnus albacares', 'moderate_firm', ARRAY['bright yellow fins', 'torpedo shape', 'blue-black back', 'silver belly']),
('Albacore Tuna', 'Thunnus alalunga', 'mild_firm', ARRAY['very long pectoral fins', 'dark blue back', 'white belly', 'streamlined']),
('Barracuda', 'Sphyraena argentea', 'moderate_firm', ARRAY['long slender body', 'large sharp teeth', 'silver color', 'pointed head']),
('White Seabass', 'Atractoscion nobilis', 'mild_delicate', ARRAY['silvery gray', 'black spots on back', 'raised ridge on belly', 'blunt head']),
('California Corbina', 'Menticirrhus undulatus', 'mild_sweet', ARRAY['metallic blue coloring', 'small chin barbel', 'wavy diagonal lines', 'pointed snout']),

-- FRESHWATER - BASS
('Largemouth Bass', 'Micropterus salmoides', 'mild_firm', ARRAY['dark horizontal band', 'upper jaw extends past eye', 'green coloration', 'large mouth']),
('Smallmouth Bass', 'Micropterus dolomieu', 'mild_firm', ARRAY['bronze coloration', 'vertical bars', 'red eyes', 'jaw doesnt extend past eye']),
('Spotted Bass', 'Micropterus punctulatus', 'mild_firm', ARRAY['horizontal rows of spots', 'tooth patch on tongue', 'smaller than largemouth', 'shallow notch in dorsal']),
('White Bass', 'Morone chrysops', 'mild_firm', ARRAY['silver with dark stripes', 'deep body', 'one tooth patch', 'white belly']),
('Striped Bass (Hybrid)', 'Morone saxatilis x chrysops', 'mild_firm', ARRAY['broken stripes', 'robust body', 'silvery', 'powerful fighter']),

-- FRESHWATER - SUNFISH
('Bluegill', 'Lepomis macrochirus', 'mild_sweet', ARRAY['dark ear flap', 'blue-purple sheen', 'deep body', 'small mouth']),
('Redear Sunfish', 'Lepomis microlophus', 'mild_sweet', ARRAY['red edge on ear flap', 'olive back', 'pointed pectoral fins', 'yellow belly']),
('Green Sunfish', 'Lepomis cyanellus', 'mild_sweet', ARRAY['blue-green color', 'large mouth', 'dark ear flap', 'yellow belly']),
('Pumpkinseed', 'Lepomis gibbosus', 'mild_sweet', ARRAY['orange spot on ear flap', 'wavy blue lines on face', 'orange belly', 'deep body']),
('Rock Bass', 'Ambloplites rupestris', 'mild_sweet', ARRAY['red eyes', 'rows of dark spots', 'large mouth', 'brassy color']),

-- FRESHWATER - PANFISH / CRAPPIE
('Black Crappie', 'Pomoxis nigromaculatus', 'mild_delicate', ARRAY['irregular black blotches', '7-8 dorsal spines', 'upturned mouth', 'silver-green']),
('White Crappie', 'Pomoxis annularis', 'mild_delicate', ARRAY['vertical bars', '5-6 dorsal spines', 'more elongated', 'silvery']),
('Yellow Perch', 'Perca flavescens', 'mild_sweet', ARRAY['bright yellow color', 'vertical dark bars', 'orange fins', 'spiny dorsal fin']),

-- FRESHWATER - PIKE / MUSKIE
('Northern Pike', 'Esox lucius', 'mild_firm', ARRAY['long snout', 'duckbill shape', 'green with light spots', 'sharp teeth']),
('Muskellunge', 'Esox masquinongy', 'mild_firm', ARRAY['dark bars or spots', 'pointed fins', 'large size', 'clear lower lobe of tail']),
('Chain Pickerel', 'Esox niger', 'mild_firm', ARRAY['chain-like markings', 'fully scaled cheeks', 'duckbill snout', 'green-gold color']),

-- FRESHWATER - WALLEYE / SAUGER
('Walleye', 'Sander vitreus', 'mild_firm', ARRAY['white tip on lower tail', 'large glassy eyes', 'spiny dorsal fin', 'olive-gold color']),
('Sauger', 'Sander canadensis', 'mild_firm', ARRAY['no white tail tip', 'blotchy sides', 'large eyes', 'rows of dark spots on dorsal']),

-- FRESHWATER - CATFISH
('Channel Catfish', 'Ictalurus punctatus', 'mild_firm', ARRAY['deeply forked tail', 'scattered black spots', 'barbels', 'no scales']),
('Blue Catfish', 'Ictalurus furcatus', 'mild_firm', ARRAY['blue-gray color', 'straight rear edge on anal fin', 'no spots', 'large size']),
('Flathead Catfish', 'Pylodictis olivaris', 'mild_firm', ARRAY['flat head', 'protruding lower jaw', 'squared tail', 'mottled yellow-brown']),
('White Catfish', 'Ameiurus catus', 'mild_firm', ARRAY['moderately forked tail', 'white chin barbels', 'blue-gray back', 'small eyes']),
('Bullhead (Black)', 'Ameiurus melas', 'mild_firm', ARRAY['squared or rounded tail', 'dark barbels', 'chunky body', 'small size']),
('Bullhead (Brown)', 'Ameiurus nebulosus', 'mild_firm', ARRAY['squared tail', 'dark chin barbels', 'mottled sides', 'stocky body']),
('Bullhead (Yellow)', 'Ameiurus natalis', 'mild_firm', ARRAY['rounded tail', 'white chin barbels', 'yellow belly', 'small size']),

-- FRESHWATER - TROUT
('Rainbow Trout', 'Oncorhynchus mykiss', 'mild_delicate', ARRAY['pink stripe on side', 'black spots on tail', 'adipose fin', 'streamlined']),
('Brown Trout', 'Salmo trutta', 'moderate_delicate', ARRAY['red and black spots with halos', 'square tail', 'golden-brown color', 'few spots on tail']),
('Brook Trout', 'Salvelinus fontinalis', 'mild_delicate', ARRAY['wormlike markings on back', 'white-edged fins', 'red spots', 'square tail']),
('Lake Trout', 'Salvelinus namaycush', 'moderate_oily', ARRAY['deeply forked tail', 'light spots on dark background', 'large size', 'wormlike markings']),
('Cutthroat Trout', 'Oncorhynchus clarkii', 'mild_delicate', ARRAY['red slash under jaw', 'spots on tail', 'adipose fin', 'various subspecies']),
('Golden Trout', 'Oncorhynchus aguabonita', 'mild_delicate', ARRAY['brilliant golden color', 'red belly', 'parr marks', 'high-altitude']),

-- FRESHWATER - SALMON
('Chinook Salmon', 'Oncorhynchus tshawytscha', 'moderate_oily', ARRAY['black mouth and gums', 'spots on both lobes of tail', 'large size', 'silver in ocean']),
('Coho Salmon', 'Oncorhynchus kisutch', 'moderate_oily', ARRAY['white gums', 'spots on upper lobe of tail only', 'hooked jaw', 'bright silver']),
('Sockeye Salmon', 'Oncorhynchus nerka', 'rich_oily', ARRAY['no spots on tail', 'fine scales', 'red flesh', 'turns red at spawning']),
('Pink Salmon', 'Oncorhynchus gorbuscha', 'mild_oily', ARRAY['large oval spots on tail', 'small scales', 'hump on males', 'smallest Pacific salmon']),
('Chum Salmon', 'Oncorhynchus keta', 'mild_oily', ARRAY['vertical bars at spawning', 'no spots', 'large teeth', 'white-tipped fins']),
('Atlantic Salmon', 'Salmo salar', 'moderate_oily', ARRAY['X-shaped spots above lateral line', 'adipose fin', 'forked tail', 'silver color']),

-- FRESHWATER - OTHER POPULAR SPECIES
('Carp (Common)', 'Cyprinus carpio', 'moderate_strong', ARRAY['barbels on upper lip', 'large scales', 'long dorsal fin', 'forked tail']),
('White Sturgeon', 'Acipenser transmontanus', 'mild_firm', ARRAY['armored plates', 'barbels', 'shark-like tail', 'cartilaginous skeleton']),
('Paddlefish', 'Polyodon spathula', 'mild_firm', ARRAY['long paddle-shaped snout', 'large gaping mouth', 'smooth skin', 'shark-like tail']),
('Gar (Longnose)', 'Lepisosteus osseus', 'mild_firm', ARRAY['long narrow snout', 'armor-like scales', 'sharp teeth', 'cylindrical body']),
('Bowfin', 'Amia calva', 'moderate_firm', ARRAY['long dorsal fin', 'rounded tail', 'bony head', 'spot on tail base']),
('Burbot', 'Lota lota', 'mild_firm', ARRAY['single barbel on chin', 'mottled pattern', 'long anal fin', 'only freshwater cod']),

-- ANADROMOUS SPECIES
('American Shad', 'Alosa sapidissima', 'mild_oily', ARRAY['row of dark spots', 'saw-toothed belly', 'large scales', 'herring family']),
('Hickory Shad', 'Alosa mediocris', 'moderate_oily', ARRAY['projecting lower jaw', 'single dark spot', 'smaller than American', 'greenish back'])

ON CONFLICT (common_name, scientific_name) DO NOTHING;

-- Update existing species with better identifying features where missing
UPDATE species SET identifying_features = ARRAY['bright red coloration', 'long pointed snout', 'red eyes', 'triangular head', 'sharp teeth']
WHERE common_name = 'Red Snapper' AND identifying_features IS NULL;
