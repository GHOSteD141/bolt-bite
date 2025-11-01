import React, { useState } from 'react';

const Support = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="support-widget">
      {isOpen ? (
        <div className="support-modal">
          <div className="support-header">
            <h3>Customer Support</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="support-content">
            <p>Need help? Contact us:</p>
            <a href="tel:+1234567890">📞 Call Support</a>
            <a href="mailto:support@boltbite.com">✉️ Email Support</a>
            <button onClick={() => window.location.href='/chat'}>
              💬 Live Chat
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="support-button"
          onClick={() => setIsOpen(true)}
        >
          Need Help? 🎧
        </button>
      )}
    </div>
  );
};

export default Support;
