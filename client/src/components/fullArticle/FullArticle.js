import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CommentsSection.css";

function FullArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [userUsername, setUserUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
          setLikes(postData.likes?.length || 0);
          setComments(postData.comments || []);
          setIsLiked(postData.likes?.includes(userId) || false); // Initialize the isLiked state
        } else {
          setError("Failed to fetch post");
        }
      } catch (error) {
        setError("Error fetching post");
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUserId(userData.id);
          setUserUsername(userData.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPost();
    fetchUserData();
  }, [id, navigate, userId]); // Added userId to the dependency array to update isLiked state

  const handleLike = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setLikes(data.likes);
        setIsLiked(!isLiked);
      } else {
        console.error("Error liking post:", data.error);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentContent || (!userId && !username)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username, content: commentContent }),
      });

      const data = await response.json();
      if (response.ok) {
        setComments(data.comments || []);
        setCommentContent("");
        setUsername("");
      } else {
        console.error("Failed to add comment:", data.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const isAuthor = userUsername === post.author;

  return (
    <div className="full-article">
      <h1>{post.title}</h1>
      <img src={`http://localhost:5000${post.imageUrl}`} alt={post.title} />
      <p>{post.content}</p>
      <div className="article-actions">
        <button onClick={handleLike} disabled={!userId}>
          {isLiked ? "Unlike" : "Like"} ({likes})
        </button>
        {isAuthor && (
          <button onClick={() => navigate(`/post/${id}/edit`)}>Edit Post</button>
        )}
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index}>
              <p><strong>{comment.user?.username || comment.username || "Anonymous"}</strong> {comment.content}</p>
            </div>
          ))
        )}
        <form onSubmit={handleCommentSubmit}>
          {!userId && (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
          )}
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FullArticle;
