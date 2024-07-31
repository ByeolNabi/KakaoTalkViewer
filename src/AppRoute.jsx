import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ViewerPage from "./pages/ViewerPage";
import FileContext from "./context/FileContext";

const AppRoute = () => (
  <Router>
    <Routes>
      <FileContext>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewer" element={<ViewerPage />} />
      </FileContext>
    </Routes>
  </Router>
);

export default AppRoute;
