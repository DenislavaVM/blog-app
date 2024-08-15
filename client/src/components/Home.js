import React, { useEffect, useState } from "react";
import Post from "./Post";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home;
