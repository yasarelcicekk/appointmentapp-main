import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctors:null
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    getDoctorsRedux(state, action) {
      state.doctors = action.payload.doctors;
    }
  },
});

export const { getDoctorsRedux } = doctorSlice.actions;

export default doctorSlice.reducer;