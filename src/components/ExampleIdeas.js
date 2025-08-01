import React, { useEffect, useRef } from 'react';

const ExampleIdeas = () => {
  const scrollContainerRef = useRef(null);

  const ideas = [
    {
      platform: "Reddit",
      community: "r/webdev",
      title: "Privacy-focused analytics alternative",
      content: "Looking for a simple way to track user behavior without Google Analytics. Any recommendations for privacy-focused alternatives?",
      engagement: "847 upvotes • 156 comments"
    },
    {
      platform: "X",
      username: "@techfounder",
      title: "CSS debugging tool",
      content: "Just spent 3 hours debugging a simple CSS issue. Why do frontend frameworks make everything so complicated? 😤",
      engagement: "2.3K likes • 156 retweets"
    },
    {
      platform: "Reddit",
      community: "r/SideProject",
      title: "SaaS idea validation tool",
      content: "I'm working on a productivity tool but struggling to find product-market fit. How do you validate ideas quickly?",
      engagement: "623 upvotes • 89 comments"
    },
    {
      platform: "X",
      username: "@indiehacker",
      title: "Workflow automation platform",
      content: "The amount of time I waste on repetitive tasks is insane. Need a better way to automate my development workflow.",
      engagement: "3.1K likes • 234 retweets"
    },
    {
      platform: "Reddit",
      community: "r/Entrepreneur",
      title: "Problem discovery platform",
      content: "Looking for inspiration for my next project. What's a problem you face regularly that you wish had a better solution?",
      engagement: "1.2K upvotes • 234 comments"
    },
    {
      platform: "X",
      username: "@startupdev",
      title: "Developer onboarding tool",
      content: "Onboarding new developers takes forever. Need a tool that can automatically set up dev environments and documentation.",
      engagement: "1.8K likes • 89 retweets"
    },
    {
      platform: "Reddit",
      community: "r/startups",
      title: "Customer feedback aggregator",
      content: "Getting feedback from multiple channels is chaotic. Need a tool that consolidates feedback from email, social, and support tickets.",
      engagement: "456 upvotes • 67 comments"
    },
    {
      platform: "X",
      username: "@producthunter",
      title: "API documentation generator",
      content: "Writing API docs is the worst part of building. Wish there was a tool that auto-generates docs from code comments.",
      engagement: "2.7K likes • 189 retweets"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const scrollSpeed = 1.2; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Get the first set of cards width
      const firstSetWidth = scrollContainer.children[0].offsetWidth;
      
      // Reset position when we've scrolled past the first set
      if (scrollPosition >= firstSetWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Create two sets of ideas for seamless infinite scroll
  const ideasSet1 = ideas.map((idea, index) => ({ ...idea, key: `set1-${index}` }));
  const ideasSet2 = ideas.map((idea, index) => ({ ...idea, key: `set2-${index}` }));

  return (
    <section className="example-ideas section-transition" id="example-ideas">
      <div className="container">
        <h2 className="section-title fade-in">Example Ideas We've Found</h2>
        <p className="section-subtitle fade-in">Real product suggestions extracted from Reddit & X conversations</p>
        
        <div className="ideas-scroll-container" ref={scrollContainerRef}>
          <div className="ideas-list">
            {ideasSet1.map((idea) => (
              <div key={idea.key} className="idea-card fade-in">
                <div className="idea-header">
                  <div className="platform-badge">
                    <i className={`ri-${idea.platform.toLowerCase()}-fill`}></i>
                    {idea.platform}
                  </div>
                  <div className="idea-meta">
                    {idea.community && <span className="community">{idea.community}</span>}
                    {idea.username && <span className="username">{idea.username}</span>}
                  </div>
                </div>
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-content">{idea.content}</p>
                <div className="idea-engagement">
                  <i className="ri-chat-1-line"></i>
                  {idea.engagement}
                </div>
              </div>
            ))}
          </div>
          <div className="ideas-list">
            {ideasSet2.map((idea) => (
              <div key={idea.key} className="idea-card fade-in">
                <div className="idea-header">
                  <div className="platform-badge">
                    <i className={`ri-${idea.platform.toLowerCase()}-fill`}></i>
                    {idea.platform}
                  </div>
                  <div className="idea-meta">
                    {idea.community && <span className="community">{idea.community}</span>}
                    {idea.username && <span className="username">{idea.username}</span>}
                  </div>
                </div>
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-content">{idea.content}</p>
                <div className="idea-engagement">
                  <i className="ri-chat-1-line"></i>
                  {idea.engagement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleIdeas; 