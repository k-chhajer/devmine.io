import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ExampleIdeas from './components/ExampleIdeas';
import Footer from './components/Footer';
import SectionDivider from './components/SectionDivider';

// Configure axios defaults for the Django backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = 10000; // 10 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(0); // Start with 0 instead of static number
  const [countAnimation, setCountAnimation] = useState(false);

  // Fetch real waitlist stats from backend
  useEffect(() => {
    const fetchWaitlistStats = async () => {
      try {
        const response = await axios.get('/api/waitlist/stats/');
        if (response.data && typeof response.data.total_signups === 'number') {
          setWaitlistCount(response.data.total_signups);
        }
      } catch (err) {
        console.log('Backend not available, using fallback counter');
        // Use a static fallback number when backend is not available
        setWaitlistCount(847);
      }
    };

    fetchWaitlistStats();

    // Refresh count every 30 seconds to get real-time updates
    const interval = setInterval(fetchWaitlistStats, 30000);

    return () => clearInterval(interval);
  }, []);

  // Remove the random counter updates - we only want real data
  // No more simulated increments

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Client-side email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/waitlist/join/', {
        email: email.trim().toLowerCase()
      }, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        }
      });
      
      console.log('Email submitted successfully:', response.data);
      setIsSubmitted(true);
      setEmail('');
      
      // Update waitlist count with actual position from backend
      if (response.data && typeof response.data.position === 'number') {
        setWaitlistCount(response.data.position);
        setCountAnimation(true);
        setTimeout(() => setCountAnimation(false), 600);
      }

      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);

    } catch (err) {
      console.error('Error submitting email:', err);

      let errorMessage = 'Failed to join waitlist. Please try again.';

      if (err.response) {
        // Backend responded with an error
        if (err.response.status === 429) {
          errorMessage = 'Too many attempts. Please try again later.';
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.error || 'Invalid email address.';
        } else if (err.response.status >= 500) {
          errorMessage = 'Server error. Please try again in a moment.';
        }
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please check your connection.';
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
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
      <Hero
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        isLoading={isLoading}
        error={error}
        waitlistCount={waitlistCount}
        countAnimation={countAnimation}
      />
      <SectionDivider variant="gradient" />
      <Features />
      <SectionDivider variant="minimal" />
      <HowItWorks />
      <SectionDivider variant="default" />
      <ExampleIdeas />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
