import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

/**
 * Generate tile objects.
 * @param {number} amount - Number of tiles to generate.
 * @param {number} bombs - Number of bombs to include.
 */
const generateTiles = (amount, bombs) => {
  const tiles = [];
  for (let num = 0; num < amount; num++) {
    tiles.push({
      id: num,
      hasBomb: num < bombs,
      clicked: false,
      flagged: false,
    });
  }
  return _.shuffle(tiles);
};

/**
 * Layout the board using the provided tiles and dimensions.
 * @param {number} tiles - Tiles to be placed.
 * @param {number} width - Number of tiles wide.
 */
const layoutBoard = (tiles, width) => {
  const tileRows = _.chunk(tiles, width);
  const boardRows = tileRows.map((row, idx) => ({ id: idx, tiles: row }));
  return {
    rows: boardRows,
  };
};

/**
 * Create a new board of the provided dimensions.
 * @param {*} height - Number of tiles high.
 * @param {*} width - Number of tiles wide.
 * @param {*} bombs - Number of bombs to include.
 */
const createBoard = (height, width, bombs) => {
  const tiles = generateTiles(height * width, bombs);
  const board = layoutBoard(tiles, width);
  return Object.assign({}, board, { height, width });
};

/**
 * Create the slice reducer.
 */
const boardSlice = createSlice({
  name: "board",
  initialState: createBoard(16, 16, 40),
  reducers: {
    newBoard: (state, action) => {
      const { height, width, bombs } = action.payload;
      const newBoard = createBoard(height, width, bombs);
      return Object.assign({}, state, newBoard);
    },
    setClicked: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        rows: state.rows.map((row) => ({
          ...row,
          tiles: row.tiles.map((tile) =>
            tile.id === id ? { ...tile, clicked: true } : tile
          ),
        })),
      };
    },
    toggleFlagged: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        rows: state.rows.map((row) => ({
          ...row,
          tiles: row.tiles.map((tile) => {
            return tile.id === id ? { ...tile, flagged: !tile.flagged } : tile;
          }),
        })),
      };
    },
  },
});

export const { newBoard, setClicked, toggleFlagged } = boardSlice.actions;

export default boardSlice.reducer;
