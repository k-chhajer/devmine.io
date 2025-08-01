import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          Devmine<span>.io</span>
        </div>
        <div className="footer-copyright">
          <p>&copy; 2025 Devmine.io. All rights reserved.</p>
        </div>
        <div className="footer-social">
          <a href="https://twitter.com/devmine_io" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="/X_logo.svg" alt="X (Twitter)" className="social-svg" />
          </a>
          <a href="https://github.com/devmine_io" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="/github.svg" alt="GitHub" className="social-svg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 