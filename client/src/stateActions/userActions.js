import { BACKEND_URL, manageError } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authToken = localStorage.getItem("authToken");

const fetchUser = createAsyncThunk("users/fetchStatus", async (_, thunkAPI) => {
  const url = `${BACKEND_URL}/api/users/me`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return res.data.data;
  } catch (err) {
    const message = manageError(err);
    return thunkAPI.rejectWithValue(message);
  }
});

const loginUser = createAsyncThunk(
  "users/login",
  async (credentails, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        credentails
      );

      localStorage.setItem("authToken", res.data.token);
      return res.data.data.user;
    } catch (err) {
      const message = manageError(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const registerUser = createAsyncThunk(
  "users/register",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/users/register`, data);
      return res.data.userEmail;
    } catch (err) {
      const message = manageError(err);
      console.log(err);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const verifyOtp = createAsyncThunk("users/otp", async (data, thunkAPI) => {
  try {
    const res = await axios.patch(`${BACKEND_URL}/api/users/verifyOTP`, data);
    localStorage.setItem("authToken", res.data.token);
    return res.data.data.user;
  } catch (err) {
    const msg = manageError(err);
    return thunkAPI.rejectWithValue(msg);
  }
});

const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api/users/me`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return response.data.data;
    } catch (err) {
      const msg = manageError(err);
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export { fetchUser, loginUser, registerUser, verifyOtp, updateUserData };
