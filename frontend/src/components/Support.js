import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Support() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [discountShown, setDiscountShown] = useState(false);
  const messagesEndRef = useRef(null);

  // Show discount on first chat open
  useEffect(() => {
    if (isOpen && messages.length === 0 && !discountShown) {
      const welcomeMessage = {
        id: 1,
        sender: 'ai',
        text: '👋 Welcome to Bolt Bite! How can I help you today?\n\n🔥 **Currently on Discount:**\n- Samosa: 30% off (₹30)\n- Classic Veg Burger: 25% off (₹149)\n- Margherita Pizza: 20% off (₹299)\n- Chicken Biryani: 25% off (₹349)\n\nFeel free to ask me anything about our menu, recommendations, or anything else! 😊'
      };
      setMessages([welcomeMessage]);
      setDiscountShown(true);
    }
  }, [isOpen, messages.length, discountShown]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3005/api/chat', {
        message: input,
        includeDiscounts: input.toLowerCase().includes('discount') || 
                         input.toLowerCase().includes('offer') ||
                         input.toLowerCase().includes('promo') ||
                         input.toLowerCase().includes('sale')
      });

      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: response.data.response
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: '😅 Sorry, I had trouble understanding that. Please try again or ask me about our menu!'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl z-40 hover:scale-110"
        title="Chat with AI"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-screen max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-t-2xl flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Bolt Bite AI Assistant</h3>
              <p className="text-xs opacity-90">Always here to help 🤖</p>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... 💭"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-orange-500 text-white px-4 py-3 rounded-full hover:bg-orange-600 disabled:opacity-50 transition-all font-semibold"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Support;
