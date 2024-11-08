/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";

import HomePage from "./Pages/HomePage";
import Login_Signup from "./Pages/Login_Signup";
import ToDo from "./components/ToDo";
import Header from "./components/Header";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
    });

    function onAnimationFrame(time) {
      lenis.raf(time);
      requestAnimationFrame(onAnimationFrame);
    }

    requestAnimationFrame(onAnimationFrame);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const ProtectedRoute = ({ element }) =>
    token ? element : <Navigate to="/login" replace />;

  const AuthRoute = ({ element }) =>
    token ? <Navigate to="/todo" replace /> : element;

  return (
    <div>
      <div>
        <BrowserRouter>
          <Header setToken={setToken} />{" "}
          {/* Pass setToken to Header for logout functionality */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<AuthRoute element={<Login_Signup />} />}
            />
            <Route
              path="/todo"
              element={<ProtectedRoute element={<ToDo />} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
