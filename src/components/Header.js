import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container nav-container">
        <div className="logo">
          Devmine<span>.io</span>
        </div>
        
        <div className="nav-right">
          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How it Works</a>
            <a href="#example-ideas" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('example-ideas'); }}>Demo</a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line`}></i>
          </button>
          
          <button className="cta-button">Waitlist</button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <a href="#features" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#how-it-works" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How it Works</a>
            <a href="#example-ideas" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('example-ideas'); }}>Demo</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 