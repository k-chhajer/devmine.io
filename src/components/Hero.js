import React from 'react';
import FloatingPosts from './FloatingPosts';

const Hero = ({ email, setEmail, onSubmit, isSubmitted, isLoading, error, waitlistCount, countAnimation }) => {
  return (
    <section className="hero">
      <div className="hero-content container">
        <h1 className="fade-in">Your Next Project Isn't Another Clone</h1>
        <p className="fade-in">Our LLM agents scrape Reddit & X to extract authentic user experiences, pain points, and product suggestions. Build what people actually want.</p>

        {/* Waitlist Counter */}
        <div className="waitlist-counter fade-in">
          <div className="counter-content">
            <div className={`counter-number ${countAnimation ? 'animate' : ''}`}>
              {waitlistCount.toLocaleString()}
            </div>
            <div className="counter-label">developers already joined</div>
          </div>
          <div className="counter-indicator">
            <div className="indicator-dot"></div>
            <span>Live counter</span>
          </div>
        </div>

        {/* Waitlist Form */}
        <form onSubmit={onSubmit} className="waitlist-form scale-in">
          <div className="input-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              disabled={isLoading}
              className="waitlist-input"
            />
            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className="waitlist-button"
            >
              <span className="button-text">
                {isLoading ? 'Joining...' : isSubmitted ? 'Joined!' : 'Get Early Access'}
              </span>
              {!isLoading && !isSubmitted && (
                <i className="ri-arrow-right-line button-icon"></i>
              )}
              {isLoading && (
                <i className="ri-loader-4-line button-icon spinning"></i>
              )}
              {isSubmitted && (
                <i className="ri-check-line button-icon"></i>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message fade-in">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        <div className="success-features fade-in">
          <div className="feature-item">
            <i className="ri-check-line"></i>
            <span>Early access to beta</span>
          </div>
          <div className="feature-item">
            <i className="ri-check-line"></i>
            <span>Lifetime discount</span>
          </div>
          <div className="feature-item">
            <i className="ri-check-line"></i>
            <span>Priority support</span>
          </div>
        </div>

        <p className="footnote fade-in">Launching Soon! No spam, unsubscribe anytime.</p>
      </div>
      <FloatingPosts />
    </section>
  );
};

export default Hero;
