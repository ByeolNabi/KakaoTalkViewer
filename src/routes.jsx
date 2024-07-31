import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ViewerPage from "./pages/ViewerPage";
import { FileProvider } from "./context/FileContext";

const AppRoute = () => (
  <FileProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewer" element={<ViewerPage />} />
      </Routes>
    </Router>
  </FileProvider>
);

export default AppRoute;
