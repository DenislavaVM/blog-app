import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Post from './components/Post';
import FullArticle from './components/FullArticle';

function Home({ posts }) {
  return posts.map(post => <Post key={post.id} post={post} />);
}

function App() {
  const posts = [
    {
      title: "The Resilient Beauty of Sunflowers",
      author: "Me",
      date: "2024-01-06 15:48",
      description: "In a world of fleeting moments, the sunflower stands tall as a symbol of resilience and hope. Discover the fascinating journey of these golden blooms, from their origins in ancient cultures to their modern-day significance. Explore the deep connection between sunflowers and the human spirit, and how their bright petals inspire us to find strength and beauty in every season of life.",
      imgSrc: "https://cdn.stocksnap.io/img-thumbs/960w/macro-yellow_SRX6B3DNYA.jpg"
    },
  ];


  return (
    <Router>
      <main>
        <header>
          <Link to="/" className="logo">Blog</Link>
          <nav>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          {posts.map(post => (
            <Route key={post.id} path={`/post/${post.id}`} element={<FullArticle post={post} />} />
          ))}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
