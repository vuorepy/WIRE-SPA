import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Thread from "./views/Thread";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/thread/:id" element={<Thread />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
