import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home";
import FullArticle from "../components/fullArticle/FullArticle";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import CreatePostPage from "../components/CreatePostPage";
import EditPost from "../components/pages/EditPostPage";

const routes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/create" element={<CreatePostPage />} />
    <Route path="/post/:id" element={<FullArticle />} />
    <Route path="/post/:id/edit" element={<EditPost />} /> 
  </>
);

export default routes;