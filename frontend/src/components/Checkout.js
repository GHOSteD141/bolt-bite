import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Cart Review, 2: Delivery, 3: Payment
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
  const total = Object.values(cartItems).reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = 40;
  const tax = Math.round(total * 0.05);
  const grandTotal = total + deliveryFee + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePayment = async () => {
    try {
      // Simulate payment processing
      alert('Processing payment of ₹' + grandTotal);
      // In real app, integrate with Razorpay/Stripe API
      localStorage.removeItem('cartItems');
      navigate('/order-confirmation');
    } catch (err) {
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex-1 h-1 ${step >= 1 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-1 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            <div className={`flex-1 h-1 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span className={step === 1 ? 'text-orange-600' : 'text-gray-600'}>Cart Review</span>
            <span className={step === 2 ? 'text-orange-600' : 'text-gray-600'}>Delivery Details</span>
            <span className={step === 3 ? 'text-orange-600' : 'text-gray-600'}>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Step 1: Cart Review */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order Review</h2>
                  <div className="space-y-4 mb-6">
                    {Object.entries(cartItems).map(([itemName, item]) => (
                      <div key={itemName} className="flex items-center justify-between border-b pb-4">
                        {/* Image and Text Container */}
                        <div className="flex items-center gap-4 flex-1">
                          {/* Small Image */}
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                            <img 
                              src={item.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'}
                              alt={itemName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop';
                              }}
                            />
                          </div>
                          
                          {/* Text Content */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{itemName}</h3>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            {item.is_discounted && (
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full inline-block mt-1">
                                🔥 {item.discount_amount}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <span className="font-semibold text-gray-900 whitespace-nowrap ml-4">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Details */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="9876543210"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Payment Methods */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
                  
                  {/* Credit/Debit Card */}
                  <div className="mb-6 p-4 border-2 rounded-lg cursor-pointer hover:border-orange-500"
                    onClick={() => setPaymentMethod('credit-card')}
                    style={{borderColor: paymentMethod === 'credit-card' ? '#ff6b35' : '#e5e7eb'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <input type="radio" checked={paymentMethod === 'credit-card'} readOnly />
                      <span className="font-semibold text-lg">💳 Credit/Debit Card</span>
                    </div>
                    {paymentMethod === 'credit-card' && (
                      <form className="space-y-3 ml-6">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="4532 1234 5678 9010"
                          maxLength="19"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                            placeholder="CVV"
                            maxLength="4"
                          />
                        </div>
                      </form>
                    )}
                  </div>

                  {/* UPI */}
                  <div className="mb-6 p-4 border-2 rounded-lg cursor-pointer hover:border-orange-500"
                    onClick={() => setPaymentMethod('upi')}
                    style={{borderColor: paymentMethod === 'upi' ? '#ff6b35' : '#e5e7eb'}}>
                    <div className="flex items-center gap-3 mb-4">
                      <input type="radio" checked={paymentMethod === 'upi'} readOnly />
                      <span className="font-semibold text-lg">📱 UPI (Google Pay, PhonePe, Paytm)</span>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="ml-6">
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="yourname@upi"
                        />
                      </div>
                    )}
                  </div>

                  {/* Wallet */}
                  <div className="mb-6 p-4 border-2 rounded-lg cursor-pointer hover:border-orange-500"
                    onClick={() => setPaymentMethod('wallet')}
                    style={{borderColor: paymentMethod === 'wallet' ? '#ff6b35' : '#e5e7eb'}}>
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'wallet'} readOnly />
                      <span className="font-semibold text-lg">💰 Digital Wallet (Apple Pay, Google Wallet)</span>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div className="p-4 border-2 rounded-lg cursor-pointer hover:border-orange-500"
                    onClick={() => setPaymentMethod('cod')}
                    style={{borderColor: paymentMethod === 'cod' ? '#ff6b35' : '#e5e7eb'}}>
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'cod'} readOnly />
                      <span className="font-semibold text-lg">🚚 Cash on Delivery</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="flex-1 px-6 py-3 border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50"
                  >
                    ← Previous
                  </button>
                )}
                {step < 3 && (
                  <button
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
                  >
                    Next →
                  </button>
                )}
                {step === 3 && (
                  <button
                    onClick={handlePayment}
                    className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
                  >
                    💳 Pay ₹{grandTotal}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold text-orange-600 mb-4">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded text-sm text-green-700">
                ✓ Free delivery on orders above ₹500
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
