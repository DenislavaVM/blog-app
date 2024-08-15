import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FullArticle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Failed to fetch post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="full-article">
      <h1>{post.title}</h1>
      <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />
      <p>{post.content}</p>
    </div>
  );
}

export default FullArticle;
