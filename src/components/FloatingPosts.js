import React, { useEffect, useRef } from 'react';

const FloatingPosts = () => {
  const postsRef = useRef(null);

  useEffect(() => {
    const posts = postsRef.current?.children;
    if (!posts) return;

    // Enhanced floating animation with staggered delays
    Array.from(posts).forEach((post, index) => {
      post.style.animationDelay = `${index * 0.8}s`;
      post.style.opacity = '0';

      // Trigger visibility after a short delay
      setTimeout(() => {
        post.style.opacity = '1';
        post.classList.add('animate-in');
      }, index * 400 + 1000);
    });
  }, []);

  const socialPosts = [
    {
      type: 'twitter',
      username: "Sarah Chen",
      handle: "sarahdev",
      avatar: "SC",
      content: "Spent 3 hours debugging a CSS layout issue. There has to be a better way to visualize flexbox problems in real-time 😤",
      likes: "2.1K",
      retweets: "187",
      time: "2h",
      verified: true,
      position: 'left-top'
    },
    {
      type: 'reddit',
      subreddit: "r/webdev",
      title: "API rate limiting made simple?",
      content: "Why is implementing proper API rate limiting so complex? Looking for a plug-and-play solution that doesn't require a PhD...",
      upvotes: "847",
      comments: "156",
      time: "4h",
      author: "u/frustrated_dev",
      position: 'left-bottom'
    },
    {
      type: 'twitter',
      username: "Mike Startup",
      handle: "mikestartup",
      avatar: "MS",
      content: "Building MVPs shouldn't take 6 months. Need a tool that generates working prototypes from wireframes 🚀 #nocode",
      likes: "3.2K",
      retweets: "421",
      time: "1h",
      verified: false,
      position: 'right-top'
    },
    {
      type: 'reddit',
      subreddit: "r/SideProject",
      title: "Idea validation before coding?",
      content: "How do you guys validate product ideas before spending months building? Looking for a systematic approach to test demand...",
      upvotes: "1.2K",
      comments: "234",
      time: "3h",
      author: "u/product_seeker",
      position: 'right-bottom'
    }
  ];

  const renderTwitterPost = (post) => (
    <div key={`twitter-${post.position}`} className={`floating-post twitter-post ${post.position}`}>
      <div className="post-glow twitter-glow"></div>
      <div className="post-header">
        <div className="user-avatar twitter-avatar">{post.avatar}</div>
        <div className="user-info">
          <div className="username">
            {post.username}
            {post.verified && <i className="ri-verified-badge-fill verified-icon"></i>}
          </div>
          <div className="handle">@{post.handle}</div>
        </div>
        <div className="platform-icon twitter-icon">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </div>
      </div>
      <div className="post-text">{post.content}</div>
      <div className="post-stats">
        <div className="stat-item">
          <i className="ri-heart-3-line"></i>
          <span>{post.likes}</span>
        </div>
        <div className="stat-item">
          <i className="ri-repeat-2-line"></i>
          <span>{post.retweets}</span>
        </div>
        <div className="post-time">{post.time}</div>
      </div>
    </div>
  );

  const renderRedditPost = (post) => (
    <div key={`reddit-${post.position}`} className={`floating-post reddit-post ${post.position}`}>
      <div className="post-glow reddit-glow"></div>
      <div className="post-header">
        <div className="platform-icon reddit-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
          </svg>
        </div>
        <div className="subreddit-info">
          <div className="subreddit-name">{post.subreddit}</div>
          <div className="post-author">by {post.author} • {post.time} ago</div>
        </div>
      </div>
      <div className="post-title">{post.title}</div>
      <div className="post-text">{post.content}</div>
      <div className="post-stats">
        <div className="stat-item upvote">
          <i className="ri-arrow-up-line"></i>
          <span>{post.upvotes}</span>
        </div>
        <div className="stat-item">
          <i className="ri-chat-3-line"></i>
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="floating-posts-container" ref={postsRef}>
      {socialPosts.map((post) => (
        post.type === 'twitter' ? renderTwitterPost(post) : renderRedditPost(post)
      ))}
    </div>
  );
};

export default FloatingPosts;
