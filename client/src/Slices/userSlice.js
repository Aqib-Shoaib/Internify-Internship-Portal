import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.status = "succeeded";
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchUser.rejected, (state, action) => {
  //       state.status = "failed";
  //       state.error = action.error.message;
  //     });
  // },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
