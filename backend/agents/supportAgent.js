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
   * @param {string} sessionId - Optional session identifier
   * @returns {Object} AI-generated response with context
   */
  async generateResponse(userMessage, sessionId = null) {
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
        return this.getFallbackResponse(userMessage);
      }

      const menuData = cmsAgent.getFullMenu();
      const discountedItems = cmsAgent.getDiscountedItems();
      
      const systemPrompt = this.constructGeminiPrompt(menuData, discountedItems, userMessage);
      
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
      return this.getFallbackResponse(userMessage);
    }
  }

  /**
   * Construct context-aware prompt for Gemini
   * @param {Object} menuData - Menu data from CMS Agent
   * @param {Object} discountedItems - Discounted items data from CMS Agent
   * @param {string} userMessage - User's message
   * @returns {string} Complete prompt for Gemini
   */
  constructGeminiPrompt(menuData, discountedItems, userMessage) {
    const systemInstruction = `You are a helpful food concierge for BoltBite food delivery service. Your role is to:
1. Help customers find delicious food from our menu
2. AGGRESSIVELY highlight discounted items (use 🔥 emoji and bold formatting)
3. Make smart pairing suggestions based on flavor profiles
4. Be friendly and enthusiastic about our offers
5. Keep responses concise but helpful (under 150 words)

Current Menu Data:
${JSON.stringify(menuData, null, 2)}

Discounted Items (HIGHLIGHT THESE):
${discountedItems.items.map(item => `- ${item.name}: 🔥 ${item.discount_amount} (₹${item.price})`).join('\n')}

Customer Message: ${userMessage}

Please provide a helpful response that aggressively highlights discounts and makes smart pairing suggestions.`;

    return systemInstruction;
  }

  /**
   * Generate fallback response when AI is unavailable
   * @param {string} userMessage - User's message
   * @returns {string} Basic response without AI
   */
  getFallbackResponse(userMessage) {
    const menuSummary = cmsAgent.getMenuSummary();
    const discountedItems = cmsAgent.getDiscountedItems();

    let response = "Hello! 👋 I'm your BoltBite food concierge. ";

    if (userMessage.toLowerCase().includes('discount') || userMessage.toLowerCase().includes('offer')) {
      response += `\n\n🔥 **HOT DEALS RIGHT NOW:** We have ${discountedItems.count} items on discount!\n`;
      discountedItems.items.slice(0, 5).forEach(item => {
        response += `\n- **${item.name}** - 🔥 ${item.discount_amount}\n  Originally ₹${item.price}\n`;
      });
    } else if (userMessage.toLowerCase().includes('menu')) {
      response += `\n\nWe have **${menuSummary.totalItems}** amazing dishes across these categories:\n`;
      menuSummary.categories.forEach(cat => {
        response += `- ${cat}\n`;
      });
      response += `\n🔥 **${discountedItems.count} items currently on discount!**`;
    } else {
      response += `\n\nWhat would you like to explore?\n- Browse our menu\n- Check out discounted items\n- Get pairing suggestions\n\n🔥 **Don't miss:** We have ${discountedItems.count} amazing deals running right now!`;
    }

    return response;
  }
}

module.exports = SupportAgent;