import React from 'react';

const Features = () => {
  const features = [
    {
      icon: "ri-search-eye-line",
      title: "Real User Experience Mining",
      description: "Our AI agents extract authentic user stories, frustrations, and product suggestions from Reddit & X conversations, not just generic trends."
    },
    {
      icon: "ri-ai-generate",
      title: "LLM-Powered Analysis",
      description: "Advanced language models understand context, sentiment, and intent to identify genuine product opportunities from user conversations."
    },
    {
      icon: "ri-filter-3-line",
      title: "Niche Opportunity Detection",
      description: "Find inspiration from open source projects and ideas that others are building on."
    },
    {
      icon: "ri-notification-4-line",
      title: "Instant Opportunity Alerts",
      description: "Get notified about fresh ideas not many are aware or talking about."
    }
  ];

  return (
    <section className="features section-transition" id="features">
      <div className="container">
        <h2 className="section-title fade-in">Built For Product Hunters</h2>
        <div className="features-grid stagger-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card stagger-item">
              <i className={`${feature.icon} feature-icon`}></i>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 