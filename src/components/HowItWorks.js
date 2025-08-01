import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: "ri-robot-line",
      title: "AI Agents Scrape Conversations",
      description: "Our LLM-powered agents continuously monitor Reddit and X, analyzing millions of conversations to extract real user experiences, pain points, and product suggestions."
    },
    {
      icon: "ri-brain-line",
      title: "Intelligent Pattern Recognition",
      description: "Advanced AI algorithms identify emerging trends, validate genuine user needs, and filter out generic ideas to focus on actionable product opportunities."
    },
    {
      icon: "ri-rocket-line",
      title: "Ship Validated Ideas",
      description: "Get access to real user problems and product suggestions that people actually want, based on authentic conversations and experiences."
    }
  ];

  return (
    <section className="how-it-works section-transition" id="how-it-works">
      <div className="container">
        <h2 className="section-title fade-in">How It Works</h2>
        <div className="steps stagger-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card stagger-item">
              <i className={`${step.icon} step-icon`}></i>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 