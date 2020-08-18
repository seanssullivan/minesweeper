import { createSlice } from "@reduxjs/toolkit";

/**
 * Generate tile objects.
 * @param {number} amount - Number of tiles to generate.
 * @param {number} bombs - Number of bombs to include.
 */
const generateTiles = (amount, bombs) => {
  const tiles = [];
  for (let n = 0; n < amount; n++) {
    tiles.push({
      hasBomb: n < bombs,
      clicked: false,
      flagged: false,
    });
  }
  return tiles;
};

/**
 * Create the slice reducer.
 */
const tilesSlice = createSlice({
  name: "tiles",
  initialState: [],
  reducers: {
    createTiles: (state, action) => {
      const { amount, bombs } = action.payload;
      return generateTiles(amount, bombs);
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

export const { createTiles, setClicked, setFlagged } = tilesSlice.actions;

export default tilesSlice.reducer;
