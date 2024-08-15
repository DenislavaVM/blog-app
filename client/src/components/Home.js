import React from "react";
import Post from "./Post";

function Home({ posts }) {
  return posts.map(post => <Post key={post.id} post={post} />);
}

export default Home;
