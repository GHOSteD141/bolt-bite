import React, { useState } from 'react';
import ChatModal from './ChatModal';

const Support = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="support-widget">
      {isOpen && (
        <div className="support-modal">
          <div className="support-header">
            <h3>Customer Support</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="support-content">
            <button onClick={() => setShowChat(true)} className="support-option">
              💬 Live Chat with AI
            </button>
            <a href="tel:+1234567890" className="support-option">
              📞 Call Support
            </a>
            <a href="mailto:support@boltbite.com" className="support-option">
              ✉️ Email Support
            </a>
          </div>
        </div>
      )}
      <button className="support-button" onClick={() => setIsOpen(true)}>
        Need Help? 🎧
      </button>
      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default Support;
