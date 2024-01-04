// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Routes, Route, HashRouter } from "react-router-dom";
// import "./App.css";
// import NavBar from "./components/NavBar";
// import Banner from "./components/Banner";
// import Projects from "./components/Projects";
// import Contact from "./components/Contact";
// import Layout from "./components/Layout";

// function App() {
//   return (
//     <div className="App">
//       <HashRouter basename={"http://chloepomeroy.github.io/portfolio"}>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Banner />} />
//             <Route path="/projects" element={<Projects />} />
//             <Route path="/contact" element={<Contact />} />
//           </Route>
//         </Routes>
//       </HashRouter>
//     </div>
//   );
// }

// export default App;

import './App.css';
import React from 'react';
import { Route, Switch, Link } from "react-router-dom";
import About from './components/Contact';
import Home from './components/Layout';

class App extends React.Component {
  render() {
      return (
        <div className="App">
          <div>
            <nav>
              <ul id="navigation">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
            <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
          </div>
            );
  }
}

export default App;
