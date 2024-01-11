import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

//Pages
import Projects from "./components/Pages/Projects";
import Contact from "./components/Pages/Contact";
import Certifications from "./components/Pages/Certifications"
import About from "./components/Pages/About";
import Education from "./components/Pages/Education";
import Experience from "./components/Pages/Experience";
import Home from "./components/Pages/Home";

//Project Pages
import RentingProject from "./components/Pages/ProjectPages/RentingProject";
import GhostGearProject from "./components/Pages/ProjectPages/GhostGearProject";
import LostPetProject from "./components/Pages/ProjectPages/LostPetProject";
import CozySteamProject from "./components/Pages/ProjectPages/CozySteamProject";
import ThesisProject from "./components/Pages/ProjectPages/ThesisPage";

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certifications" element={<Certifications name="certifications" />} />
        <Route path="/education" element={<Education name="education" />} />
        <Route path="/experience" element={<Experience name="experience" />} />
        <Route path="/about" element={<About name="about" />} />
        {/* Project Pages */}
        <Route path="/renting" element={<RentingProject />} />
        <Route path="/ghostGear" element={<GhostGearProject />} />
        <Route path="/lostPets" element={<LostPetProject />} />
        <Route path="/cozyGames" element={<CozySteamProject />} />
        <Route path="/thesis" element={<ThesisProject />} />
        {/* <Route path="/bookClub" element={<BookClubProject />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
