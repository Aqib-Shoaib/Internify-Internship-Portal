import { BACKEND_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function manageError(error) {
  return (
    error?.response?.data?.message || error?.message || "Something went wrong"
  );
}

const fetchUser = createAsyncThunk("users/fetchStatus", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/me`);
    // console.log(res);
    return res.data;
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

export { fetchUser, loginUser, registerUser, verifyOtp };
