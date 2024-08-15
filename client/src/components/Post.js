import React, { useState } from "react";
import { Link } from "react-router-dom";
import { calculateReadingTime } from "../utils/readingTime";

function Post({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const readingTime = calculateReadingTime(post.description);

  return (
    <div className="post">
      <div className="image">
        <img src={post.imgSrc} alt={post.title} />
      </div>
      <div className="content">
        <h2>{post.title}</h2>
        <p className="info">
          <Link to="#" className="author" aria-label={`Author: ${post.author}`}>{post.author}</Link>
          <time>{post.date}</time>
        </p>
        <p className={`description ${isExpanded ? "expanded" : ""}`}>
          {post.description}
        </p>
        <div className="footer">
          <span className="reading-time">{readingTime} min read</span>
          <Link to={`/post/${post.id}`} className="read-more" onClick={toggleDescription}>
            {isExpanded ? "Read Less" : "Read More"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
