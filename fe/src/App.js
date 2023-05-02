import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./features/user/userSlice";
import { Navbar } from "./components";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { fetchCart } from "./features/cart/cartSlice";
import Checkout from "./pages/Checkout";

function App() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector(state => state.user.user)
  const location = useLocation();

  useEffect(() => {
    dispatch(checkLogin(userToken))
    dispatch(fetchCart());
  }, [])

  return (
    <div>
      {location.pathname !== "/dashboard" && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
