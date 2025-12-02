import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/footer-pages.css';

function FooterPage() {
  const location = useLocation();
  const path = location.pathname;

  const content = {
    '/help/faq': {
      title: 'Frequently Asked Questions',
      description: 'Find answers to common questions about Bolt Bite',
      items: [
        {
          q: 'How long does delivery take?',
          a: 'Most orders are delivered within 30-45 minutes. Premium members get priority delivery.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, digital wallets, and UPI payments.'
        },
        {
          q: 'Can I cancel my order?',
          a: 'You can cancel orders within 2 minutes of placing them. After that, contact support.'
        },
        {
          q: 'Do you deliver to my area?',
          a: 'Enter your address in the app to check if we deliver in your area.'
        },
        {
          q: 'How do refunds work?',
          a: 'Refunds are processed within 3-5 business days to your original payment method.'
        },
        {
          q: 'Is there a minimum order value?',
          a: 'Minimum order value is ₹200. Free delivery on orders above ₹500.'
        }
      ]
    },
    '/help/contact': {
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      content: `
        <div class="contact-info">
          <div class="contact-method">
            <h3>📞 Phone Support</h3>
            <p>Call us: +91-1800-BOLT-BITE (1800-2658-2483)</p>
            <p>Available: 24/7</p>
          </div>
          <div class="contact-method">
            <h3>📧 Email Support</h3>
            <p>Email: support@boltbite.com</p>
            <p>Response time: Within 2 hours</p>
          </div>
          <div class="contact-method">
            <h3>💬 Live Chat</h3>
            <p>Chat with us on the app or website</p>
            <p>Available: 24/7</p>
          </div>
          <div class="contact-method">
            <h3>📍 Headquarters</h3>
            <p>Bolt Bite Inc.</p>
            <p>123 Tech Park, Mumbai, India 400001</p>
          </div>
        </div>
      `
    },
    '/help/order-tracking': {
      title: 'Order Tracking',
      description: 'Track your order in real-time',
      content: `
        <div class="info-content">
          <h3>Real-Time Order Tracking</h3>
          <p>Once you place an order, you can track it in real-time through our app. Here's what you'll see:</p>
          <ul class="tracking-steps">
            <li><strong>Order Confirmed:</strong> Restaurant accepts your order</li>
            <li><strong>Preparing:</strong> Your food is being prepared</li>
            <li><strong>Ready for Pickup:</strong> Delivery partner is picking up your order</li>
            <li><strong>On the Way:</strong> Your order is heading to you</li>
            <li><strong>Delivered:</strong> Order successfully delivered</li>
          </ul>
          <p>You'll receive notifications at each stage. Contact support if you have concerns.</p>
        </div>
      `
    },
    '/help/payment-issues': {
      title: 'Payment Issues',
      description: 'Troubleshooting payment problems',
      items: [
        {
          q: 'Payment failed - what should I do?',
          a: 'Check your internet connection and try again. If issue persists, contact your bank.'
        },
        {
          q: 'My payment was deducted but order not placed',
          a: 'Don\'t worry! Contact support within 24 hours with your transaction ID for a refund.'
        },
        {
          q: 'Can I use multiple payment methods?',
          a: 'You can only use one payment method per order, but can switch between orders.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard encryption (SSL) to protect all payment data.'
        }
      ]
    },
    '/help/account': {
      title: 'Account Help',
      description: 'Manage your account and profile',
      items: [
        {
          q: 'How do I reset my password?',
          a: 'Go to login page, click "Forgot Password", and follow the email instructions.'
        },
        {
          q: 'How do I delete my account?',
          a: 'Contact support with your account email to request account deletion.'
        },
        {
          q: 'Can I have multiple accounts?',
          a: 'Only one account per email address is allowed.'
        },
        {
          q: 'How do I update my profile information?',
          a: 'Go to Settings > Profile to update name, phone, address, and preferences.'
        }
      ]
    },
    '/safety/food-safety': {
      title: 'Food Safety',
      description: 'Our commitment to safe food delivery',
      content: `
        <div class="info-content">
          <h3>Food Safety Standards</h3>
          <ul class="safety-list">
            <li>All restaurants are verified and comply with local health regulations</li>
            <li>Hygiene inspections conducted regularly</li>
            <li>Temperatures maintained during delivery</li>
            <li>Contactless packaging for safety</li>
            <li>Use of certified food packaging materials</li>
          </ul>
          <h3>What We Do</h3>
          <p>We partner only with verified restaurants that maintain high food safety standards. Our delivery partners are trained to maintain proper food handling procedures.</p>
        </div>
      `
    },
    '/safety/contactless-delivery': {
      title: 'Contactless Delivery',
      description: 'Safe delivery options',
      content: `
        <div class="info-content">
          <h3>Contactless Delivery Service</h3>
          <p>We offer multiple safe delivery options:</p>
          <ul class="safety-list">
            <li>Leave at door option available</li>
            <li>OTP-based verification</li>
            <li>Video call verification available</li>
            <li>Sanitized packaging</li>
            <li>Delivery partners trained in hygiene</li>
          </ul>
        </div>
      `
    },
    '/safety/delivery-partners': {
      title: 'Delivery Partner Safety',
      description: 'Safety measures for our delivery partners',
      content: `
        <div class="info-content">
          <h3>Partner Safety Programs</h3>
          <ul class="safety-list">
            <li>Regular health check-ups</li>
            <li>Accident and health insurance coverage</li>
            <li>Safety training programs</li>
            <li>24/7 support available</li>
            <li>Fair wages and working conditions</li>
            <li>Personal protective equipment provided</li>
          </ul>
        </div>
      `
    },
    '/safety/covid-info': {
      title: 'COVID-19 Information',
      description: 'Safety measures during the pandemic',
      content: `
        <div class="info-content">
          <h3>COVID-19 Safety Protocols</h3>
          <ul class="safety-list">
            <li>Vaccination status verification for delivery partners</li>
            <li>Mask and hand sanitizer available at all times</li>
            <li>Enhanced hygiene training</li>
            <li>Contactless delivery prioritized</li>
            <li>Sanitized packaging and containers</li>
            <li>Regular health monitoring</li>
          </ul>
        </div>
      `
    },
    '/safety/emergency': {
      title: 'Emergency Guidelines',
      description: 'What to do in case of emergencies',
      content: `
        <div class="info-content">
          <h3>Emergency Support</h3>
          <p>In case of any emergency, follow these steps:</p>
          <ul class="safety-list">
            <li>Call emergency services (911/112) if needed</li>
            <li>Contact Bolt Bite support immediately: +91-1800-2658-2483</li>
            <li>Provide order details and location information</li>
            <li>Our team will assist and coordinate with authorities if needed</li>
          </ul>
          <p><strong>Never ignore safety concerns. Your safety is our priority.</strong></p>
        </div>
      `
    },
    '/terms/service': {
      title: 'Terms of Service',
      description: 'Legal terms for using Bolt Bite',
      content: `
        <div class="info-content">
          <h3>Terms of Service</h3>
          <p>By using Bolt Bite, you agree to:</p>
          <ul class="safety-list">
            <li>Provide accurate information during registration</li>
            <li>Use the service for lawful purposes only</li>
            <li>Not engage in fraudulent activities</li>
            <li>Respect intellectual property rights</li>
            <li>Follow all applicable laws and regulations</li>
            <li>Not share your account with others</li>
          </ul>
          <p>For complete terms, please read our full Terms of Service document.</p>
        </div>
      `
    },
    '/terms/user-agreement': {
      title: 'User Agreement',
      description: 'User rights and responsibilities',
      content: `
        <div class="info-content">
          <h3>User Agreement</h3>
          <p>As a Bolt Bite user, you have the right to:</p>
          <ul class="safety-list">
            <li>Access reliable food delivery service</li>
            <li>Transparent pricing and no hidden charges</li>
            <li>Safe and hygienic food handling</li>
            <li>Timely delivery or refund</li>
            <li>Privacy protection of personal data</li>
          </ul>
          <p>You agree to:</p>
          <ul class="safety-list">
            <li>Pay for services provided</li>
            <li>Treat delivery partners with respect</li>
            <li>Provide accurate delivery address</li>
          </ul>
        </div>
      `
    },
    '/terms/restaurant-terms': {
      title: 'Restaurant Terms',
      description: 'Terms for restaurant partners',
      content: `
        <div class="info-content">
          <h3>Restaurant Partner Terms</h3>
          <p>Restaurants on Bolt Bite agree to:</p>
          <ul class="safety-list">
            <li>Maintain health and safety standards</li>
            <li>Prepare orders within specified time</li>
            <li>Use quality ingredients as described</li>
            <li>Comply with food regulations</li>
            <li>Respond to customer concerns</li>
            <li>Maintain accurate menu and pricing</li>
          </ul>
        </div>
      `
    },
    '/terms/delivery-terms': {
      title: 'Delivery Terms',
      description: 'Delivery service terms and conditions',
      content: `
        <div class="info-content">
          <h3>Delivery Service Terms</h3>
          <ul class="safety-list">
            <li>Estimated delivery time is approximate</li>
            <li>Delays may occur due to traffic or weather</li>
            <li>Maximum wait time: 60 minutes or full refund</li>
            <li>Delivery partners are independent contractors</li>
            <li>Orders must be received by valid address</li>
            <li>Delivery charges apply as per zone and distance</li>
          </ul>
        </div>
      `
    },
    '/terms/refund-policy': {
      title: 'Refund Policy',
      description: 'Our refund and cancellation policy',
      items: [
        {
          q: 'When can I cancel and get a refund?',
          a: 'Cancel within 2 minutes of placing order for full refund. After that, contact support.'
        },
        {
          q: 'How long does refund take?',
          a: 'Refunds are processed within 3-5 business days to original payment method.'
        },
        {
          q: 'What if I receive wrong order?',
          a: 'Report immediately with photos. We\'ll send correct order or issue full refund.'
        },
        {
          q: 'Damaged or missing items?',
          a: 'Report within 1 hour with evidence. We\'ll refund or resend items.'
        }
      ]
    },
    '/privacy/privacy-policy': {
      title: 'Privacy Policy',
      description: 'How we protect your privacy',
      content: `
        <div class="info-content">
          <h3>Privacy Policy</h3>
          <p>At Bolt Bite, your privacy is important to us. We collect only necessary information:</p>
          <ul class="safety-list">
            <li>Name and contact information</li>
            <li>Delivery address</li>
            <li>Payment details (encrypted)</li>
            <li>Order history</li>
            <li>Device information for app functionality</li>
          </ul>
          <p>We never share your data with third parties without consent.</p>
        </div>
      `
    },
    '/privacy/data-protection': {
      title: 'Data Protection',
      description: 'How we protect your data',
      content: `
        <div class="info-content">
          <h3>Data Protection Measures</h3>
          <ul class="safety-list">
            <li>SSL encryption for all data transmission</li>
            <li>Secure servers with regular backups</li>
            <li>Limited employee access to personal data</li>
            <li>Regular security audits</li>
            <li>Compliance with international data protection standards</li>
            <li>Immediate notification of any data breach</li>
          </ul>
        </div>
      `
    },
    '/privacy/cookie-policy': {
      title: 'Cookie Policy',
      description: 'How we use cookies',
      content: `
        <div class="info-content">
          <h3>Cookie Policy</h3>
          <p>Bolt Bite uses cookies to:</p>
          <ul class="safety-list">
            <li>Keep you logged in</li>
            <li>Remember your preferences</li>
            <li>Analyze website traffic</li>
            <li>Personalize your experience</li>
            <li>Prevent fraud</li>
          </ul>
          <p>You can disable cookies in your browser settings, but some features may not work properly.</p>
        </div>
      `
    },
    '/privacy/gdpr': {
      title: 'GDPR Rights',
      description: 'Your rights under GDPR',
      content: `
        <div class="info-content">
          <h3>GDPR Rights</h3>
          <p>If you're in the EU, you have the right to:</p>
          <ul class="safety-list">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data (right to be forgotten)</li>
            <li>Export your data</li>
            <li>Restrict data processing</li>
            <li>Object to data processing</li>
          </ul>
          <p>Contact privacy@boltbite.com to exercise these rights.</p>
        </div>
      `
    },
    '/privacy/your-choices': {
      title: 'Your Privacy Choices',
      description: 'Privacy options and preferences',
      content: `
        <div class="info-content">
          <h3>Your Privacy Choices</h3>
          <p>You can control your privacy settings:</p>
          <ul class="safety-list">
            <li>Opt-out of marketing emails</li>
            <li>Disable location tracking</li>
            <li>Control notification preferences</li>
            <li>Manage app permissions</li>
            <li>Delete account and data</li>
            <li>View data collected about you</li>
          </ul>
          <p>Go to Settings > Privacy to manage your preferences.</p>
        </div>
      `
    },
    '/accessibility': {
      title: 'Accessibility',
      description: 'Our commitment to accessibility',
      content: `
        <div class="info-content">
          <h3>Accessibility Features</h3>
          <p>Bolt Bite is committed to serving all users:</p>
          <ul class="safety-list">
            <li>Screen reader compatible</li>
            <li>Keyboard navigation support</li>
            <li>High contrast mode available</li>
            <li>Text sizing options</li>
            <li>Closed captions on videos</li>
            <li>Accessible form controls</li>
          </ul>
          <p>If you experience accessibility issues, contact: accessibility@boltbite.com</p>
        </div>
      `
    },
    '/sitemap': {
      title: 'Sitemap',
      description: 'Site structure and navigation',
      content: `
        <div class="info-content">
          <h3>Bolt Bite Sitemap</h3>
          <ul class="safety-list">
            <li><strong>Main Pages:</strong> Home, Restaurants, About, How It Works</li>
            <li><strong>Help:</strong> FAQ, Contact, Order Tracking, Payment Issues, Account Help</li>
            <li><strong>Safety:</strong> Food Safety, Contactless Delivery, Partner Safety, COVID-19, Emergency</li>
            <li><strong>Legal:</strong> Terms of Service, User Agreement, Restaurant Terms, Delivery Terms, Refund Policy</li>
            <li><strong>Privacy:</strong> Privacy Policy, Data Protection, Cookies, GDPR, Your Choices</li>
            <li><strong>Other:</strong> Accessibility, Careers, Press</li>
          </ul>
        </div>
      `
    },
    '/careers': {
      title: 'Careers',
      description: 'Join the Bolt Bite team',
      content: `
        <div class="info-content">
          <h3>Join Bolt Bite</h3>
          <p>We're always looking for talented individuals to join our team!</p>
          <h4>Open Positions</h4>
          <ul class="safety-list">
            <li>Software Engineers (Frontend/Backend/Mobile)</li>
            <li>Product Managers</li>
            <li>Customer Support Specialists</li>
            <li>Marketing and Growth</li>
            <li>Data Analysts</li>
            <li>Delivery Operations Managers</li>
          </ul>
          <p>Send your resume to: careers@boltbite.com</p>
          <p>Learn about our culture and benefits at: www.boltbite.com/careers</p>
        </div>
      `
    },
    '/press': {
      title: 'Press',
      description: 'Press releases and media information',
      content: `
        <div class="info-content">
          <h3>Press Center</h3>
          <h4>Recent News</h4>
          <ul class="safety-list">
            <li>Bolt Bite Launches Premium Membership Program (Dec 2025)</li>
            <li>Expanding to 50 New Cities (Nov 2025)</li>
            <li>Partnership with Local Food Producers (Oct 2025)</li>
            <li>AI-Powered Recommendation System Launch (Sep 2025)</li>
          </ul>
          <p><strong>For media inquiries, contact:</strong></p>
          <p>press@boltbite.com</p>
          <p>+91-1234-567-890</p>
        </div>
      `
    }
  };

  const page = content[path];

  if (!page) {
    return (
      <div className="footer-page">
        <div className="container">
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="footer-page">
      <div className="footer-page-header">
        <div className="container">
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
      </div>

      <div className="container footer-page-content">
        {page.items ? (
          <div className="faq-list">
            {page.items.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        )}
      </div>
    </div>
  );
}

export default FooterPage;
