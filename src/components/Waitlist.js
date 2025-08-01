import React from 'react';

const Waitlist = ({ email, setEmail, onSubmit, isSubmitted, isLoading, error }) => {
  return (
    <section className="final-cta section-transition">
      <div className="container">
        <div className="cta-glow"></div>
        <h2 className="scale-in">Stop Building in the Dark</h2>
        <p className="fade-in">Join the waitlist and get access to real user problems and product suggestions from Reddit & X conversations. Build what people actually want.</p>
        <div className="final-waitlist-form scale-in">
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
            onClick={onSubmit}
          >
            {isLoading ? 'Joining...' : isSubmitted ? 'Joined!' : 'Get Early Access'}
          </button>
        </div>
                       {error && (
                 <p className="footnote fade-in" style={{ color: '#ff6b6b' }}>
                   {error}
                 </p>
               )}
               <p className="footnote fade-in" style={{ marginTop: '20px' }}>Launching Soon!</p>
      </div>
    </section>
  );
};

export default Waitlist; 