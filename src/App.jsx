/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import HomePage from "./Pages/HomePage";
import Login_Signup from "./Pages/Login_Signup";
import ToDo from "./components/ToDo";
import Header from "./components/Header";
import axios from "axios";

export default function App() {
 const token = localStorage.getItem("token");
 const uid = localStorage.getItem("uid");
 

  return (
    <div>
      <div>
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={token ? <HomePage></HomePage> : <Navigate to="/auth" />} />
            <Route path="/auth" element={<Login_Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
