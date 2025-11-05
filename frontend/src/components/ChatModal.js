import React, { useState, useRef, useEffect } from 'react';

const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const chatRef = useRef(null);

  const authenticate = async () => {
    try {
      const response = await fetch('http://localhost:3006/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: 'admin123',
          message: 'login'
        })
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        appendMessage('Authentication successful! How can I help you?', 'agent');
      }
    } catch (error) {
      appendMessage('Authentication failed. Please try again.', 'agent');
    }
  };

  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      authenticate();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    appendMessage(userMessage, 'user');

    try {
      console.log('Sending message to server...');
      const response = await fetch('http://localhost:3006/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: userMessage,
          username: 'admin',
          password: 'admin123'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      appendMessage(data.response || 'No response from server', 'agent');
    } catch (error) {
      console.error('Chat error:', error);
      appendMessage('Server connection error. Please try again.', 'agent');
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
