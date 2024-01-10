import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Projects from "./components/Pages/Projects";
import Contact from "./components/Pages/Contact";
import Certifications from "./components/Pages/Certifications"
import About from "./components/Pages/About";
import Education from "./components/Pages/Education";
import Experience from "./components/Pages/Experience";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/education" element={<Education />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
