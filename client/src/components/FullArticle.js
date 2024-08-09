import React from 'react';

function FullArticle({ post }) {
  return (
    <div className="full-article">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  );
}

export default FullArticle;
