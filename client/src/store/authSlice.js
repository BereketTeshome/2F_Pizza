// store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: null,
  email: null,
  isAdmin: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      const token = action.payload;
      state.token = token;

      // Decode the token to extract user information
      const decodedToken = token ? jwtDecode(token) : null;
      state.email = decodedToken?.email || null;
      state.isAdmin = decodedToken?.isadmin || false;
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.email = null;
      state.isAdmin = null;
    },
  },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;

export default authSlice.reducer;
