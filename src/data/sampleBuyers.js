export const SAMPLE_BUYERS = [
  {
    id: 'buyer-001',
    name: 'FabIndia Sustainable Sourcing',
    contactPerson: 'Ananya Sharma',
    type: 'Retail Chain / Export House',
    location: 'Bangalore & Chennai',
    verified: true,
    rating: 4.9,
    requirements: [
      {
        reqId: 'req-101',
        title: 'Bulk Handwoven Bamboo Storage & Hampers',
        category: 'Home & Lifestyle',
        material: 'Bamboo / Cane',
        targetQuantity: 800,
        budgetPerUnit: '₹1,200 - ₹1,500',
        deliveryTimeline: 'Within 30 days',
        preferredRegions: ['Tamil Nadu', 'Assam', 'Kerala'],
        description: 'Seeking eco-friendly festive gifting baskets with sturdy handles and natural finish for our upcoming Diwali collections.'
      }
    ],
    matchedProducts: [
      {
        productId: 'prod-001',
        score: 96,
        reasons: [
          'Bamboo & Cane material precisely matches procurement criteria',
          'Price point (₹1,450) is well within target budget (₹1,200 - ₹1,500)',
          'Artisan location (Salem, TN) matches prioritized regional cluster',
          'Capacity and quality score (96%) verified by AI image audit'
        ]
      }
    ]
  },
  {
    id: 'buyer-002',
    name: 'Urban Living Heritage Décor',
    contactPerson: 'Vikram Mehra',
    type: 'Boutique Interior Firm',
    location: 'Mumbai & Pune',
    verified: true,
    rating: 4.8,
    requirements: [
      {
        reqId: 'req-102',
        title: 'Artisanal Clay & Terracotta Planters for Luxury Villa Project',
        category: 'Garden & Outdoor',
        material: 'Terracotta Clay',
        targetQuantity: 250,
        budgetPerUnit: '₹700 - ₹1,000',
        deliveryTimeline: 'Within 45 days',
        preferredRegions: ['Tamil Nadu', 'West Bengal'],
        description: 'Need authentic handcrafted terracotta planters with breathability for landscaping in luxury residential resort.'
      }
    ],
    matchedProducts: [
      {
        productId: 'prod-002',
        score: 93,
        reasons: [
          'Riverbed terracotta clay meets porous breathable pot specification',
          'Unit pricing (₹850) is optimal for 250-piece bulk procurement',
          'GI-tagged Manamadurai heritage authenticity verification',
          'Eco-friendly kiln firing certified'
        ]
      }
    ]
  },
  {
    id: 'buyer-003',
    name: 'Taj Khazana Artisanal Collection',
    contactPerson: 'Pooja Iyer',
    type: 'Luxury Hotel Boutique',
    location: 'Chennai, Kochi, Delhi',
    verified: true,
    rating: 5.0,
    requirements: [
      {
        reqId: 'req-103',
        title: 'Master-Crafted Temple Wood Sculptures & Artifacts',
        category: 'Art & Collectibles',
        material: 'Rosewood / Teakwood',
        targetQuantity: 50,
        budgetPerUnit: '₹3,500 - ₹4,800',
        deliveryTimeline: 'Within 20 days',
        preferredRegions: ['Tamil Nadu', 'Kerala', 'Karnataka'],
        description: 'Exquisite single-block temple carved wooden elephants, deities, and panels for hotel gift emporiums.'
      }
    ],
    matchedProducts: [
      {
        productId: 'prod-003',
        score: 98,
        reasons: [
          'Single-block seasoned rosewood matches luxury standard',
          'Master sculptor temple carving technique verified by AI image analysis',
          'Price point (₹3,800) fits well within ₹3,500 - ₹4,800 boutique margin',
          'High demand collectible category'
        ]
      }
    ]
  }
];

export const SAMPLE_ENQUIRIES = [
  {
    id: 'enq-001',
    productId: 'prod-001',
    productName: 'Traditional Handmade Bamboo Storage Basket',
    productImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
    buyerId: 'buyer-001',
    buyerName: 'FabIndia Sustainable Sourcing',
    artisanId: 'art-001',
    date: 'Today, 11:30 AM',
    status: 'negotiating', // unread | negotiating | accepted | completed
    unread: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'buyer',
        senderName: 'FabIndia Sourcing (Ananya)',
        text: 'Vanakkam Kumar! We loved your handmade bamboo storage baskets. We are looking for an initial bulk order of 200 units for our festival collection. Can you fulfill this in 25 days?',
        audioUrl: null,
        timestamp: '11:30 AM'
      },
      {
        id: 'msg-2',
        sender: 'artisan',
        senderName: 'Kumar Swaminathan',
        text: 'Vanakkam Madam! Yes, my village artisan group can produce 250 units in 20 days with superior herringbone weave. We can offer ₹1,350 per unit for bulk.',
        audioUrl: 'voice-note-demo',
        timestamp: '11:42 AM'
      },
      {
        id: 'msg-3',
        sender: 'buyer',
        senderName: 'FabIndia Sourcing (Ananya)',
        text: 'That sounds wonderful! Could you share a quick sample confirmation or customized tag option?',
        audioUrl: null,
        timestamp: '12:05 PM'
      }
    ]
  },
  {
    id: 'enq-002',
    productId: 'prod-003',
    productName: 'Hand-Carved Rosewood Royal Elephant Figurine',
    productImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    buyerId: 'buyer-003',
    buyerName: 'Taj Khazana Artisanal Collection',
    artisanId: 'art-003',
    date: 'Yesterday',
    status: 'unread',
    unread: true,
    messages: [
      {
        id: 'msg-4',
        sender: 'buyer',
        senderName: 'Taj Khazana (Pooja)',
        text: 'Hello Balan! We would like to order 15 pieces of the Rosewood Elephant for our Chennai and Kochi luxury boutiques. Please let us know the delivery schedule.',
        audioUrl: null,
        timestamp: 'Yesterday, 4:15 PM'
      }
    ]
  }
];
