import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PRODUCTS } from '../data/sampleProducts';
import { SAMPLE_BUYERS, SAMPLE_ENQUIRIES } from '../data/sampleBuyers';

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('artisan'); // 'artisan' | 'buyer' | 'admin'
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'dashboard', 'registration', 'camera', 'imageAi', 'catalogAi', 'catalogue', 'matches', 'enquiries', 'profile', 'buyerExplore', 'buyerRequests', 'admin'


  // Artisan profile state (Tailored for Thiru)
  const [artisanProfile, setArtisanProfile] = useState(() => {
    const saved = localStorage.getItem('artisan_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) return parsed;
      } catch (e) {}
    }
    return {
      name: 'Thiru (Thirumurugan)',
      location: 'Salem / Madurai, Tamil Nadu',
      craft: 'Bamboo & Terracotta Handicrafts',
      experience: '15 Years',
      phone: '+91 98421 78901',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      artisanId: 'art-001',
      joinedDate: 'August 2024'
    };
  });

  // Product Inventory
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('artisan_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SAMPLE_PRODUCTS;
  });

  // Active Creation Draft
  const [workingDraft, setWorkingDraft] = useState({
    images: {
      front: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&auto=format&fit=crop&q=80',
      angle: null,
      detail: null,
      processedStudio: null
    },
    imageAnalysis: null,
    catalog: null
  });

  // Buyers & Enquiries
  const [buyers, setBuyers] = useState(SAMPLE_BUYERS);
  const [enquiries, setEnquiries] = useState(SAMPLE_ENQUIRIES);
  const [activeEnquiryId, setActiveEnquiryId] = useState('enq-001');

  // AI Inference Audit Logs
  const [aiLogs, setAiLogs] = useState([
    {
      id: 'log-1',
      timestamp: 'Today, 11:45 AM',
      model: 'AI Model 1 (Voice NLU)',
      action: 'Voice Intent Extraction',
      input: '“நான் ஒரு product post போடணும்”',
      output: 'NAV_POST_PRODUCT (Page: Camera)',
      confidence: '99%'
    },
    {
      id: 'log-2',
      timestamp: 'Today, 11:46 AM',
      model: 'AI Model 2 (Image Intelligence)',
      action: 'Blur & Lighting Assessment',
      input: 'bamboo_basket_front.jpg (1200x1200px)',
      output: 'Sharpness: 94%, Lighting: Balanced, Object: Handwoven Basket',
      confidence: '96%'
    },
    {
      id: 'log-3',
      timestamp: 'Today, 11:48 AM',
      model: 'AI Model 3 (Smart Cataloguing)',
      action: 'Multilingual Metadata Generation',
      input: 'Craft: Bamboo & Cane + Image Feature Vector',
      output: 'Title, 8-Language Descriptions, Fair Price ₹1,450',
      confidence: '96%'
    },
    {
      id: 'log-4',
      timestamp: 'Today, 11:50 AM',
      model: 'AI Model 4 (Market Linkage)',
      action: 'Buyer Demand Match',
      input: 'Product prod-001 vs FabIndia Req-101',
      output: 'Match Score: 96% (Material, Budget & Regional cluster aligned)',
      confidence: '95%'
    }
  ]);

  // Accessibility Scaling
  const [fontSizeScale, setFontSizeScale] = useState('normal'); // 'normal' | 'large' | 'extra-large'
  const [isOffline, setIsOffline] = useState(false);
  const [offlineDraftCount, setOfflineDraftCount] = useState(0);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('artisan_profile', JSON.stringify(artisanProfile));
  }, [artisanProfile]);

  useEffect(() => {
    localStorage.setItem('artisan_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
    addAiLog({
      model: 'AI Model 3 (Smart Cataloguing)',
      action: 'Published to Master Catalogue',
      input: newProd.name,
      output: `Catalog ID: ${newProd.id}`,
      confidence: '98%'
    });
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addAiLog = ({ model, action, input, output, confidence }) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      model,
      action,
      input,
      output,
      confidence
    };
    setAiLogs(prev => [newLog, ...prev]);
  };

  const addBuyerRequirement = (newReq) => {
    setBuyers(prev => [
      {
        id: `buyer-${Date.now()}`,
        name: 'New Corporate Procurement',
        contactPerson: 'Procurement Desk',
        type: 'Retailer / Bulk Buyer',
        location: 'Pan-India',
        verified: true,
        rating: 4.9,
        requirements: [newReq],
        matchedProducts: []
      },
      ...prev
    ]);
  };

  const sendEnquiryMessage = (enquiryId, messageObj) => {
    setEnquiries(prev => prev.map(enq => {
      if (enq.id === enquiryId) {
        return {
          ...enq,
          messages: [...enq.messages, messageObj],
          unread: false
        };
      }
      return enq;
    }));
  };

  const createNewEnquiry = (product, buyer, initialText) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.images?.front || product.images?.processedStudio,
      buyerId: buyer?.id || 'buyer-guest',
      buyerName: buyer?.name || 'Verified Retail Partner',
      artisanId: product.artisanId || 'art-001',
      date: 'Just now',
      status: 'unread',
      unread: true,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'buyer',
          senderName: buyer?.name || 'Retail Partner',
          text: initialText,
          audioUrl: null,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setEnquiries(prev => [newEnq, ...prev]);
    setActiveEnquiryId(newEnq.id);
  };

  return (
    <AppDataContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentPage,
        setCurrentPage,
        artisanProfile,
        setArtisanProfile,
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        workingDraft,
        setWorkingDraft,
        buyers,
        addBuyerRequirement,
        enquiries,
        activeEnquiryId,
        setActiveEnquiryId,
        sendEnquiryMessage,
        createNewEnquiry,
        aiLogs,
        addAiLog,
        fontSizeScale,
        setFontSizeScale,
        isOffline,
        setIsOffline,
        offlineDraftCount,
        setOfflineDraftCount
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
