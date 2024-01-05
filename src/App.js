import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Layout from "./components/Layout";
import RentingPage from "./components/Projects/Renting";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route index element={<Banner />} /> */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/renting" element={<RentingPage />} />
      </Routes>
    </div>
  );
}

export default App;
