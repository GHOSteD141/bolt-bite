const { GoogleGenerativeAI } = require('@google/generative-ai');
const cmsAgent = require('./cmsAgent');

/**
 * Support Agent - Customer Facing
 * Handles customer interactions using Gemini API with menu context
 */
class SupportAgent {
  constructor(apiKey) {
    if (!apiKey) {
      console.warn('⚠️ Gemini API key not provided. Using fallback responses.');
      this.geminiEnabled = false;
    } else {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        // Use gemini-2.0-flash (latest available model)
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        this.geminiEnabled = true;
        console.log('✅ Gemini Support Agent initialized with gemini-2.0-flash');
      } catch (err) {
        console.error('❌ Failed to initialize Gemini:', err.message);
        this.geminiEnabled = false;
      }
    }
    this.responseCache = new Map();
    this.cacheMaxAge = 30 * 60 * 1000; // 30 minutes
  }

  /**
   * Main response generation method
   * @param {string} userMessage - User's message
   * @param {boolean} includeDiscounts - Whether to include discounts in the response
   * @returns {Object} AI-generated response with context
   */
  async generateResponse(userMessage, includeDiscounts = false) {
    // Check cache first
    const cacheKey = userMessage.toLowerCase();
    const cached = this.responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheMaxAge) {
      console.log('📦 Returning cached response');
      return cached.response;
    }

    try {
      if (!this.geminiEnabled) {
        console.log('⚠️ Gemini disabled, using fallback response');
        return this.getFallbackResponse(userMessage, includeDiscounts);
      }

      const menuData = cmsAgent.getFullMenu();
      const discountedItems = cmsAgent.getDiscountedItems();
      
      const systemPrompt = this.constructGeminiPrompt(menuData, discountedItems, userMessage, includeDiscounts);
      
      console.log('🚀 Sending request to Gemini API...');
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();

      // Cache the response
      this.responseCache.set(cacheKey, {
        response: text,
        timestamp: Date.now()
      });

      console.log('✅ Gemini response received');
      return text;
    } catch (error) {
      console.error('❌ Gemini API error:', error.message);
      console.log('🔄 Falling back to hardcoded response');
      return this.getFallbackResponse(userMessage, includeDiscounts);
    }
  }

  /**
   * Construct context-aware prompt for Gemini
   * @param {Object} menuData - Menu data from CMS Agent
   * @param {Object} discountedItems - Discounted items data from CMS Agent
   * @param {string} userMessage - User's message
   * @param {boolean} includeDiscounts - Whether to include discounts in the prompt
   * @returns {string} Complete prompt for Gemini
   */
  constructGeminiPrompt(menuData, discountedItems, userMessage, includeDiscounts) {
    let discountSection = '';
    if (includeDiscounts) {
      discountSection = `

Current Discounts (HIGHLIGHT THESE AGGRESSIVELY):
${discountedItems.items.map(item => `- ${item.name}: 🔥 ${item.discount_amount} (₹${item.price})`).join('\n')}`;
    }

    const systemInstruction = `You are a friendly and helpful AI assistant for Bolt Bite food delivery service. You can answer:
1. Questions about our food menu and recommendations
2. General questions about food, cooking, health, etc.
3. Delivery-related inquiries
4. Any casual conversation topics

Your personality: Friendly, helpful, concise, and enthusiastic about food! Use emojis appropriately.

IMPORTANT: Only mention discounts if the user specifically asks about them OR if includeDiscounts is true.
Keep responses under 150 words to maintain a clean chat.

Menu Data Available:
${JSON.stringify(menuData, null, 2)}${discountSection}

User Message: ${userMessage}

Provide helpful, friendly responses. If they ask about food recommendations, suggest from our menu.`;

    return systemInstruction;
  }

  /**
   * Generate fallback response when AI is unavailable
   * @param {string} userMessage - User's message
   * @param {boolean} includeDiscounts - Whether to include discounts in the fallback response
   * @returns {string} Basic response without AI
   */
  getFallbackResponse(userMessage, includeDiscounts = false) {
    const menuSummary = cmsAgent.getMenuSummary();
    const discountedItems = cmsAgent.getDiscountedItems();
    const lowerMessage = userMessage.toLowerCase();

    // Handle discount requests
    if (includeDiscounts || lowerMessage.includes('discount')) {
      return `🔥 **Current Hot Deals:**\n${discountedItems.items.slice(0, 5).map(item => 
        `- ${item.name}: ${item.discount_amount} (₹${item.price})`).join('\n')}\n\nDon't miss out! 🎉`;
    }

    // Handle menu/recommendation questions
    if (lowerMessage.includes('menu') || lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return `We have amazing options across ${menuSummary.categories.length} categories!\n\n${menuSummary.categories.slice(0, 3).map(cat => `🍽️ ${cat}`).join('\n')}\n\nWhat sounds good to you? 😋`;
    }

    // Handle general food questions
    if (lowerMessage.includes('pizza') || lowerMessage.includes('burger') || lowerMessage.includes('food')) {
      return `Delicious choice! 🍕 We have amazing pizzas and burgers. What would you like to know more about?`;
    }

    // Default friendly response
    return `Hey there! 👋 I'm here to help. You can ask me about:\n- Our menu & recommendations\n- Food suggestions\n- General questions\n- Anything else!\n\nWhat can I help with? 😊`;
  }
}

module.exports = SupportAgent;