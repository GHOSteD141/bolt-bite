import React, { useState } from 'react';

function SupportModal({ isOpen, onClose }) {
  const [supportType, setSupportType] = useState('chat');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    console.log('Support form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">Support Center</h2>
          <button onClick={onClose} className="text-2xl hover:opacity-80">✕</button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">We've received your message and will get back to you soon.</p>
          </div>
        ) : (
          <div className="p-6">
            {/* Support Type Tabs */}
            <div className="flex gap-4 mb-6 border-b">
              <button
                onClick={() => setSupportType('chat')}
                className={`pb-2 font-semibold ${supportType === 'chat' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600'}`}
              >
                💬 Chat Support
              </button>
              <button
                onClick={() => setSupportType('phone')}
                className={`pb-2 font-semibold ${supportType === 'phone' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600'}`}
              >
                ☎️ Call Support
              </button>
              <button
                onClick={() => setSupportType('email')}
                className={`pb-2 font-semibold ${supportType === 'email' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-600'}`}
              >
                📧 Email Support
              </button>
            </div>

            {supportType === 'chat' && (
              <div>
                <p className="text-gray-600 mb-4">Chat with our AI support agent now!</p>
                <div className="bg-gray-100 rounded-lg p-4 h-48 overflow-y-auto mb-4">
                  <div className="text-center text-gray-500 py-8">
                    Chat window would appear here
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">Send</button>
                </div>
              </div>
            )}

            {supportType === 'phone' && (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">☎️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Available 24/7</p>
                <a href="tel:+919876543210" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600">
                  +91 9876543210
                </a>
              </div>
            )}

            {supportType === 'email' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600"
                >
                  Send Email
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportModal;
