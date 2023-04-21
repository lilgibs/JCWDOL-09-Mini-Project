import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./features/user/userSlice";
import { Navbar } from "./components/";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Products from "./pages/Products";

function App() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(checkLogin(userToken))
  }, [])

  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
