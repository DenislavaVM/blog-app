import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePostPage.css";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        alert("Post created successfully!");
        navigate("/");
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("An error occurred while creating the post:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="create-post-container">
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
         <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(ev) => setImage(ev.target.files[0])}
        />
        <button type="submit">Create post</button>
      </form>
    </div>
  );
}
