const { GoogleGenerativeAI } = require('@google/generative-ai');
const CMSAgent = require('./cmsAgent');
require('dotenv').config();

/**
 * Support Agent - Customer Facing
 * Handles customer interactions using Gemini API with menu context
 */
class SupportAgent {
  constructor() {
    // Initialize Gemini API
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.cmsAgent = new CMSAgent();
    this.systemPrompt = this.getSystemPrompt();
    this.lastMenuConsultation = null;
    this.conversationHistory = [];
  }

  /**
   * Main response generation method
   * @param {string} userMessage - User's message
   * @param {string} sessionId - Optional session identifier
   * @returns {Object} AI-generated response with context
   */
  async generateResponse(userMessage, sessionId = null) {
    try {
      // Consult CMS Agent first to get current menu and discount data
      const menuData = this.consultCMSAgent();

      // Construct Gemini prompt with menu context
      const prompt = this.constructGeminiPrompt(menuData, userMessage);

      // Generate response from Gemini
      const geminiResponse = await this.model.generateContent(prompt);
      const aiResponse = geminiResponse.response.text();

      // Parse and format the AI response
      const formattedResponse = this.parseGeminiResponse(aiResponse, menuData);

      // Update conversation history
      this.updateConversationHistory(userMessage, formattedResponse, sessionId);

      return {
        success: true,
        response: formattedResponse.text,
        menuContext: {
          discountedItems: menuData.discountedItems?.items || [],
          hasDiscounts: menuData.discountedItems?.count > 0,
          categories: menuData.fullMenu?.categories || [],
          totalItems: menuData.fullMenu?.itemCount || 0
        },
        suggestions: formattedResponse.suggestions || [],
        pairings: formattedResponse.pairings || [],
        timestamp: new Date().toISOString(),
        sessionId
      };

    } catch (error) {
      console.error('Support Agent Error:', error);
      return this.handleError(error, userMessage);
    }
  }

  /**
   * Consult CMS Agent to get current menu and discount data
   * @returns {Object} Complete menu context from CMS Agent
   */
  consultCMSAgent() {
    try {
      const menuData = this.cmsAgent.getFullMenu();
      const discountedItems = this.cmsAgent.getDiscountedItems();
      const stats = this.cmsAgent.getMenuStats();

      this.lastMenuConsultation = {
        menuData,
        discountedItems,
        stats,
        timestamp: new Date().toISOString()
      };

      return this.lastMenuConsultation;
    } catch (error) {
      console.error('CMS Agent consultation failed:', error);
      return this.getFallbackMenuData();
    }
  }

  /**
   * Construct context-aware prompt for Gemini
   * @param {Object} menuData - Menu data from CMS Agent
   * @param {string} userMessage - User's message
   * @returns {string} Complete prompt for Gemini
   */
  constructGeminiPrompt(menuData, userMessage) {
    const hasDiscounts = menuData.discountedItems?.count > 0;
    const discountHighlights = hasDiscounts ?
      menuData.discountedItems.items.map(item =>
        `- ${item.name}: ${item.discount_amount} (₹${item.price} instead of ₹${item.originalPrice})`
      ).join('\n') : 'No items currently on discount.';

    return `${this.systemPrompt}

CURRENT MENU DATA:
${JSON.stringify(menuData.fullMenu?.menu || {}, null, 2)}

CURRENT DISCOUNTED ITEMS (${menuData.discountedItems?.count || 0} items):
${discountHighlights}

MENU STATISTICS:
- Total Items: ${menuData.stats?.stats?.totalItems || 0}
- Categories: ${menuData.fullMenu?.categories?.join(', ') || 'N/A'}
- Discounted Items: ${menuData.discountedItems?.count || 0}

USER QUESTION: ${userMessage}

RESPONSE GUIDELINES:
1. Be conversational and helpful
2. ${hasDiscounts ? 'AGGRESSIVELY highlight discounted items - they are priority!' : 'Mention any current promotions if available'}
3. If user asks about specific items, provide details and pairings
4. Always include price information for mentioned items
5. If user asks for recommendations, suggest 2-3 items with reasoning
6. Keep responses under 200 words unless asking for more details
7. End with a friendly question to continue conversation

Remember: You are a food expert who knows this menu perfectly!`;
  }

  /**
   * Parse and format Gemini response
   * @param {string} aiResponse - Raw response from Gemini
   * @param {Object} menuData - Menu context data
   * @returns {Object} Formatted response with extracted suggestions
   */
  parseGeminiResponse(aiResponse, menuData) {
    const response = {
      text: aiResponse,
      suggestions: [],
      pairings: []
    };

    // Extract mentioned items for suggestions
    const mentionedItems = this.extractMentionedItems(aiResponse, menuData);
    if (mentionedItems.length > 0) {
      response.suggestions = mentionedItems.slice(0, 3);
    }

    // Look for pairing suggestions in response
    const pairings = this.extractPairingSuggestions(aiResponse, menuData);
    if (pairings.length > 0) {
      response.pairings = pairings.slice(0, 2);
    }

    return response;
  }

  /**
   * Extract menu items mentioned in the response
   * @param {string} text - Response text
   * @param {Object} menuData - Menu data
   * @returns {Array} Array of mentioned menu items with details
   */
  extractMentionedItems(text, menuData) {
    const mentioned = [];
    const allItems = Object.values(menuData.fullMenu?.menu || {}).flat();

    allItems.forEach(item => {
      if (text.toLowerCase().includes(item.name.toLowerCase())) {
        mentioned.push({
          name: item.name,
          price: item.price,
          discount_amount: item.discount_amount,
          discount_percentage: this.extractDiscountPercentage(item.discount_amount),
          category: item.category,
          isVeg: item.isVeg,
          flavor_profile: item.flavor_profile
        });
      }
    });

    return mentioned;
  }

  /**
   * Extract pairing suggestions from response
   * @param {string} text - Response text
   * @param {Object} menuData - Menu data
   * @returns {Array} Array of pairing suggestions
   */
  extractPairingSuggestions(text, menuData) {
    const pairings = [];
    const allItems = Object.values(menuData.fullMenu?.menu || {}).flat();
    const pairingKeywords = ['pairs well with', 'goes well with', 'perfect with', 'recommended with'];

    pairingKeywords.forEach(keyword => {
      const index = text.toLowerCase().indexOf(keyword);
      if (index !== -1) {
        const textAfterKeyword = text.substring(index + keyword.length).trim();
        const itemName = textAfterKeyword.split(',')[0].split('.')[0].trim();

        const item = allItems.find(i =>
          i.name.toLowerCase().includes(itemName.toLowerCase()) ||
          itemName.toLowerCase().includes(i.name.toLowerCase())
        );

        if (item && !pairings.find(p => p.item.name === item.name)) {
          pairings.push({
            item: {
              name: item.name,
              price: item.price,
              discount_amount: item.discount_amount,
              discount_percentage: this.extractDiscountPercentage(item.discount_amount),
              category: item.category
            },
            reason: keyword + ' ' + itemName,
            discountHighlight: item.is_discounted ? `🔥 ${item.discount_amount} OFF!` : null
          });
        }
      }
    });

    return pairings;
  }

  /**
   * Handle errors gracefully with fallback responses
   * @param {Error} error - The error that occurred
   * @param {string} userMessage - Original user message
   * @returns {Object} Error response with fallback
   */
  handleError(error, userMessage) {
    // Try to provide basic menu info even if AI fails
    const menuData = this.lastMenuConsultation || this.getFallbackMenuData();

    return {
      success: false,
      error: "AI service temporarily unavailable",
      fallbackResponse: this.generateFallbackResponse(userMessage, menuData),
      menuContext: {
        discountedItems: menuData.discountedItems?.items || [],
        hasDiscounts: menuData.discountedItems?.count > 0,
        categories: menuData.fullMenu?.categories || [],
        totalItems: menuData.fullMenu?.itemCount || 0
      },
      timestamp: new Date().toISOString(),
      retry: true
    };
  }

  /**
   * Generate fallback response when AI is unavailable
   * @param {string} userMessage - User's message
   * @param {Object} menuData - Menu data
   * @returns {string} Basic response without AI
   */
  generateFallbackResponse(userMessage, menuData) {
    const hasDiscounts = menuData.discountedItems?.count > 0;
    const categories = menuData.fullMenu?.categories?.join(', ') || 'various cuisines';

    if (userMessage.toLowerCase().includes('what') && userMessage.toLowerCase().includes('good')) {
      let response = `We have ${categories} available at BoltBite! `;

      if (hasDiscounts) {
        response += `Currently, we have ${menuData.discountedItems.count} items on special discount, including `;
        response += menuData.discountedItems.items.slice(0, 3).map(item =>
          `${item.name} with ${item.discount_amount} off`
        ).join(' and ');
        response += '. ';
      }

      response += 'Would you like to hear more about any specific dish or category?';
      return response;
    }

    if (userMessage.toLowerCase().includes('discount')) {
      if (hasDiscounts) {
        return `Great news! We currently have ${menuData.discountedItems.count} discounted items. Some highlights include: ${menuData.discountedItems.items.slice(0, 2).map(item => `${item.name} (${item.discount_amount} off)`).join(' and ')}. Which one interests you?`;
      } else {
        return "We don't have any special discounts running at the moment, but we do have great value options in every category. What type of cuisine are you interested in?";
      }
    }

    return "I'm currently experiencing technical difficulties, but I'd be happy to help! We serve a variety of cuisines. What type of food are you interested in today?";
  }

  /**
   * Get system prompt for Gemini
   * @returns {string} System instruction for AI
   */
  getSystemPrompt() {
    return `You are a helpful food concierge working for BoltBite. You have access to the current menu below. Your goal is to:

1. Tell the user what is currently available
2. AGGRESSIVELY highlight items that are on discount - these are priority promotions!
3. Recommend Pairings: If a user picks a main dish, analyze its 'flavor_profile' and suggest a drink or side from the menu that pairs well with it

IMPORTANT INSTRUCTIONS:
- When you mention discounted items, show both original and discounted prices
- Use enthusiastic language for promotions ("🔥 20% OFF!", "Amazing deal!")
- For pairings, explain WHY they work together (e.g., "Cool lassi balances spicy curry perfectly")
- Always be friendly, conversational, and helpful
- If you don't know something, say so honestly and offer alternatives
- Focus on user preferences and dietary requirements

Flavor pairing guidelines:
- Spicy dishes → creamy drinks (lassi, cold coffee) or tangy items (fresh lime soda)
- Rich/heavy dishes → light desserts or refreshing beverages
- Savory items → complementary flavors (sweet, tangy, or contrasting textures)
- Mild dishes → can be paired with bolder flavors

You are representing BoltBite - be professional but enthusiastic about the food!`;
  }

  /**
   * Update conversation history
   * @param {string} userMessage - User's message
   * @param {Object} response - Generated response
   * @param {string} sessionId - Session identifier
   */
  updateConversationHistory(userMessage, response, sessionId) {
    const entry = {
      sessionId: sessionId || 'default',
      timestamp: new Date().toISOString(),
      userMessage,
      response: response.text,
      hasDiscounts: response.menuContext?.hasDiscounts || false,
      itemsMentioned: response.suggestions?.map(s => s.name) || []
    };

    this.conversationHistory.push(entry);

    // Keep only last 20 entries per session
    if (this.conversationHistory.length > 100) {
      this.conversationHistory = this.conversationHistory.slice(-100);
    }
  }

  /**
   * Get conversation history for a session
   * @param {string} sessionId - Session identifier
   * @returns {Array} Conversation history
   */
  getConversationHistory(sessionId = 'default') {
    return this.conversationHistory.filter(entry => entry.sessionId === sessionId);
  }

  /**
   * Get fallback menu data when CMS Agent fails
   * @returns {Object} Basic menu structure
   */
  getFallbackMenuData() {
    return {
      fullMenu: {
        categories: ['Italian', 'Chinese', 'Indian', 'American', 'International'],
        itemCount: 0,
        menu: {}
      },
      discountedItems: {
        count: 0,
        items: []
      },
      stats: {
        stats: {
          totalItems: 0
        }
      }
    };
  }

  /**
   * Extract discount percentage from discount amount string
   * @param {string} discountAmount - Discount amount string
   * @returns {number} Percentage value
   */
  extractDiscountPercentage(discountAmount) {
    if (!discountAmount) return 0;
    const percentageMatch = discountAmount.match(/(\d+)%/);
    return percentageMatch ? parseInt(percentageMatch[1]) : 0;
  }

  /**
   * Get recommendations for a specific item
   * @param {string} itemName - Name of the item
   * @returns {Object} Recommendations with pairings
   */
  async getItemRecommendations(itemName) {
    try {
      const item = this.cmsAgent.getItemByName(itemName);

      if (!item.success) {
        return {
          success: false,
          error: item.error,
          suggestions: item.suggestions
        };
      }

      const pairings = this.cmsAgent.getPairingSuggestions(item.item);

      return {
        success: true,
        item: item.item,
        recommendations: pairings.recommendations,
        count: pairings.count,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Get item recommendations error:', error);
      return {
        success: false,
        error: "Unable to get recommendations at this time",
        retry: true
      };
    }
  }

  /**
   * Check if Gemini service is available
   * @returns {boolean} Service availability status
   */
  async checkServiceAvailability() {
    try {
      const testPrompt = "Hello";
      const result = await this.model.generateContent(testPrompt);
      return result && result.response;
    } catch (error) {
      console.error('Gemini service unavailable:', error);
      return false;
    }
  }
}

module.exports = SupportAgent;