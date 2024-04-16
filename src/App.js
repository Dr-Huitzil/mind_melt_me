import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./global.css";


import Desktop from "./components/pages/Desktop";
import Episodes from "./components/pages/Episodes";
import About from "./components/pages/About";
import NotFound from "./components/pages/404";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Desktop />} />
        <Route exact path="/Episodes" element={<Episodes />} />
        <Route exact path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
