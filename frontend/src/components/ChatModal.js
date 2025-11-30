import React, { useState, useRef, useEffect } from 'react';
import './ChatModal.css';

const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    appendMessage(userMessage, 'user');

    try {
      const response = await fetch('http://localhost:3005/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      appendMessage(data.response || 'No response', 'agent');
    } catch (error) {
      console.error('Chat error:', error);
      appendMessage('Server connection error. Please try again.', 'agent');
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
