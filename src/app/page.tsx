"use client";

import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { useState } from "react";

const categoryScenarios = {
  all: {
    scenario: "TapRight works everywhere you go",
    example: "Wherever you stand, TapRight shows the best card to use — instantly."
  },
  travel: {
    scenario: "You arrive at the airport",
    example: "Airport → Platinum (5x Points) | Hotel → Chase Sapphire (3x Points) | Airlines → Amex Gold (4x Points)"
  },
  dining: {
    scenario: "You walk into a restaurant",
    example: "Coffee Shop → Chase Sapphire (5% Cashback) | Restaurant → Capital One (3x Points)"
  },
  gas: {
    scenario: "You pull into a gas station",
    example: "Gas → Amex Gold (4x Points) | Convenience Store → Discover It (5% Cashback)"
  },
  rent: {
    scenario: "Your rent is due",
    example: "Use Bilt to get 2% back on rent"
  },
  everyday: {
    scenario: "You're at the grocery checkout",
    example: "Grocery → Blue Cash (6% Cashback) | Retail Store → Discover It (5% Cashback)"
  },
  other: {
    scenario: "TapRight adapts wherever you are",
    example: "Any Location → Best Match Card | Instant Detection → Maximum Rewards"
  }
};

const categories = [
  { id: "all", label: "All", icon: "🌟" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "dining", label: "Dining", icon: "🍽️" },
  { id: "gas", label: "Gas", icon: "⛽" },
  { id: "rent", label: "Rent", icon: "🏠" },
  { id: "everyday", label: "Everyday", icon: "🛒" },
  { id: "other", label: "Other", icon: "✨" }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };
  
  const currentScenario = selectedCategory 
    ? categoryScenarios[selectedCategory as keyof typeof categoryScenarios] 
    : null;

  return (
    <>
      <div className="page-gradient" />
      <div className="noise-layer" />
      <div className="page-orb orb-one" />
      <div className="page-orb orb-two" />
      <main>
        <section className="hero" id="hero">
          <div className="hero-content">
            <div className="hero-brand">
            <Image
              src="/tapright-final-logo.png"
              alt="TapRight logo"
              width={170}
              height={170}
              className="hero-logo"
              priority
            />
              <h1 className="hero-title">TapRight</h1>
            </div>
            <h2 className="hero-headline">Maximize your credit card rewards effortlessly</h2>
            <p className="hero-description">
              TapRight instantly recommends the best card to use based on where you&apos;re standing. 
              Earn more cashback without thinking—just tap right.
            </p>
            <a className="hero-cta" href="#waitlist">
              Join the Waitlist
            </a>
          </div>
          <div className="hero-features">
            <span className="hero-feature-text">We never ask or access your card details</span>
            <span className="hero-feature-separator">•</span>
            <span className="hero-feature-text">We use your location only to show the right card</span>
            <span className="hero-feature-separator">•</span>
            <span className="hero-feature-text">We do not track your spending</span>
            <span className="hero-feature-separator">•</span>
            <span className="hero-feature-text">No bank login or account linking required</span>
            <span className="hero-feature-separator">•</span>
            <span className="hero-feature-text">Your data stays private</span>
          </div>

          {/* Floating feature cards */}
          <div className="floating-card floating-card-top-left">
            <div className="floating-card-icon">💰</div>
            <div className="floating-card-text">5% Cashback</div>
          </div>
          <div className="floating-card floating-card-bottom-left">
            <div className="floating-card-icon">🎯</div>
            <div className="floating-card-text">Best Match</div>
        </div>
          <div className="floating-card floating-card-middle-right">
            <div className="floating-card-icon">📍</div>
            <div className="floating-card-text">Location Detected</div>
          </div>

        </section>

        <section className="how-it-works" id="how-it-works">
          <h2 className="how-it-works-title">How It Works</h2>
          <p className="how-it-works-subtitle">Three simple steps to unlock your maximum reward potential</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Card outline */}
                  <rect x="4" y="8" width="16" height="10" rx="1.5" fill="white" stroke="currentColor" strokeWidth="2"/>
                  {/* Magnetic stripe at top */}
                  <rect x="5" y="9" width="14" height="2" fill="currentColor"/>
                  {/* EMV chip - two overlapping circles */}
                  <circle cx="7" cy="15" r="1.2" fill="currentColor"/>
                  <circle cx="7.8" cy="15" r="1.2" fill="currentColor"/>
                  {/* Dashed lines */}
                  <line x1="10" y1="14.5" x2="13" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,1"/>
                  <line x1="10" y1="15.5" x2="13" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,1"/>
                  <line x1="10" y1="16.5" x2="13" y2="16.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1,1"/>
                </svg>
              </div>
              <div className="step-number">Step 1</div>
              <h3 className="step-title">Connect Your Cards</h3>
              <p className="step-description">Add your credit cards to TapRight and grant location access so we can learn where you usually go</p>
            </div>
            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
              </div>
              <div className="step-number">Step 2</div>
              <h3 className="step-title">Get Instant Recommendations</h3>
              <p className="step-description">When you enter a store, TapRight detects the merchant and automatically shows which card earns the highest cashback—no searching or typing needed</p>
            </div>
            <div className="step-card">
              <div className="step-icon-wrapper">
                <svg className="step-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" fill="currentColor"/>
                </svg>
              </div>
              <div className="step-number">Step 3</div>
              <h3 className="step-title">Earn More Automatically</h3>
              <p className="step-description">After learning your location trends, TapRight suggests cards that match your habits. For example, if you visit restaurants often, we highlight cards with stronger dining rewards</p>
            </div>
          </div>
        </section>

        <section className="use-cases" id="use-cases">
          <h2 className="use-cases-title">See TapRight in Action</h2>
          <p className="use-cases-subtitle">Real scenarios where TapRight helps you earn more</p>
          
          <div className="use-cases-container">
            {/* Circular Category Selector */}
            <div className="category-circle">
              <div className="category-circle-center">
                <div className="category-center-icon">🎯</div>
                <div className="category-center-text">Categories</div>
              </div>
              {categories.map((category, index) => {
                const angle = (index * 360) / categories.length;
                const radius = 200;
                const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((angle - 90) * Math.PI / 180) * radius;
                const isActive = selectedCategory === category.id;
                const showTooltip = isActive && currentScenario;
                
                // Determine tooltip position based on button position
                const tooltipPosition = angle >= 45 && angle < 135 ? 'right' : 
                                       angle >= 135 && angle < 225 ? 'bottom' :
                                       angle >= 225 && angle < 315 ? 'left' : 'top';
                
                return (
                  <div 
                    key={category.id} 
                    className="category-button-wrapper floating-category" 
                    style={{
                      '--x': `${x}px`,
                      '--y': `${y}px`,
                      '--delay': `${index * 0.1}s`,
                      transform: `translate(calc(-50% + var(--x)), calc(-50% + var(--y)))`,
                    } as React.CSSProperties}
                  >
                    <button
                      className={`category-button ${isActive ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="category-button-icon">{category.icon}</div>
                      <div className="category-button-label">{category.label}</div>
                    </button>
                    {showTooltip && (
                      <div className={`scenario-tooltip scenario-tooltip-${tooltipPosition} animation`}>
                        <p className="scenario-text">{currentScenario.scenario}</p>
                        <p className="scenario-example">{currentScenario.example}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        <section className="waitlist-section" id="waitlist">
          <WaitlistForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <Image
            src="/tapright-final-logo.png"
            alt="TapRight logo"
            width={50}
            height={50}
          />
          <span>© {new Date().getFullYear()} TapRight. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
