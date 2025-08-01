import React from 'react';

const Testimonials = () => {
  const exampleIdeas = [
    {
      icon: "ri-apps-line",
      category: "Productivity",
      title: "Smart Task Manager",
      subtitle: "AI-powered task prioritization",
      description: "An intelligent task manager that automatically prioritizes your to-dos based on deadlines, importance, and your work patterns."
    },
    {
      icon: "ri-heart-pulse-line",
      category: "Health & Wellness",
      title: "Mood Tracker Pro",
      subtitle: "Mental health insights",
      description: "A comprehensive mood tracking app that analyzes patterns and provides personalized recommendations for better mental health."
    },
    {
      icon: "ri-money-dollar-circle-line",
      category: "Finance",
      title: "Budget Buddy",
      subtitle: "Smart spending tracker",
      description: "An AI-powered budget app that learns your spending habits and helps you save money with personalized recommendations."
    },
    {
      icon: "ri-book-open-line",
      category: "Education",
      title: "StudySync",
      subtitle: "Collaborative learning",
      description: "A platform that connects students studying the same subjects for collaborative learning and knowledge sharing."
    },
    {
      icon: "ri-home-line",
      category: "Home & Lifestyle",
      title: "Smart Home Hub",
      subtitle: "IoT automation",
      description: "A centralized smart home controller that learns your routines and automates your home devices intelligently."
    },
    {
      icon: "ri-car-line",
      category: "Transportation",
      title: "RideShare Optimizer",
      subtitle: "Efficient commuting",
      description: "An app that optimizes your daily commute by finding the best combination of public transport, rideshare, and walking."
    },
    {
      icon: "ri-restaurant-line",
      category: "Food & Dining",
      title: "Recipe Recommender",
      subtitle: "Personalized cooking",
      description: "An AI-powered recipe app that suggests meals based on your dietary preferences, available ingredients, and cooking skill level."
    },
    {
      icon: "ri-gamepad-line",
      category: "Entertainment",
      title: "Game Matchmaker",
      subtitle: "Find gaming buddies",
      description: "A platform that connects gamers with similar interests and skill levels for multiplayer gaming sessions."
    }
  ];

  return (
    <section className="example-ideas">
      <div className="container">
        <h2 className="section-title fade-in">Example Ideas</h2>
        <div className="ideas-container">
          <div className="ideas">
            {exampleIdeas.map((idea, index) => (
              <div key={index} className="idea-card">
                <div className="idea-header">
                  <i className={`${idea.icon} idea-icon`}></i>
                  <div className="idea-category">
                    <div className="idea-title">{idea.title}</div>
                    <div className="idea-subtitle">{idea.subtitle}</div>
                  </div>
                </div>
                <div className="idea-content">
                  {idea.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 