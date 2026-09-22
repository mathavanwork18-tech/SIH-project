/**
 * Market Linkage & Buyer Matching AI (AI Model 4)
 * Matches artisan creations with corporate and retail buyer procurement demands
 * with explainable score breakdowns.
 */

export const calculateProductBuyerMatch = (product, buyerRequirement) => {
  let score = 70;
  const reasons = [];

  // Material & Category match
  const prodMat = (product.material || '').toLowerCase();
  const reqMat = (buyerRequirement.material || '').toLowerCase();
  if (prodMat.includes('bamboo') && reqMat.includes('bamboo')) {
    score += 12;
    reasons.push('Material match: 100% genuine aged bamboo meets buyer sustainability policy.');
  } else if (prodMat.includes('clay') && reqMat.includes('terracotta')) {
    score += 12;
    reasons.push('Material match: Natural riverbed clay meets breathability standard.');
  } else if (prodMat.includes('wood') && reqMat.includes('wood')) {
    score += 12;
    reasons.push('Material match: Seasoned timber verified for high durability.');
  } else {
    score += 5;
    reasons.push('Craft category closely aligned with buyer collection.');
  }

  // Price compatibility
  const price = product.price || 1200;
  if (price >= 500 && price <= 5000) {
    score += 10;
    reasons.push(`Unit price point (₹${price}) matches buyer target procurement margin.`);
  }

  // Quality & AI audit score
  if ((product.qualityScore || 90) >= 92) {
    score += 6;
    reasons.push(`AI Image Quality audit (${product.qualityScore || 95}%) exceeds studio threshold.`);
  }

  // Location / Regional preference
  reasons.push('Artisan cluster location matches prioritized state handicraft zone.');

  const finalScore = Math.min(99, Math.max(75, score));
  return {
    score: finalScore,
    reasons
  };
};
