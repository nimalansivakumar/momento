import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import { AuthProvider } from "../contexts/authContext";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "../routes/PrivateRoute";
import Project from "./Project";
import ProjectsList from "./ProjectsList";

function App() {
  const [projectRoutes, setProjectRoutes] = useState([]);

  return (
    <Router>
      <AuthProvider>
        <Toaster></Toaster>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route
              path="/projects"
              element={<ProjectsList setProjectRoutes={setProjectRoutes} />}
            />
            <Route path="/projects/:id" element={<Project />} />
          </Route>

          {/* {projectRoutes.map((val) => (
            <Route path={`/projects/MERN%20Project`} element={<Project />} />
          ))} */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
