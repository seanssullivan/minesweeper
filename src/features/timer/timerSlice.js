import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    startTime: null,
    stopTime: null,
    isActive: false,
  },
  reducers: {
    startTimer: (state) => {
      state.startTime = Math.round(Date.now() / 1000);
      state.isActive = true;
    },
    stopTimer: (state) => {
      state.stopTime = Math.round(Date.now() / 1000);
      state.isActive = false;
    },
    resetTimer: (state) => {
      state.startTime = null;
      state.stopTime = null;
      state.isActive = false;
    },
  },
});

export const { startTimer, stopTimer, resetTimer } = timerSlice.actions;

export const selectStartTime = (state) => {
  return state.timer.isActive
    ? state.timer.startTime
    : Math.round(Date.now() / 1000);
};

export default timerSlice.reducer;
