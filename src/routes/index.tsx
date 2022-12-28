import React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { Favorites, Home, Post } from "../pages";

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/post" element={<Post />} />
    </ReactRoutes>
  );
};

export default Routes;
