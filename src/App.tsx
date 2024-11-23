import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {RestaurantPage} from "./pages/RestaurantPage";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}