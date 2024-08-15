import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setLoading(false);
        } else {
          setError("Failed to fetch post");
        }
      } catch (error) {
        setError("Error fetching post");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); 
  };
/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("summary", post.summary);
      formData.append("content", post.content);
      if (imageFile) {
        formData.append("image", imageFile); 
      }

      const response = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${document.cookie.split("=")[1]}`
        },
        body: formData
      });

      if (response.ok) {
        navigate(`/post/${id}`);
      } else {
        setError("Failed to update post");
      }
    } catch (error) {
      setError("Error updating post");
    }
  };
*/

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("summary", post.summary);
    formData.append("content", post.content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${document.cookie.split("=")[1]}`,
      },
      body: formData,
    });

    if (response.ok) {
      navigate(`/post/${id}`);
    } else {
      setError("Failed to update post");
    }
  } catch (error) {
    setError("Error updating post");
  }
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={post.summary}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;