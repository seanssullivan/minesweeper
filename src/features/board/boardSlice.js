import { createSlice } from "@reduxjs/toolkit";

const createTile = () => {
  return {
    clicked: false,
    flagged: false,
    mined: false,
  };
};

const createRow = (width) => {
  const row = [];
  for (let col = 0; col < width; col++) {
    const tile = createTile();
    row.push(tile);
  }
};

const createBoard = (width, height) => {
  const board = [];
  for (let row = 0; row < height; row++) {
    const row = createRow(width);
    board.push(row);
  }
  return board;
};

export const boardSlice = createSlice({
  name: "board",
  initialState: createBoard(16, 16),
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});
