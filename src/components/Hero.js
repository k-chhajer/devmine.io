import React from 'react';
import FloatingPosts from './FloatingPosts';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content container">
        <h1 className="fade-in">Your Next Project Isn't Another Clone</h1>
        <p className="fade-in">Our LLM agents scrape Reddit & X to extract authentic user experiences, pain points, and product suggestions. Build what people actually want.</p>
      </div>
      <FloatingPosts />
    </section>
  );
};

export default Hero; 