import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "./features/user/userSlice";
import { Navbar } from "./components/";

function App() {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(checkLogin(userToken))
  }, [])

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
