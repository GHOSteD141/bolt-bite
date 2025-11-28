import React, { useState, useRef, useEffect } from 'react';
import './ChatModal.css';

const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionId, setSessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [menuContext, setMenuContext] = useState(null);
  const [quickReplies, setQuickReplies] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    // authenticate when modal opens (inline to avoid missing-hook-deps warning)
    if (!isOpen || isAuthenticated) return;
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const resp = await fetch('http://localhost:3005/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: 'login',
            username: 'admin',
            password: 'admin123'
          })
        });

        if (cancelled) return;

        if (resp.ok) {
          // add auth success message directly to messages state (no external fn dependency)
          setMessages(prev => [...prev, { text: 'Authentication successful! How can I help you?', sender: 'agent', timestamp: Date.now() }]);
          setIsAuthenticated(true);
        } else {
          setMessages(prev => [...prev, { text: 'Authentication failed — continuing in limited mode.', sender: 'agent', timestamp: Date.now() }]);
        }
      } catch (err) {
        console.error('Auth error:', err);
        setMessages(prev => [...prev, { text: 'Agent unavailable. Please try again later.', sender: 'agent', timestamp: Date.now() }]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [isOpen, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    appendMessage(userMessage, 'user');

    try {
      const response = await fetch('http://localhost:3005/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId
        })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Update menu context if provided
      if (data.menuContext) {
        setMenuContext(data.menuContext);
      }

      // Add main AI response
      appendMessage(data.response || 'No response', 'agent', 'text', data);

      // Handle discount highlights
      if (data.menuContext?.discountedItems?.length > 0) {
        data.menuContext.discountedItems.slice(0, 3).forEach(item => {
          setTimeout(() => appendDiscountHighlight(item), 500);
        });
      }

      // Handle pairing suggestions
      if (data.pairings && data.pairings.length > 0) {
        setTimeout(() => appendPairingSuggestion(
          data.suggestions?.[0] || { name: 'your dish' },
          data.pairings
        ), 1000);
      }

      // Update quick replies based on suggestions
      if (data.suggestions && data.suggestions.length > 0) {
        const quickActions = [
          'Show discounted items',
          'What pairs well with ' + (data.suggestions[0]?.name || 'this'),
          'Tell me more about ' + (data.suggestions[0]?.name || 'it')
        ];
        setQuickReplies(quickActions);
      } else {
        setQuickReplies([
          'What\'s on discount?',
          'Show me the menu',
          'Recommend something spicy'
        ]);
      }

    } catch (error) {
      console.error('Chat error:', error);
      appendMessage('Server connection error. Please try again.', 'agent', 'error');

      // Set fallback quick replies
      setQuickReplies([
        'Try again',
        'Show menu',
        'Contact support'
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    // Auto-submit after short delay for better UX
    setTimeout(() => {
      const form = document.querySelector('.chat-input-form');
      if (form) form.requestSubmit();
    }, 100);
  };

  const appendMessage = (text, sender, type = 'text', data = null) => {
    const message = {
      text,
      sender,
      type,
      data,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const appendDiscountHighlight = (item) => {
    const message = {
      type: 'discount_highlight',
      text: `${item.name} - 🔥 ${item.discount_amount} (₹${item.price} instead of ₹${item.originalPrice})`,
      sender: 'agent',
      data: item,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const appendPairingSuggestion = (mainItem, suggestions) => {
    const message = {
      type: 'pairing_suggestion',
      text: `Great choice! Here's what pairs well with ${mainItem.name}:`,
      sender: 'agent',
      data: { mainItem, suggestions },
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const appendMenuShowcase = (items, highlightDiscounts = true) => {
    const message = {
      type: 'menu_showcase',
      text: `Here are our available options:`,
      sender: 'agent',
      data: { items, highlightDiscounts },
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <h3>BoltBite Support</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="chat-messages" ref={chatRef}>
        <div className="message agent">
          👋 Welcome! How can I help you with your order today?
        </div>
        {messages.map((msg, idx) => (
          <div key={`${msg.timestamp}-${idx}`} className={`message ${msg.sender}`}>
            {msg.type === 'text' && (
              <div className="text-message">{msg.text}</div>
            )}
            {msg.type === 'discount_highlight' && (
              <div className="discount-highlight">
                <div className="discount-badge">🔥 {msg.data.discount_amount}</div>
                <div className="item-details">
                  <strong>{msg.text}</strong>
                  <div className="price-comparison">
                    <span className="original-price">₹{msg.data.originalPrice}</span>
                    <span className="discounted-price">₹{msg.data.price}</span>
                  </div>
                  <div className="item-category">{msg.data.category}</div>
                </div>
              </div>
            )}
            {msg.type === 'pairing_suggestion' && (
              <div className="pairing-suggestion">
                <div className="pairing-text">{msg.text}</div>
                <div className="pairing-cards">
                  {msg.data.suggestions.map((suggestion, sIdx) => (
                    <div key={sIdx} className="pairing-card">
                      <div className="pairing-item">
                        <strong>{suggestion.item.name}</strong>
                        <div className="pairing-price">₹{suggestion.item.price}</div>
                        {suggestion.discountHighlight && (
                          <div className="pairing-discount">{suggestion.discountHighlight}</div>
                        )}
                      </div>
                      <div className="pairing-reason">{suggestion.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {msg.type === 'menu_showcase' && (
              <div className="menu-showcase">
                <div className="showcase-text">{msg.text}</div>
                <div className="showcase-items">
                  {msg.data.items.slice(0, 6).map((item, mIdx) => (
                    <div key={mIdx} className={`showcase-item ${item.is_discounted ? 'discounted' : ''}`}>
                      <div className="item-name">{item.name}</div>
                      <div className="item-info">
                        <span className="item-price">₹{item.price}</span>
                        {item.is_discounted && msg.data.highlightDiscounts && (
                          <div className="item-discount">{item.discount_amount}</div>
                        )}
                      </div>
                      <div className="item-category">{item.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {msg.type === 'error' && (
              <div className="error-message">
                <div className="error-text">{msg.text}</div>
                <button className="retry-button" onClick={() => handleQuickReply('Try again')}>
                  Try Again
                </button>
              </div>
            )}
            {msg.sender === 'user' && (
              <div className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message agent typing">
            <div className="typing-indicator">
              <span>AI is thinking</span>
              <div className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reply Buttons */}
      {quickReplies.length > 0 && !isLoading && (
        <div className="quick-replies">
          {quickReplies.map((reply, rIdx) => (
            <button
              key={rIdx}
              onClick={() => handleQuickReply(reply)}
              className="quick-reply-button"
              disabled={isLoading}
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? (
            <div className="send-button-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatModal;
