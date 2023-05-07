import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      username: "",
      email: "",
      phone: "",
      name: "",
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        username: "",
        email: "",
        phone: "",
        name: "",
      }
    }
  }
})

const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer

export function loginUser(values) {
  return (
    async (dispatch) => {
      try {
        console.log(values)
        const response = await axios.post('http://localhost:5500/auth/login', values)
        console.log(response)
        dispatch(setUser(response.data.data))
        localStorage.setItem('user_token', response.data.token)
      } catch (error) {
        console.log(error)
      }
    }

  )
}

export function checkLogin(token) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/auth/check-login",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch(setUser(response.data.data));
      return true;
    } catch (error) {
      if (error.response && error.response.data.message === "Access Denied: Token expired") {
        console.log(error.response.data.message);
      } else {
        console.log(error.response.data.message);
      }
      localStorage.removeItem("user_token");
      return false;
    }
  };
}

export function logoutUser(){
  return(dispatch) => {
    localStorage.removeItem('user_token')
    dispatch(resetUser())
  }
}
