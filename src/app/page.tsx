"use client";

import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { useState, useEffect, useRef } from "react";

const categoryScenarios = {
  dining: {
    cardName: "Chase Sapphire Preferred",
    merchant: "Restaurant",
    benefit: "3x points on dining",
    cashback: "3x Points"
  },
  travel: {
    cardName: "Amex Platinum",
    merchant: "Airport",
    benefit: "5x points on flights",
    cashback: "5x Points"
  },
  gas: {
    cardName: "Amex Gold",
    merchant: "Gas Station",
    benefit: "4x points on gas",
    cashback: "4x Points"
  },
  rent: {
    cardName: "Bilt Mastercard",
    merchant: "Rent Payment",
    benefit: "2% back on rent",
    cashback: "2% Cashback"
  },
  groceries: {
    cardName: "Amex Blue Cash Preferred",
    merchant: "Whole Foods",
    benefit: "6% cashback at U.S. supermarkets",
    cashback: "6% Cashback"
  },
  other: {
    cardName: "Discover It",
    merchant: "Retail Store",
    benefit: "5% cashback on rotating categories",
    cashback: "5% Cashback"
  }
};

const categories = [
  { id: "dining", label: "Dining", icon: "🍽️" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "gas", label: "Gas", icon: "⛽" },
  { id: "rent", label: "Rent", icon: "🏠" },
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "other", label: "Everything Else", icon: "✨" }
];

const faqs = [
  {
    question: "How does TapRight protect my privacy?",
    answer: "TapRight Basic does not access your bank account details, transaction history, or any sensitive financial data. We only utilize your device's location, with your explicit permission, to accurately identify merchants and provide optimal card recommendations."
  },
  {
    question: "Do I need to link my bank accounts?",
    answer: "No, TapRight Basic does not require you to link any bank accounts. You simply input the credit cards you currently own. Our notification system is then precisely tailored based on your defined card portfolio."
  },
  {
    question: "Which credit cards does TapRight support?",
    answer: "TapRight supports all major credit cards from Visa, Mastercard, American Express, and Discover. Simply indicate which cards are in your wallet, and we'll handle the rest."
  },
  {
    question: "How accurate are the cashback recommendations?",
    answer: "Our recommendations are based on real-time merchant data and the latest reward rates from credit card issuers. We update our database regularly to ensure accuracy."
  },
  {
    question: "When will TapRight be available?",
    answer: "The app is currently in beta testing. We are scheduled for our official launch on January 1st, 2026. We encourage you to join the waitlist to secure early access to the TapRight App."
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = sectionRefs.current;
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const currentScenario = selectedCategory 
    ? categoryScenarios[selectedCategory as keyof typeof categoryScenarios] 
    : null;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="hero" ref={(el) => { sectionRefs.current[0] = el; }}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="launching-soon-badge">
                <span className="badge-dot"></span>
                LAUNCHING SOON
              </div>
              <h1 className="hero-headline">
                Maximize your credit card rewards <span className="highlight">effortlessly</span>
              </h1>
              <p className="hero-description">
                TapRight instantly recommends the best card to use based on where you&apos;re standing. 
                Earn more cashback without thinking—just tap right.
              </p>
              <div className="hero-cta-group">
                <a className="hero-cta primary" href="#waitlist">
                  Join the Waitlist →
                </a>
                <a className="hero-cta secondary" href="#how-it-works">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hero-animation">
              <div className="card-tap-animation">
                {/* Payment Terminal SVG - BIGGER */}
                <svg className="payment-terminal" width="200" height="260" viewBox="0 0 200 260" fill="none">
                  <defs>
                    <linearGradient id="terminalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f8f9fa" />
                      <stop offset="100%" stopColor="#e9ecef" />
                    </linearGradient>
                  </defs>
                  <rect x="15" y="15" width="170" height="230" rx="16" fill="url(#terminalGrad)" stroke="#dee2e6" strokeWidth="3"/>
                  <rect x="35" y="35" width="130" height="80" rx="8" fill="#2d3748" stroke="#4a5568" strokeWidth="3"/>
                  <circle cx="100" cy="160" r="38" fill="#00B376" opacity="0">
                    <animate attributeName="opacity" values="0;0;0;0.3;0.5;0.3;0" dur="5s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M 80 160 L 95 175 L 120 145" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0">
                    <animate attributeName="opacity" values="0;0;0;0;1;1;0" dur="5s" repeatCount="indefinite"/>
                  </path>
                </svg>

                {/* Credit Card SVG - SMALLER */}
                <svg className="credit-card-tapping" width="180" height="110" viewBox="0 0 180 110" fill="none">
                  <defs>
                    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a5f" />
                      <stop offset="100%" stopColor="#0f1f38" />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="5" width="170" height="100" rx="10" fill="url(#cardGrad)" stroke="#2d4a6f" strokeWidth="2"/>
                  <rect x="15" y="22" width="32" height="24" rx="3" fill="#ffd700" opacity="0.9"/>
                  <text x="15" y="70" fill="white" fontSize="11" fontFamily="monospace" letterSpacing="1.5">**** ****</text>
                  <text x="15" y="88" fill="white" fontSize="14" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">**** 4291</text>
                  <text x="145" y="88" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="700">VISA</text>
                </svg>

                {/* Money Flying */}
                <div className="money-flow">
                  <svg className="reward-icon reward-1" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#00B376"/>
                    <text x="14" y="18" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">$</text>
                  </svg>
                  <svg className="reward-icon reward-2" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#0074A6"/>
                    <text x="14" y="18" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">$</text>
                  </svg>
                  <svg className="reward-icon reward-3" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#00B376"/>
                    <text x="14" y="18" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">$</text>
                  </svg>
                </div>

                {/* Wallet SVG */}
                <svg className="wallet-icon" width="110" height="90" viewBox="0 0 110 90" fill="none">
                  <defs>
                    <linearGradient id="walletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="25" width="100" height="60" rx="8" fill="url(#walletGrad)"/>
                  <rect x="5" y="15" width="100" height="15" rx="6" fill="#6b21a8"/>
                  <circle cx="85" cy="55" r="8" fill="white" opacity="0.9"/>
                  <circle cx="85" cy="55" r="4" fill="#6b21a8"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy/Security Statements */}
      <section className="privacy-statements" ref={(el) => { sectionRefs.current[1] = el; }}>
        <div className="privacy-item">
          <svg className="privacy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" fill="currentColor"/>
          </svg>
          <span>We never ask or access your card details</span>
        </div>
        <div className="privacy-item">
          <svg className="privacy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
          </svg>
          <span>We use your location only to show the right card</span>
        </div>
        <div className="privacy-item">
          <svg className="privacy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
          </svg>
          <span>We do not track your spending</span>
        </div>
        <div className="privacy-item">
          <svg className="privacy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span>No bank login or account linking required</span>
        </div>
        <div className="privacy-item">
          <svg className="privacy-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor"/>
          </svg>
          <span>Your data stays private</span>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works" ref={(el) => { sectionRefs.current[2] = el; }}>
        <h2 className="how-it-works-title">How It Works</h2>
        <p className="how-it-works-subtitle">Three simple steps to unlock your maximum reward potential</p>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number-badge">1</div>
            <div className="step-icon-wrapper">
              <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="8" width="16" height="10" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="5" y="9" width="14" height="2" fill="currentColor"/>
                <circle cx="7" cy="15" r="1.2" fill="currentColor"/>
                <circle cx="7.8" cy="15" r="1.2" fill="currentColor"/>
                <line x1="10" y1="14.5" x2="13" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,1"/>
                <line x1="10" y1="15.5" x2="13" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,1"/>
                <line x1="10" y1="16.5" x2="13" y2="16.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,1"/>
              </svg>
            </div>
            <h3 className="step-title">Connect Your Cards</h3>
            <p className="step-description">Select which credit cards you own and enable location access. TapRight learns your habits to deliver smarter recommendations over time</p>
          </div>
          <div className="step-card">
            <div className="step-number-badge">2</div>
            <div className="step-icon-wrapper">
              <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="step-title">Get Instant Recommendations</h3>
            <p className="step-description">When you enter a store, TapRight detects the merchant and automatically shows which card earns the highest cashback—no searching or typing needed</p>
          </div>
          <div className="step-card">
            <div className="step-number-badge">3</div>
            <div className="step-icon-wrapper">
              <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="step-title">Earn More Automatically</h3>
            <p className="step-description">After learning your location trends, TapRight suggests cards that match your habits. For example, if you visit restaurants often, we highlight cards with stronger dining rewards</p>
          </div>
        </div>
      </section>

      <section className="use-cases" id="use-cases" ref={(el) => { sectionRefs.current[3] = el; }}>
        <h2 className="use-cases-title">See TapRight in Action</h2>
        <p className="use-cases-subtitle">Click on any category to see which card TapRight would recommend</p>
        
        <div className="use-cases-container">
          <div className="category-grid">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  className={`category-button ${isActive ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="category-button-icon">{category.icon}</div>
                  <div className="category-button-label">{category.label}</div>
                </button>
              );
            })}
          </div>
          
          {currentScenario && (
            <div key={selectedCategory} className="card-recommendation">
              <div className="card-icon">💳</div>
              <div className="card-info">
                <h3 className="card-name">{currentScenario.cardName}</h3>
                <p className="card-merchant">{currentScenario.merchant}</p>
                <p className="card-benefit">{currentScenario.benefit}</p>
              </div>
              <div className="card-cashback">{currentScenario.cashback}</div>
            </div>
          )}
        </div>
      </section>

      <section className="rewards-comparison" ref={(el) => { sectionRefs.current[4] = el; }}>
        <h2 className="rewards-title">Your Rewards, Maximized</h2>
        <p className="rewards-subtitle">See how much more you could earn on $1,500 monthly spending</p>
        <div className="comparison-table">
          <div className="table-header">
            <div className="table-cell">Category</div>
            <div className="table-cell">
              <span><span className="cross-symbol">×</span> Without TapRight</span>
            </div>
            <div className="table-cell">
              <span><span className="check-symbol">✓</span> With TapRight</span>
            </div>
            <div className="table-cell">Increase</div>
          </div>
          <div className="table-row">
            <div className="table-cell" data-label="Category">Dining Out</div>
            <div className="table-cell" data-label="Without TapRight">$24</div>
            <div className="table-cell highlight" data-label="With TapRight">$42</div>
            <div className="table-cell highlight" data-label="Increase"><span className="increase-badge">+75%</span></div>
          </div>
          <div className="table-row">
            <div className="table-cell" data-label="Category">Travel & Hotels</div>
            <div className="table-cell" data-label="Without TapRight">$31</div>
            <div className="table-cell highlight" data-label="With TapRight">$62</div>
            <div className="table-cell highlight" data-label="Increase"><span className="increase-badge">+100%</span></div>
          </div>
          <div className="table-row">
            <div className="table-cell" data-label="Category">Gas Stations</div>
            <div className="table-cell" data-label="Without TapRight">$18</div>
            <div className="table-cell highlight" data-label="With TapRight">$30</div>
            <div className="table-cell highlight" data-label="Increase"><span className="increase-badge">+67%</span></div>
          </div>
          <div className="table-row">
            <div className="table-cell" data-label="Category">Groceries</div>
            <div className="table-cell" data-label="Without TapRight">$36</div>
            <div className="table-cell highlight" data-label="With TapRight">$72</div>
            <div className="table-cell highlight" data-label="Increase"><span className="increase-badge">+100%</span></div>
          </div>
          <div className="table-row">
            <div className="table-cell" data-label="Category">Everything Else</div>
            <div className="table-cell" data-label="Without TapRight">$21</div>
            <div className="table-cell highlight" data-label="With TapRight">$32</div>
            <div className="table-cell highlight" data-label="Increase"><span className="increase-badge">+52%</span></div>
          </div>
          <div className="table-row total">
            <div className="table-cell" data-label="Category">Monthly Total</div>
            <div className="table-cell" data-label="Without TapRight">$130</div>
            <div className="table-cell highlight" data-label="With TapRight">$238</div>
            <div className="table-cell highlight" data-label="Increase"><span className="increase-badge total-badge">+83%</span></div>
          </div>
        </div>
        <p className="comparison-disclaimer">Based on average cashback rates. Actual earnings may vary by card and merchant.</p>
      </section>

      <section className="faq-section" ref={(el) => { sectionRefs.current[5] = el; }}>
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">Everything you need to know about TapRight</p>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFaq === index ? 'open' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span>{faq.question}</span>
                <svg className="faq-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              {openFaq === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="waitlist-section" id="waitlist" ref={(el) => { sectionRefs.current[6] = el; }}>
        <div className="waitlist-header">
          <h2 className="waitlist-title">Join the TapRight Waitlist</h2>
          <p className="waitlist-subtitle">Beta is invite-only. Claim early access and be first to maximize your rewards.</p>
        </div>
        <WaitlistForm />
      </section>

      <footer className="site-footer" ref={(el) => { sectionRefs.current[7] = el; }}>
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo-group">
              <Image
                src="/tapright-final-logo.png"
                alt="TapRight logo"
                width={32}
                height={32}
                unoptimized
              />
              <span className="footer-brand-name">TapRight</span>
            </div>
            <p className="footer-tagline">
              Maximize your credit card rewards effortlessly. Instantly know which card earns the highest cashback at every store.
            </p>
            <p className="footer-copyright">© 2025 TapRight. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Product</h4>
              <a href="#how-it-works" className="footer-link">How It Works</a>
              <a href="#waitlist" className="footer-link">Join Waitlist</a>
              <a href="#use-cases" className="footer-link">Features</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

