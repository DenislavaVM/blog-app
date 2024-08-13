import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import FullArticle from '../components/FullArticle';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import posts from '../data/posts';

const routes = (
  <>
    <Route path="/" element={<Home posts={posts} />} />
    <Route path="/login" element={<LoginPage />} /> 
    <Route path="/register" element={<RegisterPage />} /> 
    {posts.map(post => (
      <Route key={post.id} path={`/post/${post.id}`} element={<FullArticle post={post} />} />
    ))}
  </>
);

export default routes;