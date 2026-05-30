import React from 'react';
import { Check, Zap, Shield, Star } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started.',
    features: [
      '10 captions per month',
      'Basic styles',
      'Standard support'
    ],
    buttonText: 'Current Plan',
    active: false,
    highlight: false
  },
  {
    name: 'Monthly',
    price: '$9',
    description: 'For growing creators.',
    features: [
      'Unlimited captions',
      'All platforms',
      'Tone customization',
      'Emoji & hashtag suggestions'
    ],
    buttonText: 'Get Started',
    active: true,
    highlight: true
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For advanced users.',
    features: [
      'Everything in Monthly',
      'Batch generation',
      'Brand voice profiles',
      'API access',
      'Team seats'
    ],
    buttonText: 'Go Pro',
    active: false,
    highlight: false
  }
];

function Pricing() {
  return (
    <div className="pricing-container">
      <div className="pricing-overlay">
        <div className="coming-soon-badge">Coming Soon</div>
      </div>
      
      <div className="pricing-header">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the plan that's right for your content journey.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}>
            {plan.highlight && <div className="badge">Most Popular</div>}
            <h3>{plan.name}</h3>
            <div className="price">
              <span className="amount">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="period">/mo</span>}
            </div>
            <p className="description">{plan.description}</p>
            
            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <Check className="check-icon" size={18} />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`pricing-btn ${plan.highlight ? 'primary' : 'secondary'}`}>
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Can I cancel anytime?</h4>
            <p>Yes, you can cancel your subscription at any time from your account settings.</p>
          </div>
          <div className="faq-item">
            <h4>What platforms are supported?</h4>
            <p>We support Instagram, TikTok, LinkedIn, Twitter/X, and YouTube.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
