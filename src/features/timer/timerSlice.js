import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    startTime: 0,
    isActive: false,
  },
  reducers: {
    startTimer: (state) => {
      state.isActive = true;
      state.startTime = Date.now();
    },
  },
});

export const { startTimer, increment } = timerSlice.actions;

export const selectStartTime = (state) => {
  const minutes = Math.floor(state.timer.seconds / 60);
  const seconds = state.timer.seconds % minutes || 0;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default timerSlice.reducer;
