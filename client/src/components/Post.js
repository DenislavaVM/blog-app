import React from "react";
import { Link } from "react-router-dom";
import { calculateReadingTime } from "../utils/readingTime";

function Post({ post }) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="post">
      <div className="image">
        <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />
      </div>
      <div className="content">
        <h2>{post.title}</h2>
        <p className="info">
          <Link to="#" className="author" aria-label={`Author: ${post.author}`}>
            {post.author}
          </Link>
          <time>{new Date(post.createdAt).toLocaleDateString()}</time>
        </p>
        <p className="description">
          {post.summary}
        </p>
        <div className="footer">
          <span className="reading-time">{readingTime} min read</span>
          <Link to={`/post/${post._id}`} className="read-more">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
