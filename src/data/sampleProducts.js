export const SAMPLE_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Traditional Handmade Bamboo Storage Basket',
    artisanId: 'art-001',
    artisanName: 'Kumar Swaminathan',
    location: 'Salem, Tamil Nadu',
    category: 'Home & Lifestyle',
    subCategory: 'Storage & Organizers',
    craftType: 'Traditional Bamboo Weaving',
    material: 'Natural Bamboo & Cane',
    color: 'Natural Amber Brown',
    price: 1450,
    suggestedPriceMin: 1200,
    suggestedPriceMax: 1650,
    availability: 'inStock', // inStock | madeToOrder | outOfStock
    qualityScore: 96,
    status: 'published', // published | draft | underReview
    views: 840,
    enquiriesCount: 9,
    confidence: {
      name: 98,
      category: 95,
      material: 97,
      craftType: 94,
      overall: 96
    },
    images: {
      front: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
      angle: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      processedStudio: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80'
    },
    description: {
      en: 'Mastercrafted by 3rd generation rural artisans in Salem, this sustainable storage basket is woven from aged organic bamboo strips. Features interlocking herringbone weave providing 20kg weight capacity. Naturally smoked to resist moisture and termites without chemical varnish.',
      ta: 'சேலம் பாரம்பரிய கைவினைஞர்களால் இயற்கை மூங்கில் நார்களைக் கொண்டு கைமுறையாக நெய்யப்பட்ட உறுதியான சேமிப்புக் கூடை. 20 கிலோ எடை தாங்கும் திறன் கொண்டது. பூச்சிகள் அண்டாதவாறு இயற்கை முறையில் புகையிடப்பட்டது.',
      hi: 'सलेम के पारंपरिक कारीगरों द्वारा प्राकृतिक बांस से हाथ से बुनी गई टिकाऊ टोकरी। 20 किलो वजन उठाने की क्षमता और दीमक से सुरक्षित प्राकृतिक फिनिश।'
    },
    shortDesc: 'Eco-friendly handwoven bamboo storage basket for sustainable home décor.',
    keywords: ['Handmade', 'Bamboo Weaving', 'Eco-Friendly', 'Storage Basket', 'Salem Craft', 'Zero Waste'],
    dimensions: '14" Dia x 12" H',
    weight: '650 grams',
    leadTimeDays: 3,
    createdAt: '2026-08-20'
  },
  {
    id: 'prod-002',
    name: 'Heritage Terracotta Floral Planter Urn',
    artisanId: 'art-002',
    artisanName: 'Muthuvelan Potteries',
    location: 'Manamadurai, Tamil Nadu',
    category: 'Garden & Outdoor',
    subCategory: 'Pots & Planters',
    craftType: 'Clay Pottery & Kiln Firing',
    material: 'Riverbed Terracotta Clay',
    color: 'Earthy Burnt Ochre',
    price: 850,
    suggestedPriceMin: 750,
    suggestedPriceMax: 1100,
    availability: 'inStock',
    qualityScore: 92,
    status: 'published',
    views: 620,
    enquiriesCount: 6,
    confidence: {
      name: 95,
      category: 93,
      material: 98,
      craftType: 96,
      overall: 95
    },
    images: {
      front: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80',
      angle: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80',
      processedStudio: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80'
    },
    description: {
      en: 'Crafted from the nutrient-rich alluvial clay of the Vaigai river basin in Manamadurai (GI Tagged). Shaped by hand on traditional potter wheels and wood-fired in country kilns for superior root breathability and thermal stability.',
      ta: 'மானாமதுரை வைகை ஆற்று வண்டல் மண்ணில் கைமுறையாக சக்கரங்களில் சுழற்றி சுடப்பட்ட பாரம்பரிய பூந்தொட்டி. தாவர வேர்களுக்கு இயற்கை காற்றோட்டம் வழங்கும் சிறந்த சுடுமண் கலைப்படைப்பு.',
      hi: 'मानामादुरै की प्रसिद्ध मिट्टी से चाक पर हस्तनिर्मित और भट्ठी में पकाया गया पारंपरिक टेराकोटा गमला।'
    },
    shortDesc: 'GI Tagged Manamadurai clay planter pot for indoor and outdoor gardening.',
    keywords: ['Terracotta', 'Manamadurai Pottery', 'GI Tag', 'Handmade Planter', 'Eco Clay', 'Garden Decor'],
    dimensions: '10" Dia x 11" H',
    weight: '1.8 kg',
    leadTimeDays: 5,
    createdAt: '2026-08-22'
  },
  {
    id: 'prod-003',
    name: 'Hand-Carved Rosewood Royal Elephant Figurine',
    artisanId: 'art-003',
    artisanName: 'Balan Craft Studios',
    location: 'Nagercoil, Tamil Nadu',
    category: 'Art & Collectibles',
    subCategory: 'Wood Sculptures',
    craftType: 'Intricate Wood Carving',
    material: 'Seasoned Indian Rosewood (Sheesham)',
    color: 'Rich Deep Walnut Brown',
    price: 3800,
    suggestedPriceMin: 3200,
    suggestedPriceMax: 4500,
    availability: 'madeToOrder',
    qualityScore: 98,
    status: 'published',
    views: 1210,
    enquiriesCount: 14,
    confidence: {
      name: 99,
      category: 97,
      material: 96,
      craftType: 98,
      overall: 98
    },
    images: {
      front: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      angle: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&auto=format&fit=crop&q=80',
      processedStudio: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
    },
    description: {
      en: 'Sculpted from a single block of mature Indian Rosewood by master temple sculptors. Features traditional howdah tapestry carvings, tusks carved from reclaimed wood, and hand-rubbed beeswax polish.',
      ta: 'ஒற்றை ரோஸ்வுட் மரக்கட்டையில் கைமுறையாக செதுக்கப்பட்ட கம்பீரமான யானை சிற்பம். பழமையான கோவில் சிற்ப வேலைப்பாடுகள் மற்றும் இயற்கை மெழுகு பாலிஷ் கொண்டது.',
      hi: 'एकल शीशम की लकड़ी से तराशी गई भव्य हाथी की मूर्ति, पारंपरिक नक्काशी और प्राकृतिक मोम पॉलिश के साथ।'
    },
    shortDesc: 'Single-block seasoned rosewood elephant sculpture with temple carvings.',
    keywords: ['Rosewood', 'Wood Carving', 'Indian Elephant', 'Handicraft Collectible', 'Temple Art'],
    dimensions: '8" L x 5" W x 7" H',
    weight: '1.2 kg',
    leadTimeDays: 7,
    createdAt: '2026-08-25'
  },
  {
    id: 'prod-004',
    name: 'Pure Zari Handloom Kanchipuram Silk Stole',
    artisanId: 'art-004',
    artisanName: 'Kanchi Handloom Collective',
    location: 'Kanchipuram, Tamil Nadu',
    category: 'Fashion & Apparel',
    subCategory: 'Shawls & Stoles',
    craftType: 'Jacquard Handloom Weaving',
    material: 'Pure Mulberry Silk & Gold Zari',
    color: 'Temple Crimson & Gold',
    price: 5200,
    suggestedPriceMin: 4800,
    suggestedPriceMax: 6500,
    availability: 'inStock',
    qualityScore: 95,
    status: 'published',
    views: 1540,
    enquiriesCount: 18,
    confidence: {
      name: 97,
      category: 98,
      material: 99,
      craftType: 97,
      overall: 98
    },
    images: {
      front: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
      angle: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80',
      detail: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=800&auto=format&fit=crop&q=80',
      processedStudio: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80'
    },
    description: {
      en: 'Woven on pit looms in Kanchipuram using 3-ply twisted mulberry silk yarns and genuine silver zari dipped in pure gold. Embellished with traditional peacock (Mayil) and mango (Paisley) temple motifs.',
      ta: 'காஞ்சிபுரம் தறி நெசவாளர்களால் தூய பட்டு மற்றும் தங்க ஜரிகை கொண்டு நெய்யப்பட்ட ஆடம்பர சால்வை. மயில் மற்றும் மாங்காய் பாரம்பரிய உருவ வேலைப்பாடுகள் கொண்டது.',
      hi: 'कांचीपुरम के पारंपरिक बुनकरों द्वारा शुद्ध रेशम और सोने की ज़री से तैयार किया गया भव्य स्टोल।'
    },
    shortDesc: 'Authentic Kanchipuram silk stole with traditional temple motifs and gold zari border.',
    keywords: ['Kanchipuram Silk', 'Handloom', 'Silk Stole', 'Gold Zari', 'Bridal Wear', 'GI Tag'],
    dimensions: '28" W x 80" L',
    weight: '240 grams',
    leadTimeDays: 4,
    createdAt: '2026-08-28'
  }
];

export const CRAFT_CATEGORIES = [
  { id: 'all', name: 'All Crafts', icon: '✨' },
  { id: 'bamboo', name: 'Bamboo & Cane', icon: '🎋', matchCount: 42 },
  { id: 'pottery', name: 'Clay & Terracotta', icon: '🏺', matchCount: 38 },
  { id: 'wood', name: 'Wood Sculptures', icon: '🪵', matchCount: 56 },
  { id: 'handloom', name: 'Handloom & Textiles', icon: '🧵', matchCount: 64 },
  { id: 'metal', name: 'Brass & Bell Metal', icon: '🔔', matchCount: 29 },
  { id: 'stone', name: 'Stone & Soapstone', icon: '🗿', matchCount: 18 }
];
