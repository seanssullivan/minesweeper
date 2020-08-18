import { createSlice } from "@reduxjs/toolkit";

/**
 * Generate tile objects.
 * @param {number} numTiles - Number of tiles to generate.
 * @param {number} numBombs - Number of bombs to include.
 */
const generateTiles = (numTiles, numBombs) => {
  const tiles = [];
  for (let n = 0; n < numTiles; n++) {
    tiles.push({
      hasBomb: n < numBombs,
      clicked: false,
      flagged: false,
    });
  }
  return tiles;
};

/**
 * Create a game board with the provided dimensions.
 * @param {number} height - Number of tiles high.
 * @param {number} width - Number of tiles wide.
 * @param {number} bombs - Number of bombs hidden.
 */
const createBoard = (height, width, bombs) => {
  const tiles = generateTiles(height * width, bombs);

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
  initialState: [],
  reducers: {
    initialize: (state, action) => {
      const { height, width, bombs } = action.payload;
      const board = createBoard(height, width, bombs);
      return board;
    },
    setClicked: (state, action) => {
      const { x, y } = action.payload;
      state[y][x].clicked = true;
    },
    setFlagged: (state, action) => {
      const { x, y } = action.payload;
      state[y][x].flagged = true;
    },
  },
});

export const { initialize, setClicked, setFlagged } = boardSlice.actions;

export default boardSlice.reducer;
