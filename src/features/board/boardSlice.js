import { createSlice } from "@reduxjs/toolkit";

/**
 * Create a game board with the provided dimensions.
 * @param {array} tiles - Tiles to place on board.
 * @param {number} height - Number of tiles high.
 * @param {number} width - Number of tiles wide.
 */
const createBoard = (tiles, height, width) => {
  // To ensure that bombs are randomly placed, fill all rows with randomly selected tiles.
  const board = [];
  for (let row = 0; row < height; row++) {
    const rowTiles = [];
    for (let col = 0; col < width; col++) {
      const index = Math.floor(Math.random() * tiles.length);
      rowTiles.push(tiles.splice(index, 1)[0]);
    }
    board.push(rowTiles);
  }
  return board;
};

/**
 * Create the slice reducer.
 */
const boardSlice = createSlice({
  name: "board",
  initialState: createBoard(16, 16, 40),
  reducers: {
    restart: (state, action) => {
      const { height, width, bombs } = action.payload;
      return createBoard(height, width, bombs);
    },
  },
});

export const { restart } = boardSlice.actions;

export default boardSlice.reducer;
