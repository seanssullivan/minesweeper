import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 40,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    resetCounter: (state) => {
      state.value = 40;
    },
  },
});

export const { increment, decrement, resetCounter } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
