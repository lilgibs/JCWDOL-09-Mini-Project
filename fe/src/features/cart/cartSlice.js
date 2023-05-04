import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action) => {
      state.items = action.payload;
    },
    addOrUpdateItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id_product === action.payload.id_product
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        item => item.id_product !== action.payload
      )
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

const { setCarts, addOrUpdateItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export function fetchCart() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      if (!token) {
        console.log("User not logged in");
        return;
      }

      let response = await axios.get("http://localhost:5500/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Data from server: ", response.data.data);
      dispatch(setCarts(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addToCart(data) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      if (!token) {
        console.log("User not logged in. Cannot add item to cart!");
        return;
      }

      let response = await axios.post("http://localhost:5500/carts", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      dispatch(addOrUpdateItem(response.data.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
}

export function removeFromCart(productId) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      let response = await axios.delete(`http://localhost:5500/carts/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      dispatch(removeItem(productId));
    } catch (error) {
      console.log(error)
    }
  }
}

export function checkout(orderData) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("user_token");

      let response = await axios.post(`http://localhost:5500/checkout`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response);
      dispatch(clearCart());
    } catch (error) {
      console.log(error)
    }
  }
}
