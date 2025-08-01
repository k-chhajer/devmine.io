import React, { useEffect, useRef } from 'react';

const FloatingPosts = () => {
  const postsRef = useRef(null);

  useEffect(() => {
    const posts = postsRef.current?.children;
    if (!posts) return;

    // Add floating animation to each post
    Array.from(posts).forEach((post, index) => {
      post.style.animationDelay = `${index * 0.5}s`;
    });
  }, []);

  const twitterPosts = [
    {
      username: "@techfounder",
      content: "Just spent 3 hours debugging a simple CSS issue. Why do frontend frameworks make everything so complicated? 😤",
      likes: "2.3K",
      retweets: "156",
      time: "2h"
    },
    {
      username: "@indiehacker",
      content: "Looking for a simple way to track user behavior without Google Analytics. Any recommendations for privacy-focused alternatives?",
      likes: "1.8K",
      retweets: "89",
      time: "4h"
    }
  ];

  const redditPosts = [
    {
      subreddit: "r/webdev",
      title: "What's your biggest pain point as a developer?",
      content: "I'm building a tool to help developers and would love to know what frustrates you most in your daily workflow.",
      upvotes: "847",
      comments: "156",
      time: "5h"
    },
    {
      subreddit: "r/SideProject",
      title: "Need help validating my SaaS idea",
      content: "I'm working on a productivity tool but struggling to find product-market fit. How do you validate ideas quickly?",
      upvotes: "623",
      comments: "89",
      time: "8h"
    }
  ];

  return (
    <div className="floating-posts" ref={postsRef}>
      {/* Twitter Posts - Top corners */}
      <div className="post-card twitter-post corner-top-left">
        <div className="post-header">
          <div className="platform-icon twitter-icon">
            <i className="ri-twitter-fill"></i>
          </div>
          <div className="post-meta">
            <span className="username">{twitterPosts[0].username}</span>
            <span className="time">{twitterPosts[0].time}</span>
          </div>
        </div>
        <div className="post-content">
          {twitterPosts[0].content}
        </div>
        <div className="post-stats">
          <span className="stat">
            <i className="ri-heart-line"></i>
            {twitterPosts[0].likes}
          </span>
          <span className="stat">
            <i className="ri-repeat-line"></i>
            {twitterPosts[0].retweets}
          </span>
        </div>
      </div>

      <div className="post-card twitter-post corner-top-right">
        <div className="post-header">
          <div className="platform-icon twitter-icon">
            <i className="ri-twitter-fill"></i>
          </div>
          <div className="post-meta">
            <span className="username">{twitterPosts[1].username}</span>
            <span className="time">{twitterPosts[1].time}</span>
          </div>
        </div>
        <div className="post-content">
          {twitterPosts[1].content}
        </div>
        <div className="post-stats">
          <span className="stat">
            <i className="ri-heart-line"></i>
            {twitterPosts[1].likes}
          </span>
          <span className="stat">
            <i className="ri-repeat-line"></i>
            {twitterPosts[1].retweets}
          </span>
        </div>
      </div>

      {/* Reddit Posts - Bottom corners */}
      <div className="post-card reddit-post corner-bottom-left">
        <div className="post-header">
          <div className="platform-icon reddit-icon">
            <i className="ri-reddit-fill"></i>
          </div>
          <div className="post-meta">
            <span className="subreddit">{redditPosts[0].subreddit}</span>
            <span className="time">{redditPosts[0].time}</span>
          </div>
        </div>
        <div className="post-title">
          {redditPosts[0].title}
        </div>
        <div className="post-content">
          {redditPosts[0].content}
        </div>
        <div className="post-stats">
          <span className="stat">
            <i className="ri-arrow-up-line"></i>
            {redditPosts[0].upvotes}
          </span>
          <span className="stat">
            <i className="ri-chat-1-line"></i>
            {redditPosts[0].comments}
          </span>
        </div>
      </div>

      <div className="post-card reddit-post corner-bottom-right">
        <div className="post-header">
          <div className="platform-icon reddit-icon">
            <i className="ri-reddit-fill"></i>
          </div>
          <div className="post-meta">
            <span className="subreddit">{redditPosts[1].subreddit}</span>
            <span className="time">{redditPosts[1].time}</span>
          </div>
        </div>
        <div className="post-title">
          {redditPosts[1].title}
        </div>
        <div className="post-content">
          {redditPosts[1].content}
        </div>
        <div className="post-stats">
          <span className="stat">
            <i className="ri-arrow-up-line"></i>
            {redditPosts[1].upvotes}
          </span>
          <span className="stat">
            <i className="ri-chat-1-line"></i>
            {redditPosts[1].comments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FloatingPosts; 