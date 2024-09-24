import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ViewerPage from "./pages/ViewerPage";
import { FileProvider } from "./context/FileContext";
import DemoPage from "./pages/DemoPage";

const AppRoute = () => (
  <FileProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </Router>
  </FileProvider>
);

export default AppRoute;
