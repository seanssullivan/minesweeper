import { createSlice } from "@reduxjs/toolkit";

/**
 * Generate tile objects.
 * @param {number} tiles - Number of tiles to generate.
 * @param {number} bombs - Number of bombs to include.
 */
const generateTiles = (tiles, bombs) => {
  return Array(tiles).map((num) => {
    return {
      hasBomb: num < bombs,
      clicked: false,
      flagged: false,
    };
  });
};

/**
 * Create a game board with the provided dimensions.
 * @param {number} width - Number of tiles wide.
 * @param {number} height - Number of tiles high.
 * @param {number} bombs - Number of bombs hidden.
 */
const createBoard = (width, height, bombs) => {
  const tiles = generateTiles(width * height, bombs);

  // To ensure that bombs are randomly placed, fill all rows with randomly selected tiles.
  return Array(height).map(() => {
    return Array(width).map(() => {
      const index = Math.floor(Math.random() * tiles.length);
      return tiles.splice(index, 1)[0];
    });
  });
};

const boardSlice = createSlice({
  name: "board",
  initialState: [],
  reducers: {
    initialize: (state, action) => {
      const { height, width, bombs } = action.payload;
      state = createBoard(height, width, bombs);
    },
  },
});

export const { initialize } = boardSlice.actions;

export default boardSlice.reducer;
