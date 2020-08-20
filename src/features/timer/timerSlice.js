import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    startTime: 0,
    isActive: false,
  },
  reducers: {
    startTimer: (state) => {
      state.startTime = Math.round(Date.now() / 1000);
      state.isActive = true;
    },
  },
});

export const { startTimer } = timerSlice.actions;

export const selectStartTime = (state) => {
  return state.timer.isActive
    ? state.timer.startTime
    : Math.round(Date.now() / 1000);
};

export default timerSlice.reducer;
