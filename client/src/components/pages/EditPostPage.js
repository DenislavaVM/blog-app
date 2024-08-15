import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditPostPage.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
          method: "GET",
          credentials: "include", 
        });

        if (!response.ok) {
          throw new Error(`Error fetching post: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.author !== userInfo.username) {
          throw new Error("Forbidden: You are not the author of this post");
        }

        setPost({
          title: data.title || "",
          content: data.content || "",
          image: null,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post. Please try again later.");
      }
    };

    fetchPost();
  }, [id, userInfo.username]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setPost({ ...post, image: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    if (post.image) {
      formData.append("image", post.image);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error updating post");
      }

      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post: " + error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-post-container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPostPage;
