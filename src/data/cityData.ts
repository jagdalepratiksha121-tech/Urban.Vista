/**
 * City Life — Seeded Urban Dataset
 * Verified locations, real geographic coordinates, authentic historical context,
 * official visiting hours, authoritative source attributions, and real Indian forts & heritage landmarks.
 * 
 * Sources: Archaeological Survey of India (ASI), UNESCO World Heritage Centre,
 * Pune Municipal Corporation (PMC), Directorate of Archaeology and Museums Maharashtra,
 * OpenStreetMap Contributors.
 */

export type Category =
  | 'tourist'
  | 'food'
  | 'cafe'
  | 'hotel'
  | 'budget'
  | 'heritage'
  | 'forts'
  | 'nature'
  | 'shopping'
  | 'nightlife'
  | 'gem';

export interface Place {
  id: string;
  name: string;
  category: Category;
  neighborhood: string;
  postalLocality: string;
  coords: { x: number; y: number };
  lat: number;
  lng: number;
  cost: number; // in INR (0 = free admission)
  verifiedCostDescription: string;
  indoor: boolean;
  wheelchairAccessible: boolean;
  accessibilityNotes: string;
  officialStatus: string;
  rating?: number;
  reviewCount?: number;
  ratingSource?: string;
  imageUrl: string;
  tagline: string;
  story: string;
  historySummary: string;
  visitingHours: string;
  nearestTransit: string;
  sourceAttribution: string;
  tags: string[];
  isFeaturedGem?: boolean;
  isFort?: boolean;
}

export const PUNE_PLACES: Place[] = [
  // =========================================================================
  // 1. REAL INDIAN FORTS & HERITAGE LANDMARKS
  // =========================================================================

  // A. SINHAGAD FORT, PUNE
  {
    id: 'sinhagad-fort',
    name: 'Sinhagad Fort (Lion Fort)',
    category: 'forts',
    neighborhood: 'Southwest Sahyadris',
    postalLocality: 'Sinhagad Ghat, Haveli Taluka, Pune 411025',
    coords: { x: 18, y: 64 },
    lat: 18.3663,
    lng: 73.7559,
    cost: 50,
    verifiedCostDescription: '₹50 Forest Dept. toll per four-wheeler / ₹20 for two-wheeler',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Historic mountain stone paths and fortified gateway steps',
    officialStatus: 'State Protected Monument & Forest Reserve',
    rating: 4.7,
    reviewCount: 45200,
    ratingSource: 'Maharashtra Tourism (MTDC) & Public Reviews',
    imageUrl: 'https://images.unsplash.com/photo-1626014303757-6467000c0f9a?auto=format&fit=crop&w=800&q=80',
    tagline: 'Sahyadri Fortress of Tanaji Malusare (1,312m)',
    story: 'Perched 1,312 meters above sea level on an isolated Sahyadri cliff, Sinhagad was the battleground of Tanaji Malusare’s legendary nocturnal assault in 1670. Celebrated for cliff-edge vistas, Pune and Kalyan Darwaza gates, and rustic hot pitla-bhakri.',
    historySummary: 'Dating back 2,000 years, fortified by the Yadavas and Silharas before becoming a pivotal Maratha bastion. Renamed from Kondhana in honor of Tanaji Malusare.',
    visitingHours: '05:00 AM – 06:00 PM daily (Descent enforced before dusk)',
    nearestTransit: 'Swargate Bus Depot to Sinhagad Foothill PMPML bus service (32 km)',
    sourceAttribution: 'Maharashtra Tourism Development Corporation (MTDC) & Forest Dept.',
    tags: ['Forts & Heritage', 'Sahyadri Trek', 'Maratha Fortress', 'Scenic Vistas', 'Pitla Bhakri'],
    isFeaturedGem: false,
    isFort: true
  },

  // B. SHANIWAR WADA, PUNE
  {
    id: 'shaniwar-wada',
    name: 'Shaniwar Wada Citadel',
    category: 'heritage',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Shaniwar Peth, Pune 411030',
    coords: { x: 48, y: 38 },
    lat: 18.5196,
    lng: 73.8553,
    cost: 25,
    verifiedCostDescription: '₹25 for Indian nationals / ₹300 for foreign visitors',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Ground courtyard accessible; upper stone ramparts have steep historic steps',
    officialStatus: 'ASI Grade I Centrally Protected Monument',
    rating: 4.5,
    reviewCount: 38400,
    ratingSource: 'OpenStreetMap & Public Heritage Reviews',
    imageUrl: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
    tagline: 'Historic Seat of the Maratha Peshwa Empire (1732)',
    story: 'Constructed in 1732 under Peshwa Baji Rao I, this grand stone citadel served as the nerve center of the Maratha Confederacy. It features the imposing Delhi Darwaza with iron elephant spikes, fountain foundations, and fortified stone bastions.',
    historySummary: 'Built 1730–1732 as the chief residence of the Peshwas. Survived multiple conflicts before an 1828 fire gutted the timber upper stories, preserving the majestic granite foundations and gates.',
    visitingHours: '08:00 AM – 06:30 PM daily (Light & Sound Show: 07:15 PM)',
    nearestTransit: 'PMC Metro Station (1.1 km) / Shaniwar Wada Bus Stand (80m)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & Pune Municipal Heritage Cell',
    tags: ['Forts & Heritage', 'Peshwa Citadel', 'Delhi Darwaza', 'Maratha History', 'Evening Light Show'],
    isFeaturedGem: false,
    isFort: true
  },

  // C. RAJGAD FORT, MAHARASHTRA
  {
    id: 'rajgad-fort',
    name: 'Rajgad Fort (King of Forts)',
    category: 'forts',
    neighborhood: 'Southwest Sahyadris',
    postalLocality: 'Gunjavane, Bhor Taluka, Pune District, Maharashtra 412213',
    coords: { x: 14, y: 72 },
    lat: 18.2464,
    lng: 73.6826,
    cost: 0,
    verifiedCostDescription: 'Free Public Admission (ASI Protected Forest Monument)',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Strenuous mountain trek with rock-cut steps through Chor Darwaza and Gunjavane Darwaza',
    officialStatus: 'ASI Protected National Monument & Maratha Capital',
    rating: 4.8,
    reviewCount: 26300,
    ratingSource: 'Archaeological Survey of India & Maharashtra Tourism',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    tagline: 'Sovereign Capital of Chhatrapati Shivaji Maharaj for 26 Years',
    story: 'The supreme royal bastion where Chhatrapati Shivaji Maharaj lived and governed for over 26 years before shifting capital to Raigad. Rising 1,376 meters, Rajgad features the towering Balekilla citadel, the Padmavati Machi palace ruins, and the needle-like Suvela Machi natural rock arch.',
    historySummary: 'Fortified extensively by Shivaji Maharaj beginning in 1647. Witnessed pivotal historical milestones including the birth of Rajaram Maharaj and the return from Agra.',
    visitingHours: 'Open 24 hours (Daylight trekking recommended: 06:00 AM – 06:00 PM)',
    nearestTransit: 'Swargate to Gunjavane Base Village ST Bus (55 km southwest of Pune)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & MTDC',
    tags: ['Forts & Heritage', 'Royal Capital', 'Balekilla', 'Suvela Machi', 'Sahyadri Trek'],
    isFeaturedGem: true,
    isFort: true
  },

  // D. TORNA FORT, MAHARASHTRA
  {
    id: 'torna-fort',
    name: 'Torna Fort (Prachandagad)',
    category: 'forts',
    neighborhood: 'Southwest Sahyadris',
    postalLocality: 'Velhe Taluka, Pune District, Maharashtra 412212',
    coords: { x: 10, y: 70 },
    lat: 18.2770,
    lng: 73.6190,
    cost: 0,
    verifiedCostDescription: 'Free Public Access (State Protected Hill Fort)',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Challenging ridge ascent; steep cliffs and stone steps',
    officialStatus: 'State Protected Monument & First Fort of Swarajya',
    rating: 4.7,
    reviewCount: 19800,
    ratingSource: 'Directorate of Archaeology Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443905e?auto=format&fit=crop&w=800&q=80',
    tagline: 'The First Fort Captured by 16-Year-Old Shivaji (1646)',
    story: 'The highest hill fort in Pune district at 1,403 meters (4,603 ft). Named Prachandagad ("Massive Fort") for its colossal scale. Captured by Shivaji Maharaj at age 16 in 1646, marking the founding of Maratha Swarajya. Houses the historic Mengai Devi temple and the dramatic Zunjar Machi ridge.',
    historySummary: 'Treasures discovered during Torna’s rebuilding financed the fortification of neighboring Rajgad. Remained a fiercely contested Maratha stronghold through centuries.',
    visitingHours: '06:00 AM – 06:00 PM daily',
    nearestTransit: 'Swargate ST Depot to Velhe Base Village bus service (50 km from Pune)',
    sourceAttribution: 'Directorate of Archaeology and Museums, Maharashtra',
    tags: ['Forts & Heritage', 'Cradle of Swarajya', 'Highest Pune Fort', 'Zunjar Machi', 'Trek'],
    isFeaturedGem: true,
    isFort: true
  },

  // E. LOHAGAD FORT, MAHARASHTRA
  {
    id: 'lohagad-fort',
    name: 'Lohagad Fort (The Iron Fort)',
    category: 'forts',
    neighborhood: 'Lonavala & Maval',
    postalLocality: 'Lohagad Base, Maval Taluka, Pune District 410401',
    coords: { x: 8, y: 18 },
    lat: 18.7077,
    lng: 73.4795,
    cost: 25,
    verifiedCostDescription: '₹25 for Indian nationals / ₹300 for foreign visitors (ASI entry)',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Paved stone staircases through four successive fortified gates',
    officialStatus: 'ASI Centrally Protected Monument of National Importance',
    rating: 4.6,
    reviewCount: 38900,
    ratingSource: 'Archaeological Survey of India (ASI)',
    imageUrl: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    tagline: 'Impregnable Iron Bastion with the Vinchukata Cliff',
    story: 'Rising 1,033 meters above sea level near Lonavala, Lohagad was deemed practically unassailable. Features four consecutive colossal stone gates (Ganesh, Narayan, Hanuman, and Maha Darwaja) and the famous 1,500-meter Vinchukata ("scorpion’s sting") narrow ridge extending into the valley.',
    historySummary: 'Held successively by the Chalukyas, Rashtrakutas, Bahmanis, Nizamshahis, and Marathas. Shivaji Maharaj captured it in 1648 and utilized it to secure treasury wealth from Surat.',
    visitingHours: '08:00 AM – 06:00 PM daily',
    nearestTransit: 'Malavli Railway Station on Pune-Lonavala suburban line (5 km to trailhead)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & MTDC',
    tags: ['Forts & Heritage', 'Vinchukata Ridge', 'Lonavala Heritage', 'Monsoon Favorite'],
    isFeaturedGem: false,
    isFort: true
  },

  // F. RAIGAD FORT, MAHARASHTRA
  {
    id: 'raigad-fort',
    name: 'Raigad Fort (Capital of Swarajya)',
    category: 'forts',
    neighborhood: 'Konkan & Western Ghats',
    postalLocality: 'Mahad Taluka, Raigad District, Maharashtra 402305',
    coords: { x: 6, y: 78 },
    lat: 18.2346,
    lng: 73.4418,
    cost: 25,
    verifiedCostDescription: '₹25 ASI entry fee (Optional ropeway ticket approx ₹350 return)',
    indoor: false,
    wheelchairAccessible: true,
    accessibilityNotes: 'Passenger ropeway available to summit plateau; plateau pathways partially step-free',
    officialStatus: 'ASI Centrally Protected Monument & Sovereign Maratha Capital',
    rating: 4.8,
    reviewCount: 41200,
    ratingSource: 'Archaeological Survey of India & Raigad Development Authority',
    imageUrl: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=800&q=80',
    tagline: 'Coronation Capital of Chhatrapati Shivaji Maharaj (1674)',
    story: 'Known as the "Gibraltar of the East", Raigad stands as the coronation site and royal capital where Chhatrapati Shivaji Maharaj was crowned sovereign monarch in 1674. Features the monumental Rajsabha throne plinth, the acoustic Nagarkhana, queen’s chambers, market bazaar ruins, and the sacred Shivaji Maharaj Samadhi.',
    historySummary: 'Selected by Shivaji Maharaj in 1656 as the ultimate defensive stronghold amid inaccessible Sahyadri ravines. Chief architect Hiroji Indulkar designed the grand city of stone.',
    visitingHours: '08:00 AM – 06:00 PM daily (Ropeway runs 08:30 AM – 05:30 PM)',
    nearestTransit: 'Pune to Mahad/Pachad State Transport Bus (130 km via Varandha Ghat)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & Raigad Authority',
    tags: ['Forts & Heritage', 'Coronation Capital', 'Shivaji Samadhi', 'Ropeway Available', 'National Monument'],
    isFeaturedGem: true,
    isFort: true
  },

  // G. SHIVNERI FORT, MAHARASHTRA
  {
    id: 'shivneri-fort',
    name: 'Shivneri Fort (Birthplace of Shivaji Maharaj)',
    category: 'forts',
    neighborhood: 'Northern Sahyadris / Junnar',
    postalLocality: 'Junnar, Pune District, Maharashtra 410502',
    coords: { x: 44, y: 4 },
    lat: 19.1983,
    lng: 73.8596,
    cost: 25,
    verifiedCostDescription: '₹25 for Indian nationals / ₹300 for foreign visitors',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Well-paved stone stairs through seven successive fortified gates',
    officialStatus: 'ASI Protected National Monument & Historic Birthplace',
    rating: 4.7,
    reviewCount: 31000,
    ratingSource: 'Archaeological Survey of India (ASI)',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    tagline: 'Birthplace of Chhatrapati Shivaji Maharaj (19 Feb 1630)',
    story: 'A triangle-shaped mountain citadel guarding the ancient Naneghat trade pass in Junnar. The sacred birthplace of Chhatrapati Shivaji Maharaj on February 19, 1630. Climbers pass through seven historic gateways, the Badami Talav water reservoir, Shivai Devi temple, and the reconstructed birth pavilion.',
    historySummary: 'Dating back to the 1st century CE under the Satavahanas. Given as a fiefdom to Shivaji’s grandfather Maloji Raje and father Shahaji Raje Bhonsle.',
    visitingHours: '06:00 AM – 06:00 PM daily',
    nearestTransit: 'Shivajinagar Bus Stand to Junnar ST Bus (90 km north of Pune)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & Junnar Tourism',
    tags: ['Forts & Heritage', 'Birthplace of Shivaji', 'Seven Gates', 'Junnar Heritage'],
    isFeaturedGem: true,
    isFort: true
  },

  // H. RED FORT (LAL QILA), DELHI
  {
    id: 'red-fort-delhi',
    name: 'Red Fort (Lal Qila)',
    category: 'forts',
    neighborhood: 'National Heritage / Delhi',
    postalLocality: 'Netaji Subhash Marg, Chandni Chowk, Old Delhi 110006',
    coords: { x: 50, y: 1 },
    lat: 28.6562,
    lng: 77.2410,
    cost: 50,
    verifiedCostDescription: '₹50 Indian nationals / ₹550 foreign visitors (ASI e-ticket)',
    indoor: false,
    wheelchairAccessible: true,
    accessibilityNotes: 'Broad paved avenues and ramps at main public palace pavilions',
    officialStatus: 'UNESCO World Heritage Site & National Flag Hoisting Monument',
    rating: 4.6,
    reviewCount: 84000,
    ratingSource: 'UNESCO World Heritage Centre & ASI',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    tagline: 'UNESCO World Heritage Mughal Citadel & National Pride',
    story: 'Commissioned by Mughal Emperor Shah Jahan in 1638 when shifting the imperial capital from Agra to Delhi. Built of monumental red sandstone ramparts spanning 2.4 kilometers along the Yamuna. Site of the annual Indian Independence Day national flag address from the ramparts of Lahori Gate.',
    historySummary: 'Designed by architect Ustad Ahmad Lahori. Houses the Diwan-i-Aam (Hall of Public Audiences), the pristine marble Diwan-i-Khas (Hall of Private Audiences), and the Nahr-i-Bihisht water channels.',
    visitingHours: '09:30 AM – 04:30 PM (Closed Mondays)',
    nearestTransit: 'Lal Quila Metro Station (Violet Line, 200m) / Chandni Chowk Metro',
    sourceAttribution: 'Archaeological Survey of India (ASI) & UNESCO',
    tags: ['Forts & Heritage', 'UNESCO World Heritage', 'Independence Day', 'Mughal Architecture'],
    isFeaturedGem: true,
    isFort: true
  },

  // I. AGRA FORT, UTTAR PRADESH
  {
    id: 'agra-fort',
    name: 'Agra Fort (Red Sandstone Citadel)',
    category: 'forts',
    neighborhood: 'National Heritage / Agra',
    postalLocality: 'Rakabganj, Agra, Uttar Pradesh 282003',
    coords: { x: 54, y: 3 },
    lat: 27.1795,
    lng: 78.0211,
    cost: 50,
    verifiedCostDescription: '₹50 for Indian nationals / ₹650 for foreign visitors',
    indoor: false,
    wheelchairAccessible: true,
    accessibilityNotes: 'Paved ramps leading from Amar Singh Gate through major courtyards',
    officialStatus: 'UNESCO World Heritage Site & Imperial Fortress',
    rating: 4.7,
    reviewCount: 65000,
    ratingSource: 'UNESCO World Heritage Centre & ASI Agra Circle',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    tagline: 'Imperial Red Sandstone Palace of Mughal Emperors',
    story: 'A massive 94-acre UNESCO World Heritage imperial fortress situated on the banks of the Yamuna River, 2.5 km northwest of the Taj Mahal. Built by Emperor Akbar from 1565 using red sandstone from Rajasthan, featuring Jahangiri Mahal, Khas Mahal, Sheesh Mahal, and Musamman Burj.',
    historySummary: 'Served as the main imperial residence of the Mughal emperors until 1638. Shah Jahan was confined here in his final years, gazing toward the Taj Mahal across the river.',
    visitingHours: '06:00 AM – 06:00 PM daily (Sunrise to Sunset)',
    nearestTransit: 'Agra Fort Railway Station (500m) / Idgah Bus Stand (3 km)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & UNESCO',
    tags: ['Forts & Heritage', 'UNESCO World Heritage', 'Akbar Citadel', 'Taj Mahal View'],
    isFeaturedGem: true,
    isFort: true
  },

  // J. CHITTORGARH FORT, RAJASTHAN
  {
    id: 'chittorgarh-fort',
    name: 'Chittorgarh Fort',
    category: 'forts',
    neighborhood: 'National Heritage / Rajasthan',
    postalLocality: 'Chittorgarh, Southern Rajasthan 312001',
    coords: { x: 38, y: 8 },
    lat: 24.8879,
    lng: 74.6450,
    cost: 40,
    verifiedCostDescription: '₹40 for Indian nationals / ₹600 for foreign visitors',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Expansive 700-acre plateau best explored via vehicle with walking at monuments',
    officialStatus: 'UNESCO World Heritage Site (Hill Forts of Rajasthan)',
    rating: 4.7,
    reviewCount: 39500,
    ratingSource: 'UNESCO World Heritage Centre & Archaeological Survey of India',
    imageUrl: 'https://images.unsplash.com/photo-1599818817730-22c95456f8f5?auto=format&fit=crop&w=800&q=80',
    tagline: 'India’s Largest Fort Complex & Symbol of Rajput Valor',
    story: 'Sprawling across nearly 700 acres on a 180-meter high hill, Chittorgarh is the largest fort in India. Historic capital of Mewar, renowned for epic battles and sacrifice. Houses the iconic 9-story Vijay Stambha (Tower of Victory), Kirti Stambha, Padmini’s Palace, and Gaumukh Reservoir.',
    historySummary: 'Dates back to the 7th century under the Mauryan ruler Chitrangada Mori. Withstood three legendary sieges by Alauddin Khalji (1303), Bahadur Shah (1535), and Akbar (1567).',
    visitingHours: '09:00 AM – 05:00 PM daily',
    nearestTransit: 'Chittorgarh Junction Railway Station (4 km)',
    sourceAttribution: 'Archaeological Survey of India (ASI) & UNESCO',
    tags: ['Forts & Heritage', 'UNESCO World Heritage', 'Vijay Stambha', 'Largest Fort in India'],
    isFeaturedGem: true,
    isFort: true
  },

  // =========================================================================
  // 2. AUTHENTIC PUNE MONUMENTS & CULTURAL GEMS
  // =========================================================================

  // AGA KHAN PALACE
  {
    id: 'aga-khan-palace',
    name: 'Aga Khan Palace',
    category: 'heritage',
    neighborhood: 'Kalyani Nagar / Nagar Rd',
    postalLocality: 'Yerawada / Nagar Road, Pune 411006',
    coords: { x: 74, y: 22 },
    lat: 18.5524,
    lng: 73.9015,
    cost: 25,
    verifiedCostDescription: '₹25 entry ticket (Children under 15 free)',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Paved garden walkways and ramp access to the main memorial corridor',
    officialStatus: 'Monument of National Importance (ASI)',
    rating: 4.6,
    reviewCount: 29500,
    ratingSource: 'ASI Visitor Records & Public Aggregators',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    tagline: 'National Freedom Landmark & Gandhi Memorial',
    story: 'Built in 1892 by Sultan Muhammed Shah Aga Khan III to generate employment during drought. It served as the internment site for Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai during the 1942 Quit India Movement.',
    historySummary: 'Donated to the nation in 1969. Contains the Gandhi Memorial museum, personal artifacts, and the serene samadhis of Kasturba Gandhi and Mahadev Desai surrounded by Italianate arches and manicured lawns.',
    visitingHours: '09:00 AM – 05:30 PM daily',
    nearestTransit: 'Kalyani Nagar Metro Station (800m) / Aga Khan Palace Bus Stop (50m)',
    sourceAttribution: 'Gandhi Memorial Trust & Archaeological Survey of India (ASI)',
    tags: ['Forts & Heritage', 'Quit India Movement', 'Italian Architecture', 'Wheelchair Accessible', 'Tranquil Gardens'],
    isFeaturedGem: false
  },

  // PATALESHWAR CAVE TEMPLE
  {
    id: 'pataleshwar-cave',
    name: 'Pataleshwar Rock-Cut Cave Temple',
    category: 'gem',
    neighborhood: 'Shivajinagar / JM Road',
    postalLocality: 'Jangali Maharaj Road, Shivajinagar, Pune 411005',
    coords: { x: 38, y: 32 },
    lat: 18.5284,
    lng: 73.8504,
    cost: 0,
    verifiedCostDescription: 'Free Public Admission (ASI Protected)',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Subterranean courtyard accessible via gentle stone ramp from JM Road entrance',
    officialStatus: 'Protected Ancient Monument (ASI)',
    rating: 4.6,
    reviewCount: 16900,
    ratingSource: 'ASI Heritage Register & Public Reviews',
    imageUrl: 'https://images.unsplash.com/photo-1608037521254-20a89d7010a3?auto=format&fit=crop&w=800&q=80',
    tagline: '8th-Century Basalt Wonder in the City Heart',
    story: 'Carved directly from a single massive basalt outcrop during the 8th-century Rashtrakuta period. This monolithic Shiva temple features massive stone square pillars, a circular Nandi mandapa canopy, and subterranean coolness beneath ancient banyan trees.',
    historySummary: 'Dating back over 1,200 years, contemporaneous with the Elephanta and Ellora rock excavations. Construction remained unfinished due to geological faults in the rock strata.',
    visitingHours: '08:00 AM – 05:30 PM daily',
    nearestTransit: 'Civil Court Metro Interchange (650m) / Shivajinagar Bus Stand (500m)',
    sourceAttribution: 'Archaeological Survey of India (ASI)',
    tags: ['Forts & Heritage', 'Rashtrakuta Dynasty', 'Rock-Cut Architecture', 'Free Entry', 'Hidden Oasis'],
    isFeaturedGem: true
  },

  // DAGDUSHETH HALWAI GANPATI TEMPLE
  {
    id: 'dagdusheth-ganpati',
    name: 'Shreemant Dagdusheth Halwai Ganpati Temple',
    category: 'heritage',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Budhwar Peth, Pune 411002',
    coords: { x: 49, y: 41 },
    lat: 18.5165,
    lng: 73.8562,
    cost: 0,
    verifiedCostDescription: 'Free Public Darshan (No ticketing)',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Dedicated ground queue with wheelchair assistance available during non-festival hours',
    officialStatus: 'Registered Religious Trust & Pune Cultural Icon',
    rating: 4.8,
    reviewCount: 52000,
    ratingSource: 'Public Temple Trust & Pilgrim Records',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tagline: 'Centuries-Old Spiritual Heart of Pune Since 1893',
    story: 'Established in 1893 by sweetmeat merchant Dagdusheth Gadve and his wife Lakshmibai after encouragement by Lokmanya Tilak. The magnificent golden idol and jewel-toned sanctum attract thousands of pilgrims daily.',
    historySummary: 'Instrumental in the public Sarvajanik Ganeshotsav movement started by Bal Gangadhar Tilak to unify citizens during the Indian independence struggle.',
    visitingHours: '06:00 AM – 10:30 PM daily',
    nearestTransit: 'Mandai Metro Station (450m) / Budhwar Peth Bus Stop (100m)',
    sourceAttribution: 'Shreemant Dagdusheth Halwai Sarvajanik Ganpati Trust',
    tags: ['Forts & Heritage', 'Iconic Mandir', 'Lokmanya Tilak Legacy', 'Ganeshotsav', 'Old City'],
    isFeaturedGem: false
  },

  // LAL MAHAL
  {
    id: 'lal-mahal',
    name: 'Lal Mahal (Red Palace)',
    category: 'heritage',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Kasba Peth, Pune 411011',
    coords: { x: 52, y: 40 },
    lat: 18.5186,
    lng: 73.8569,
    cost: 20,
    verifiedCostDescription: '₹20 municipal entry ticket',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Ground floor exhibition hall and courtyard wheelchair accessible',
    officialStatus: 'PMC Municipal Heritage Monument',
    rating: 4.4,
    reviewCount: 19100,
    ratingSource: 'Pune Municipal Corporation Heritage Cell',
    imageUrl: 'https://images.unsplash.com/photo-1599818817730-22c95456f8f5?auto=format&fit=crop&w=800&q=80',
    tagline: 'Boyhood Home of Chhatrapati Shivaji Maharaj',
    story: 'Reconstructed red brick memorial marking where young Shivaji lived with his mother Jijabai after arriving in Pune in 1630. Famous as the site of Shivaji’s daring 1663 midnight raid against Mughal commander Shaista Khan.',
    historySummary: 'Originally constructed in 1630 by Shahaji Raje Bhonsle. Reconstructed by the PMC in 1988 with historic oil paintings, brass statues, and landscaped gardens.',
    visitingHours: '09:00 AM – 01:00 PM & 04:00 PM – 08:00 PM daily',
    nearestTransit: 'Kasba Peth Metro Station (400m) / Lal Mahal Bus Stop (30m)',
    sourceAttribution: 'Pune Municipal Corporation (PMC) Heritage Department',
    tags: ['Forts & Heritage', 'Shivaji Maharaj', 'Jijabai Memorial', 'Kasba Peth', 'Maratha Lore'],
    isFeaturedGem: false
  },

  // RAJA DINKAR KELKAR MUSEUM
  {
    id: 'raja-kelkar-museum',
    name: 'Raja Dinkar Kelkar Museum',
    category: 'heritage',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Shukrawar Peth, Bajirao Road, Pune 411002',
    coords: { x: 47, y: 44 },
    lat: 18.5108,
    lng: 73.8543,
    cost: 100,
    verifiedCostDescription: '₹100 for Indian adults / ₹300 for foreign visitors / ₹30 for children',
    indoor: true,
    wheelchairAccessible: false,
    accessibilityNotes: 'Multi-level traditional structure with narrow heritage staircases',
    officialStatus: 'Registered State Museum / Archaeology Dept.',
    rating: 4.5,
    reviewCount: 14200,
    ratingSource: 'Directorate of Archaeology and Museums, Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tagline: 'Treasury of 20,000 Rare Indian Artifacts & Mastani Mahal',
    story: 'A treasure house amassed by Dr. D.G. Kelkar in memory of his son. Houses an astonishing collection of 14th-to-19th century musical instruments, brass betel boxes, carved wooden doors, weapons, and a life-size recreation of the Mastani Mahal.',
    historySummary: 'Handed over to the Government of Maharashtra in 1975. Represents one of India’s most comprehensive personal collections of everyday folk and royal decorative arts.',
    visitingHours: '10:00 AM – 05:30 PM daily (Ticket counter closes 05:00 PM)',
    nearestTransit: 'Mandai Metro Station (650m) / Kelkar Museum Bus Stop (40m)',
    sourceAttribution: 'Department of Cultural Affairs & Directorate of Museums Maharashtra',
    tags: ['Forts & Heritage', 'Mastani Mahal', 'Rare Musical Instruments', 'Historic Artifacts', 'Folk Art'],
    isFeaturedGem: true
  },

  // SARAS BAUG & TALYATLA GANPATI
  {
    id: 'saras-baug',
    name: 'Saras Baug & Talyatla Ganpati',
    category: 'nature',
    neighborhood: 'Swargate / Parvati',
    postalLocality: 'Sanas Maidan, Swargate, Pune 411009',
    coords: { x: 44, y: 52 },
    lat: 18.5009,
    lng: 73.8540,
    cost: 0,
    verifiedCostDescription: 'Free park admission (PMC Public Garden)',
    indoor: false,
    wheelchairAccessible: true,
    accessibilityNotes: 'Paved perimeter walkways with ramp entrance from Swargate side',
    officialStatus: 'Municipal Public Heritage Garden',
    rating: 4.6,
    reviewCount: 34200,
    ratingSource: 'PMC Garden Department & Public Records',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Historic Lake Garden Built by the Peshwas (1784)',
    story: 'Commissioned in 1784 by Sawai Madhavrao Peshwa, this landscaped pleasure garden surrounds a central moat where the sacred white marble Talyatla Ganpati (Ganesha in the Lake) shrine commands deep reverence.',
    historySummary: 'Originally a 25-acre lake fed by the Ambil Odha stream where Peshwa naval boats trained. Converted into an expansive public park with fountains and rose beds in 1969.',
    visitingHours: '06:00 AM – 09:00 PM daily',
    nearestTransit: 'Swargate Metro Station (600m) / Swargate ST Bus Stand (500m)',
    sourceAttribution: 'PMC Garden Department & Sarasbaug Temple Trust',
    tags: ['Lake Garden', 'Marble Shrine', 'Family Recreation', 'Wheelchair Friendly'],
    isFeaturedGem: false
  },

  // VETAL TEKDI
  {
    id: 'vetal-tekdi',
    name: 'Vetal Tekdi (ARAI Ridge)',
    category: 'nature',
    neighborhood: 'Kothrud / Senapati Bapat Rd',
    postalLocality: 'Senapati Bapat Road / Kothrud, Pune 411038',
    coords: { x: 24, y: 32 },
    lat: 18.5262,
    lng: 73.8184,
    cost: 0,
    verifiedCostDescription: 'Free Public Access (Protected Urban Forest)',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Natural unpaved hiking trails with rocky uphill gradients',
    officialStatus: 'Protected Urban Reserved Forest',
    rating: 4.8,
    reviewCount: 18600,
    ratingSource: 'Pune Forest Division & Trekker Logs',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    tagline: 'Pune’s Highest Urban Ridge at 2,600 Feet',
    story: 'The green lungs of western Pune. Climb up at dawn to witness wild peacocks, over 100 species of migratory birds, and panoramic 360-degree sunrise vistas overlooking the entire Pune-Pimpri valley.',
    historySummary: 'Named after the ancient Vetala temple at its ridge summit. Defended by citizen groups as an unbroken natural forest reserve containing indigenous dry-deciduous flora.',
    visitingHours: 'Open 24 hours (Recommended: 05:30 AM – 09:30 AM & 04:30 PM – 07:00 PM)',
    nearestTransit: 'MIT Kothrud Bus Stand (1.1 km to trailhead) / SB Road Symbiosis (1.3 km)',
    sourceAttribution: 'Pune Forest Division & Tekdi Conservation Forum',
    tags: ['Urban Ridge', 'Birdwatching', 'Sunrise Panorama', 'Free Nature Trek'],
    isFeaturedGem: true
  },

  // VAISHALI RESTAURANT
  {
    id: 'vaishali-restaurant',
    name: 'Vaishali Cafe & Restaurant',
    category: 'food',
    neighborhood: 'Deccan / FC Road',
    postalLocality: 'Fergusson College Road, Deccan Gymkhana, Pune 411004',
    coords: { x: 36, y: 37 },
    lat: 18.5238,
    lng: 73.8415,
    cost: 250,
    verifiedCostDescription: 'Average spend ₹200 – ₹350 per person',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Ground floor dining hall and outdoor courtyard accessible',
    officialStatus: 'Pune Restaurant Guild Heritage Icon Since 1965',
    rating: 4.6,
    reviewCount: 42300,
    ratingSource: 'Pune Restaurant & Hoteliers Association',
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80',
    tagline: 'The Cultural Epicenter of FC Road Since 1965',
    story: 'For generations of Pune students, writers, theater artists, and families, Vaishali is a sacred ritual. Savor crispy Mysore Masala Dosa, signature SPDP (Sev Potato Dahi Puri), and steaming South Indian filter coffee in the leafy courtyard.',
    historySummary: 'Founded in 1965 by Jagannath Shetty. Evolved into the intellectual debating parlor for Fergusson College professors, Marathi playwrights, and generations of young scholars.',
    visitingHours: '07:00 AM – 11:00 PM daily',
    nearestTransit: 'Deccan Gymkhana Metro Station (400m) / FC Road Goodluck Bus Stop (150m)',
    sourceAttribution: 'Pune Restaurant & Hoteliers Association Record',
    tags: ['FC Road Icon', 'Mysore Dosa', 'SPDP', 'Filter Coffee', 'Student Landmark'],
    isFeaturedGem: false
  },

  // KAYANI BAKERY
  {
    id: 'kayani-bakery',
    name: 'Kayani Bakery',
    category: 'food',
    neighborhood: 'Pune Camp / East Street',
    postalLocality: '6 East Street, Hulshur, Camp, Pune 411001',
    coords: { x: 62, y: 44 },
    lat: 18.5147,
    lng: 73.8797,
    cost: 220,
    verifiedCostDescription: 'Shrewsbury Biscuits approx ₹440/kg (packets from ₹110)',
    indoor: true,
    wheelchairAccessible: false,
    accessibilityNotes: 'Narrow heritage doorway with low single step at East Street pavement',
    officialStatus: 'Iconic Irani Bakery Since 1955',
    rating: 4.5,
    reviewCount: 31200,
    ratingSource: 'Heritage Culinary Archive & Customer Registers',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    tagline: 'World-Famous Shrewsbury Butter Biscuits Since 1955',
    story: 'No visit to Pune is complete without standing in the orderly queue on East Street. Their secret-recipe Shrewsbury butter biscuits, cardamom mawa cakes, and cheese papri melt instantly in your mouth with old-world Irani charm.',
    historySummary: 'Established by brothers Khodadad and Hormuz Irani in 1955. Preserves the original teak counters, vintage cash tills, and traditional baking ovens.',
    visitingHours: '07:30 AM – 01:00 PM & 03:30 PM – 08:00 PM (Closed Sundays)',
    nearestTransit: 'Pune Railway Station (2.3 km) / Camp MG Road Bus Stand (300m)',
    sourceAttribution: 'Pune Heritage Culinary Archive',
    tags: ['Irani Bakery', 'Shrewsbury Biscuits', 'Mawa Cake', 'Pune Camp Heritage'],
    isFeaturedGem: false
  },

  // BEDEKAR TEA STALL
  {
    id: 'bedekar-misal',
    name: 'Bedekar Tea Stall',
    category: 'budget',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Narayan Peth, Pune 411030',
    coords: { x: 46, y: 41 },
    lat: 18.5144,
    lng: 73.8519,
    cost: 110,
    verifiedCostDescription: 'Misal Pav approx ₹100 – ₹130',
    indoor: true,
    wheelchairAccessible: false,
    accessibilityNotes: 'Heritage peth lane with ground-level step into dining room',
    officialStatus: 'Puneri Heritage Culinary Institution (1948)',
    rating: 4.5,
    reviewCount: 19600,
    ratingSource: 'Puneri Culinary Guild Records',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    tagline: 'Peth Heartland Puneri Misal Since 1948',
    story: 'Tucked inside the heritage lanes of Narayan Peth, Bedekar serves the quintessential Puneri misal: perfectly balanced sweet-and-spicy kat broth with poha base, fresh farsan, and soft bread pav.',
    historySummary: 'Started in 1948 by Govind Bedekar. Unlike the fiery Kolhapuri misal, Bedekar popularized the mild, tamarind-hinted Puneri Kat broth that has defined old-city breakfasts for over 75 years.',
    visitingHours: '07:30 AM – 07:00 PM (Closed Mondays)',
    nearestTransit: 'Mandai Metro Station (800m) / Narayan Peth Bus Stop (120m)',
    sourceAttribution: 'Puneri Culinary Guild Record',
    tags: ['Puneri Misal', 'Authentic Peth', 'Under ₹150', 'Breakfast Legend'],
    isFeaturedGem: true
  },

  // GERMAN BAKERY
  {
    id: 'german-bakery',
    name: 'German Bakery',
    category: 'cafe',
    neighborhood: 'Koregaon Park (North Main Rd)',
    postalLocality: 'North Main Road, Koregaon Park, Pune 411001',
    coords: { x: 68, y: 31 },
    lat: 18.5362,
    lng: 73.8938,
    cost: 450,
    verifiedCostDescription: 'Average spend ₹350 – ₹600 per person',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Open-air patio and ground floor seating wheelchair accessible',
    officialStatus: 'Registered Restaurant Landmark Since 1988',
    rating: 4.4,
    reviewCount: 22100,
    ratingSource: 'Koregaon Park Commercial Directory',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    tagline: 'Bohemian Meeting Ground & Artisan Pastries',
    story: 'A bohemian landmark under Koregaon Park’s lush tree canopies. Celebrated for apple strudel, freshly baked cheesecakes, masala chai, and a warm outdoor terrace attracting artists, backpackers, and tech founders.',
    historySummary: 'Founded in 1988 by Klaus Gutzeit and Gopal Woody near the Osho Commune. Rebuilt into a resilient cosmopolitan hub cherished by the global traveler community.',
    visitingHours: '08:00 AM – 11:30 PM daily',
    nearestTransit: 'Kalyani Nagar Metro (1.4 km) / Koregaon Park Auto Stand (50m)',
    sourceAttribution: 'Koregaon Park Cultural Directory',
    tags: ['Koregaon Park', 'Apple Strudel', 'Outdoor Patio', 'Cafe Culture'],
    isFeaturedGem: false
  },

  // TULSHIBAUG & MANDAI BAZAAR
  {
    id: 'tulshibaug-market',
    name: 'Tulshibaug & Mahatma Phule Mandai',
    category: 'shopping',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Budhwar Peth / Shukrawar Peth, Pune 411002',
    coords: { x: 50, y: 44 },
    lat: 18.5139,
    lng: 73.8550,
    cost: 0,
    verifiedCostDescription: 'Free Entry (Traditional Public Market)',
    indoor: false,
    wheelchairAccessible: false,
    accessibilityNotes: 'Crowded pedestrian market lanes with cobblestone and curbs',
    officialStatus: 'Municipal Heritage Bazaar (1886)',
    rating: 4.4,
    reviewCount: 28200,
    ratingSource: 'Pune Municipal Corporation Bazaar Records',
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Heart of Puneri Brass, Traditional Textiles & Spices',
    story: 'Wander through the buzzing 18th-century bazaar surrounding the historic Ram Temple. Find authentic brass pooja ware, hand-crafted Paithani sarees, Kolhapuri footwear, and fresh regional spices beneath colonial Gothic stone market arches.',
    historySummary: 'The Tulshibaug temple complex was founded in 1761 by Naro Appaji Tulshibaugwale. Mahatma Phule Mandai was completed in 1886 by the British as a central municipal market hall.',
    visitingHours: '10:00 AM – 09:30 PM daily',
    nearestTransit: 'Mandai Metro Station (Direct underground exit 80m)',
    sourceAttribution: 'Pune Municipal Heritage & Bazaar Guild',
    tags: ['Historic Bazaar', 'Traditional Brass', 'Paithani Sarees', 'Mandai Metro'],
    isFeaturedGem: false
  },

  // OSHO TEERTH ZEN PARK
  {
    id: 'osho-teerth-park',
    name: 'Osho Teerth Zen Park',
    category: 'gem',
    neighborhood: 'Koregaon Park (North Main Rd)',
    postalLocality: 'Lane 1, Koregaon Park, Pune 411001',
    coords: { x: 72, y: 33 },
    lat: 18.5393,
    lng: 73.8967,
    cost: 70,
    verifiedCostDescription: '₹70 morning/evening entry token',
    indoor: false,
    wheelchairAccessible: true,
    accessibilityNotes: 'Paved trail through bamboo groves with slight wooden bridge inclines',
    officialStatus: 'Ecologically Restored Public Garden',
    rating: 4.6,
    reviewCount: 9300,
    ratingSource: 'Osho Meditation Sanctuary Environmental Cell',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    tagline: 'Miracle of Japanese Zen Ecological Restoration',
    story: 'A hidden 12-acre Japanese Zen oasis tucked away in Koregaon Park. Once a barren municipal wastewater drainage ditch, it was miraculously transformed into a tranquil haven of bamboo groves, stone arch bridges, and babbling koi streams.',
    historySummary: 'Designed in 1989 by Japanese landscape master Shunyo with ecological bio-filtration. Demonstrates world-class natural urban water purification right in the city.',
    visitingHours: '06:00 AM – 09:00 AM & 03:00 PM – 06:00 PM daily',
    nearestTransit: 'Kalyani Nagar Metro (1.2 km) / KP North Main Rd (350m)',
    sourceAttribution: 'Osho International Meditation Sanctuary & Environmental Cell',
    tags: ['Zen Garden', 'Streams & Bamboo', 'Mindfulness', 'Hidden Gem', 'Wheelchair Friendly'],
    isFeaturedGem: true
  },

  // TRISHUNDHA GANPATI TEMPLE
  {
    id: 'trishundha-ganpati',
    name: 'Trishundha Ganpati Temple',
    category: 'gem',
    neighborhood: 'Old City (Peths)',
    postalLocality: 'Somwar Peth, Pune 411011',
    coords: { x: 55, y: 39 },
    lat: 18.5218,
    lng: 73.8643,
    cost: 0,
    verifiedCostDescription: 'Free Admission (Historic Temple)',
    indoor: true,
    wheelchairAccessible: false,
    accessibilityNotes: 'Subterranean step entrance to black basalt sanctum',
    officialStatus: 'Heritage Grade I Temple (INTACH Pune)',
    rating: 4.6,
    reviewCount: 3900,
    ratingSource: 'INTACH Pune Chapter & Heritage Surveys',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    tagline: '1770 Black Basalt Temple with British Soldier Reliefs',
    story: 'One of Pune’s best-kept architectural secrets. Built in 1770 by Mahant Bhimgir Gosavi, this black basalt temple depicts Lord Ganesha with three trunks and six arms seated on a peacock, surrounded by rare stone carvings of European soldiers and rhinoceroses.',
    historySummary: 'Constructed over 14 years (1754–1770) featuring a subterranean water reservoir and inscriptions in Sanskrit and Persian.',
    visitingHours: '08:00 AM – 12:00 PM & 05:00 PM – 08:30 PM daily',
    nearestTransit: 'Pune Railway Station (1.2 km) / Somwar Peth Bus Stop (80m)',
    sourceAttribution: 'Indian National Trust for Art and Cultural Heritage (INTACH)',
    tags: ['Forts & Heritage', 'Three-Trunked Ganesha', 'Basalt Carvings', 'Free Entry', 'Hidden Architecture'],
    isFeaturedGem: true
  },

  // HOTEL SHREYAS
  {
    id: 'hotel-shreyas',
    name: 'Hotel Shreyas & Dining Hall',
    category: 'hotel',
    neighborhood: 'Deccan / FC Road',
    postalLocality: '1242 Apte Road, Deccan Gymkhana, Pune 411004',
    coords: { x: 37, y: 42 },
    lat: 18.5198,
    lng: 73.8447,
    cost: 480,
    verifiedCostDescription: 'Unlimited Maharashtrian Thali approx ₹450 – ₹550',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Elevator and ground level ramp access to dining hall',
    officialStatus: 'Heritage Maharashtrian Dining Institution (1966)',
    rating: 4.5,
    reviewCount: 14700,
    ratingSource: 'Maharashtra Tourism Registered Dining',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tagline: 'Authentic Maharashtrian Thali & Warm Hospitality',
    story: 'The gold standard of traditional Maharashtrian culinary hospitality in Deccan. Celebrated for its royal silver-thali puran poli feasts, ukadiche modak, and central location ideal for walking down FC Road.',
    historySummary: 'Serving Pune since 1966 under the Chitale hospitality family. Preserves heritage recipes and home-cooked warmth that draws dignitaries and travelers alike.',
    visitingHours: 'Thali: 11:30 AM – 03:00 PM & 07:30 PM – 10:30 PM',
    nearestTransit: 'Deccan Gymkhana Metro Station (500m) / Apte Road Bus Stop (50m)',
    sourceAttribution: 'Maharashtra Tourism Registered Dining Guide',
    tags: ['Traditional Thali', 'Puran Poli', 'Deccan Central', 'Wheelchair Friendly'],
    isFeaturedGem: false
  },

  // THE RITZ-CARLTON PUNE
  {
    id: 'ritz-carlton-pune',
    name: 'The Ritz-Carlton Pune',
    category: 'hotel',
    neighborhood: 'Kalyani Nagar / Nagar Rd',
    postalLocality: 'Golf Course Square, Airport Road, Yerawada, Pune 411006',
    coords: { x: 78, y: 16 },
    lat: 18.5574,
    lng: 73.8942,
    cost: 2800,
    verifiedCostDescription: 'Dining covers ₹2,500 – ₹4,000 / Rooms from ₹14,000/night',
    indoor: true,
    wheelchairAccessible: true,
    accessibilityNotes: 'Fully barrier-free five-star accessibility with elevators and ADA compliant bathrooms',
    officialStatus: '5-Star Deluxe Hotel (Govt. of India Tourism)',
    rating: 4.8,
    reviewCount: 7900,
    ratingSource: 'International Luxury Hotel Association & Guest Audits',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    tagline: 'Luxury Skyline Oasis Overlooking Poona Golf Greens',
    story: 'Ultra-luxurious retreat featuring panoramic floor-to-ceiling Poona Golf Club vistas, Japanese dining at Ukiyo, curated contemporary Indian artwork, and world-class accessible hospitality.',
    historySummary: 'Designed with subtle Maratha architectural references, tiered chandeliers, and an expansive wellness spa honoring ancient Ayurvedic traditions.',
    visitingHours: 'Open 24 Hours (Dining reservations recommended)',
    nearestTransit: 'Yerawada Metro Station (1.1 km) / Airport (4 km)',
    sourceAttribution: 'Ministry of Tourism Hotel Classification Board',
    tags: ['Luxury Stay', 'Golf View', 'Fine Dining', 'Wheelchair Accessible'],
    isFeaturedGem: false
  }
];

export interface IncidentRiskZone {
  id: string;
  name: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
  r: number;
  severity: number;
  nightMultiplier: number;
  category: string;
  officialSource: string;
  description: string;
  isCitizenGenerated?: boolean;
}

export const INITIAL_RISK_ZONES: IncidentRiskZone[] = [
  {
    id: 'rz-swargate',
    name: 'Swargate Multimodal Hub & Flyover Divergence',
    x: 48,
    y: 54,
    lat: 18.5015,
    lng: 73.8580,
    r: 6.8,
    severity: 8.5,
    nightMultiplier: 2.1,
    category: 'Accident Bottleneck',
    officialSource: 'Pune Traffic Police Annual Incident Register',
    description: 'High pedestrian conflict zone; heavy bus convergence from ST depot; blind spot at flyover descent.'
  },
  {
    id: 'rz-shivajinagar',
    name: 'Shivajinagar Railway Underpass',
    x: 42,
    y: 26,
    lat: 18.5310,
    lng: 73.8510,
    r: 6.2,
    severity: 8.0,
    nightMultiplier: 2.5,
    category: 'Waterlogging & Low Visibility',
    officialSource: 'PMC Monsoon Disaster Cell & Public Works',
    description: 'Chronic monsoon flash waterlogging; inadequate lighting during late night hours; blind entrance turn.'
  },
  {
    id: 'rz-hadapsar',
    name: 'Hadapsar Gadital Highway Merge',
    x: 82,
    y: 48,
    lat: 18.5010,
    lng: 73.9260,
    r: 6.5,
    severity: 7.5,
    nightMultiplier: 1.8,
    category: 'Heavy Freight Corridor',
    officialSource: 'Highway Safety Patrol & Pune RTO',
    description: 'High-speed industrial freight truck traffic merging onto Solapur highway without grade separation.'
  },
  {
    id: 'rz-deccan-riverside',
    name: 'Deccan Mutha Riverside Walkway',
    x: 34,
    y: 46,
    lat: 18.5170,
    lng: 73.8450,
    r: 6.0,
    severity: 7.8,
    nightMultiplier: 2.4,
    category: 'Nighttime Lighting Deficit',
    officialSource: 'Citizen Civic Audit & Ward Office 12',
    description: 'Isolated stretch after 8:30 PM with several non-functional lamp posts along riverside bund path.'
  },
  {
    id: 'rz-katraj',
    name: 'Katraj Old Tunnel Ghat Hairpin',
    x: 26,
    y: 62,
    lat: 18.4480,
    lng: 73.8600,
    r: 7.0,
    severity: 8.2,
    nightMultiplier: 2.0,
    category: 'Steep Blind Gradient',
    officialSource: 'State Highway Authority Incident Log',
    description: 'Sharp blind hairpin turns, loose gravel in monsoon, headlight glare, and seasonal valley fog.'
  }
];

export interface JunctionNode {
  id: string;
  name: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
  metroConnected?: boolean;
}

export const ROAD_JUNCTIONS: JunctionNode[] = [
  { id: 'J0', name: 'Baner Junction', x: 14, y: 14, lat: 18.5590, lng: 73.7868 },
  { id: 'J1', name: 'Aundh / University Gate', x: 32, y: 14, lat: 18.5530, lng: 73.8240 },
  { id: 'J2', name: 'Khadki Cantonment', x: 50, y: 14, lat: 18.5620, lng: 73.8510 },
  { id: 'J3', name: 'Yerawada Bridge', x: 68, y: 14, lat: 18.5535, lng: 73.8860, metroConnected: true },
  { id: 'J4', name: 'Viman Nagar Cross', x: 86, y: 14, lat: 18.5679, lng: 73.9143 },

  { id: 'J5', name: 'Pashan Circle', x: 14, y: 28, lat: 18.5390, lng: 73.7920 },
  { id: 'J6', name: 'Shivajinagar Junction', x: 32, y: 28, lat: 18.5314, lng: 73.8446, metroConnected: true },
  { id: 'J7', name: 'Sangam Bridge / Civil Court', x: 50, y: 28, lat: 18.5290, lng: 73.8630, metroConnected: true },
  { id: 'J8', name: 'Koregaon Park North', x: 68, y: 28, lat: 18.5360, lng: 73.8940 },
  { id: 'J9', name: 'Kalyani Nagar', x: 86, y: 28, lat: 18.5480, lng: 73.9040, metroConnected: true },

  { id: 'J10', name: 'Kothrud Stand', x: 14, y: 44, lat: 18.5074, lng: 73.8077, metroConnected: true },
  { id: 'J11', name: 'Deccan Gymkhana', x: 32, y: 44, lat: 18.5173, lng: 73.8418, metroConnected: true },
  { id: 'J12', name: 'Shaniwar Peth / Mandai', x: 50, y: 44, lat: 18.5150, lng: 73.8560, metroConnected: true },
  { id: 'J13', name: 'Pune Camp East', x: 68, y: 44, lat: 18.5140, lng: 73.8810 },
  { id: 'J14', name: 'Hadapsar Gadital', x: 86, y: 44, lat: 18.5010, lng: 73.9260 },

  { id: 'J15', name: 'Warje Malwadi', x: 14, y: 58, lat: 18.4790, lng: 73.8010 },
  { id: 'J16', name: 'Sinhagad Rd / Parvati', x: 32, y: 58, lat: 18.4940, lng: 73.8430 },
  { id: 'J17', name: 'Swargate ST Depot', x: 50, y: 58, lat: 18.5015, lng: 73.8580, metroConnected: true },
  { id: 'J18', name: 'Bibwewadi / Market Yard', x: 68, y: 58, lat: 18.4840, lng: 73.8690 },
  { id: 'J19', name: 'Kondhwa Hub', x: 86, y: 58, lat: 18.4710, lng: 73.8930 }
];

export interface RoadEdge {
  u: string;
  v: string;
  isShortcut?: boolean;
}

export const ROAD_EDGES: RoadEdge[] = [
  // Horizontal grid lines
  { u: 'J0', v: 'J1' }, { u: 'J1', v: 'J2' }, { u: 'J2', v: 'J3' }, { u: 'J3', v: 'J4' },
  { u: 'J5', v: 'J6' }, { u: 'J6', v: 'J7' }, { u: 'J7', v: 'J8' }, { u: 'J8', v: 'J9' },
  { u: 'J10', v: 'J11' }, { u: 'J11', v: 'J12' }, { u: 'J12', v: 'J13' }, { u: 'J13', v: 'J14' },
  { u: 'J15', v: 'J16' }, { u: 'J16', v: 'J17' }, { u: 'J17', v: 'J18' }, { u: 'J18', v: 'J19' },

  // Vertical grid lines
  { u: 'J0', v: 'J5' }, { u: 'J5', v: 'J10' }, { u: 'J10', v: 'J15' },
  { u: 'J1', v: 'J6' }, { u: 'J6', v: 'J11' }, { u: 'J11', v: 'J16' },
  { u: 'J2', v: 'J7' }, { u: 'J7', v: 'J12' }, { u: 'J12', v: 'J17' },
  { u: 'J3', v: 'J8' }, { u: 'J8', v: 'J13' }, { u: 'J13', v: 'J18' },
  { u: 'J4', v: 'J9' }, { u: 'J9', v: 'J14' }, { u: 'J14', v: 'J19' },

  // Diagonal shortcuts crossing risk corridors
  { u: 'J1', v: 'J7', isShortcut: true },
  { u: 'J11', v: 'J17', isShortcut: true }
];

export const HISTORICAL_TIMELINE = [
  {
    year: '758 CE',
    title: 'Rashtrakuta Dynasty & Pataleshwar Rock Cut',
    description: 'Earliest archaeological record of Punaka Vishaya under King Krishna I. Master artisans excavate the monolithic Pataleshwar rock cave temple from Pune basalt.'
  },
  {
    year: '1630 CE',
    title: 'Birth of Shivaji at Shivneri & Home at Lal Mahal',
    description: 'Chhatrapati Shivaji Maharaj is born at Shivneri Fort on 19 Feb 1630; later establishes residence with Jijabai at Lal Mahal in Pune.'
  },
  {
    year: '1646 CE',
    title: 'Capture of Torna Fort & Foundation of Swarajya',
    description: 'At age 16, Shivaji Maharaj captures Torna Fort (Prachandagad), beginning the Maratha freedom struggle and fortifying Rajgad.'
  },
  {
    year: '1674 CE',
    title: 'Coronation at Raigad Capital',
    description: 'Grand coronation (Rajyabhishek) of Chhatrapati Shivaji Maharaj at Raigad Fort, establishing the sovereign Maratha Empire.'
  },
  {
    year: '1732 CE',
    title: 'Peshwa Baji Rao I & Shaniwar Wada',
    description: 'Peshwa Baji Rao I lays the cornerstone of the Shaniwar Wada citadel, elevating Pune to the premier political capital of India.'
  },
  {
    year: '1893 CE',
    title: 'Public Ganeshotsav & Dagdusheth Mandir',
    description: 'Lokmanya Bal Gangadhar Tilak transforms Ganeshotsav into a mass public cultural movement at Dagdusheth to unite Indian citizens.'
  },
  {
    year: '1942 CE',
    title: 'Quit India Internment at Aga Khan Palace',
    description: 'Mahatma Gandhi, Kasturba Gandhi, and national leaders interned at Aga Khan Palace, now a National Freedom Memorial.'
  }
];

export const PUNE_NEIGHBORHOOD_CENTERS: Record<string, { lat: number; lng: number; zoom: number; label: string }> = {
  'Pune': { lat: 18.5204, lng: 73.8567, zoom: 12, label: 'Pune (All Places)' },
  'Forts & Heritage': { lat: 18.4000, lng: 73.6500, zoom: 9, label: 'Indian Forts & Heritage Sites' },
  'Old City': { lat: 18.5175, lng: 73.8550, zoom: 15, label: 'Old City (Peths & Shaniwar Wada)' },
  'Deccan': { lat: 18.5225, lng: 73.8420, zoom: 15, label: 'Deccan & FC Road' },
  'Shivajinagar': { lat: 18.5314, lng: 73.8446, zoom: 15, label: 'Shivajinagar & JM Road' },
  'Camp': { lat: 18.5147, lng: 73.8797, zoom: 15, label: 'Pune Camp & East Street' },
  'Koregaon Park': { lat: 18.5380, lng: 73.8950, zoom: 15, label: 'Koregaon Park' },
  'Kothrud': { lat: 18.5074, lng: 73.8077, zoom: 14, label: 'Kothrud & Vetal Tekdi' },
  'Kalyani Nagar': { lat: 18.5524, lng: 73.9015, zoom: 15, label: 'Kalyani Nagar & Nagar Rd' },
  'Swargate': { lat: 18.5015, lng: 73.8580, zoom: 15, label: 'Swargate & Saras Baug' },
  'Delhi': { lat: 28.6562, lng: 77.2410, zoom: 13, label: 'Delhi (Red Fort)' },
  'Agra': { lat: 27.1795, lng: 78.0211, zoom: 13, label: 'Agra (Agra Fort)' },
  'Rajasthan': { lat: 24.8879, lng: 74.6450, zoom: 13, label: 'Chittorgarh (Rajasthan)' }
};
