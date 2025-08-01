import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ExampleIdeas from './components/ExampleIdeas';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/waitlist/join/', {
        email: email
      });
      
      console.log('Email submitted successfully:', response.data);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error('Error submitting email:', err);
      setError(err.response?.data?.email?.[0] || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Enhanced scroll animations with better fade-in effects
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add visible class for basic animations
          element.classList.add('visible');
          
          // Handle staggered animations for grid items
          if (element.classList.contains('stagger-container')) {
            const items = element.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('visible');
              }, index * 200); // 200ms delay between each item
            });
          }
          
          // Handle section transitions
          if (element.classList.contains('section-transition')) {
            element.classList.add('visible');
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-container, .section-transition'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <SectionDivider variant="gradient" />
      <Features />
      <SectionDivider variant="minimal" />
      <HowItWorks />
      <SectionDivider variant="default" />
      <ExampleIdeas />
      <SectionDivider variant="gradient" />
      <Waitlist 
        email={email} 
        setEmail={setEmail} 
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        isLoading={isLoading}
        error={error}
      />
      <Footer />
    </>
  );
}

export default App; 