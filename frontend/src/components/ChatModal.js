import React, { useState, useRef, useEffect } from 'react';

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
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', timestamp: Date.now() }]);

    try {
      const response = await fetch('http://localhost:3005/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          username: 'admin',
          password: 'admin123'
        })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response || 'No response', sender: 'agent', timestamp: Date.now() }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { text: 'Server connection error. Please try again.', sender: 'agent', timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const appendMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender, timestamp: new Date() }]);
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
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="message agent typing">
            <span className="typing-indicator">...</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatModal;
