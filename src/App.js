import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <HashRouter basename={"http://chloepomeroy.github.io/portfolio"}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Banner />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
