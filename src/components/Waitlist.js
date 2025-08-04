import React from 'react';

const Waitlist = ({ email, setEmail, onSubmit, isSubmitted, isLoading, error }) => {
  return (
    <section className="final-cta section-transition" id="waitlist">
      <div className="container">
        <div className="cta-glow"></div>

        <h2 className="scale-in">Ready to Build Something People Actually Want?</h2>
        <p className="fade-in">Join thousands of developers who are discovering real user problems and building products that matter. Waitlist.</p>

        <form onSubmit={onSubmit} className="final-waitlist-form scale-in">
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
    </section>
  );
};

export default Waitlist;
