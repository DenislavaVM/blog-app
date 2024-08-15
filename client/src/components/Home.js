import React, { useEffect, useState } from "react";
import Post from "./Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);  
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div>
      {posts.map(post => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Home;