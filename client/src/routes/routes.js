import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../components/Home';
import FullArticle from '../components/FullArticle';
import posts from '../data/posts';

const routes = (
  <>
    <Route path="/" element={<Home posts={posts} />} />
    {posts.map(post => (
      <Route key={post.id} path={`/post/${post.id}`} element={<FullArticle post={post} />} />
    ))}
  </>
);

export default routes;
