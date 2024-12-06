import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Redirectlogin from "../components/Redirectlogin";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registersuccess" element={<Redirectlogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
