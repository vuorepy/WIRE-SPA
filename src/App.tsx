import React, { useEffect } from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ProjectLibrary from "views/ProjectLibrary";
import Project from "views/Project";
import Login from "views/Login";
import ProtectedRoute from "components/Common/ProtectedRoute";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute element={< Layout />} />} >
          <Route path="/project/:id" element={<Project />} />
          <Route path="/" element={<ProjectLibrary />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
};

export default App;
