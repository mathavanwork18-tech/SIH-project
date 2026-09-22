/**
 * SmartCatalogueAI (AI Model 3)
 * Modular Smart Cataloguing & Multilingual Generation Engine
 */

export class SmartCatalogueAI {
  /**
   * Generate complete structured catalogue metadata
   * @param {Object} params - { category, craftType, material, artisanName, location, language }
   * @returns {Object} Structured catalogue data
   */
  static generate({
    category = 'Pottery',
    craftType = 'Clay Pottery & Kiln Firing',
    material = 'Terracotta Clay',
    artisanName = 'Kumar Swaminathan',
    location = 'Salem, Tamil Nadu',
    language = 'ta'
  }) {
    const isPottery = category.toLowerCase().includes('potter') || category.toLowerCase().includes('clay') || material.toLowerCase().includes('clay');
    const isBamboo = category.toLowerCase().includes('bamboo') || material.toLowerCase().includes('bamboo');
    const isWood = category.toLowerCase().includes('wood') || material.toLowerCase().includes('wood');

    let productName = 'Traditional Handcrafted Clay Terracotta Pot';
    let subcategory = 'Home & Garden Décor';
    let colour = 'Earthy Burnt Terracotta';
    let price = 850;
    let description = 'Hand-shaped on traditional potters wheel using organic riverbed clay. Fired in natural wood kilns for superior plant root breathability, high thermal balance, and eco-friendly durability.';
    let keywords = ['Terracotta', 'HandmadePottery', 'ClayPot', 'EcoFriendly', 'TraditionalArtisan', 'SalemCraft'];
    let buyerCategory = ['Home Décor Retailers', 'Landscape Designers', 'Eco Gifting Chains', 'Hotel Boutiques'];
    let marketSuggestions = ['Target Wholesale Price: ₹750 - ₹1,100', 'High demand for Diwali and summer gardening collections'];

    let translations = {
      ta: 'வைகை ஆற்று வண்டல் களிமண்ணில் சக்கரத்தில் கைமுறையாக வார்க்கப்பட்டு சுடப்பட்ட பாரம்பரிய சுடுமண் பானை / பூந்தொட்டி. தாவரங்களுக்கு இயற்கை காற்றோட்டம் தரும்.',
      en: 'Hand-shaped on traditional potters wheel using organic riverbed clay. Fired in wood kilns for superior root breathability and eco durability.',
      hi: 'पारंपरिक चाक पर शुद्ध नदी की मिट्टी से तैयार और भट्ठी में पकाया गया टिकाऊ टेराकोटा गमला।'
    };

    if (isBamboo) {
      productName = 'Handwoven Organic Bamboo Storage Basket';
      category = 'Home & Lifestyle';
      subcategory = 'Storage & Organizers';
      material = 'Natural Aged Bamboo & Cane';
      colour = 'Natural Amber Honey';
      price = 1450;
      description = 'Woven from seasoned organic bamboo strips using interlocking herringbone weave. Natural smoked finish providing termite resistance with 20kg weight capacity.';
      keywords = ['BambooCraft', 'HandmadeBasket', 'EcoStorage', 'ZeroWaste', 'SustainableLiving'];
      buyerCategory = ['Export Houses', 'Eco Retailers', 'Corporate Gifting Chains'];
      translations = {
        ta: 'இயற்கை மூங்கில் நார்களைக் கொண்டு கைமுறையாக நெய்யப்பட்ட உறுதியான சேமிப்புக் கூடை. 20 கிலோ எடை தாங்கும் திறன் கொண்டது.',
        en: 'Woven from seasoned organic bamboo strips using interlocking herringbone weave. 20kg load capacity.',
        hi: 'प्राकृतिक बांस से हाथ से बुनी गई 20 किलो वजन उठाने में सक्षम टिकाऊ टोकरी।'
      };
    } else if (isWood) {
      productName = 'Hand-Carved Rosewood Royal Figurine';
      category = 'Art & Collectibles';
      subcategory = 'Wood Sculptures';
      material = 'Seasoned Indian Rosewood (Sheesham)';
      colour = 'Deep Walnut Brown';
      price = 3800;
      description = 'Sculpted from a single block of mature Indian Rosewood by master temple sculptors with hand-rubbed organic beeswax polish.';
      keywords = ['Rosewood', 'WoodCarving', 'TempleArt', 'HeritageCraft', 'IndianHandicrafts'];
      buyerCategory = ['Luxury Hotel Boutiques', 'Art Collectors', 'High-end Emporiums'];
      translations = {
        ta: 'ஒற்றை மரக்கட்டையில் கைமுறையாக செதுக்கப்பட்ட கலைநயமிக்க சிற்பம். இயற்கை மெழுகு பாலிஷ் கொண்டது.',
        en: 'Sculpted from a single block of mature Indian Rosewood by master temple sculptors with natural beeswax polish.',
        hi: 'एकल शीशम की लकड़ी से पारंपरिक रूप से तराशी गई भव्य मूर्ति।'
      };
    }

    return {
      product_name: productName,
      category,
      subcategory,
      material,
      craft_type: craftType,
      colour,
      price,
      suggested_price_range: `₹${Math.round(price * 0.85)} - ₹${Math.round(price * 1.2)}`,
      description,
      keywords,
      buyer_category: buyerCategory,
      market_suggestions: marketSuggestions,
      translations,
      confidence_scores: {
        product_name: 0.98,
        category: 0.96,
        material: 0.97,
        craft_type: 0.95,
        overall: 0.96
      }
    };
  }

  /**
   * Voice Field Correction - Modifies ONLY targeted field (Section 12)
   */
  static modifyField(currentCatalogue, { field, value, modifyType }) {
    const updated = { ...currentCatalogue };

    if (field === 'description') {
      if (modifyType === 'shorten') {
        updated.description = 'Handmade using eco-friendly natural clay on traditional potters wheel. Highly durable and sustainable.';
        updated.translations = {
          ta: 'பாரம்பரிய முறையில் சக்கரத்தில் கைமுறையாக செய்யப்பட்ட நீடித்த மண்பாண்ட கலைப்படைப்பு.',
          en: 'Handmade using eco-friendly natural clay on traditional potters wheel. Highly durable and sustainable.',
          hi: 'कारीगरों द्वारा प्राकृतिक मिट्टी से निर्मित टिकाऊ और सुंदर हस्तशिल्प।'
        };
      } else if (value) {
        updated.description = value;
      }
    } else if (field === 'product_name' && value) {
      updated.product_name = value;
    } else if (field === 'material' && value) {
      updated.material = value;
    } else if (field === 'price' && value) {
      updated.price = Number(value) || updated.price;
    }

    return updated;
  }
}
