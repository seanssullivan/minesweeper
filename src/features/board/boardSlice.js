import { createSlice, createSelector } from "@reduxjs/toolkit";
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
      isRevealed: false,
      isFlagged: false,
    });
  }
  return _.shuffle(tiles);
};

/**
 * Create a new board of the provided dimensions.
 * @param {number} height - Number of tiles high.
 * @param {number} width - Number of tiles wide.
 * @param {number} bombs - Number of bombs to include.
 */
const createBoard = (height, width, bombs) => {
  const tiles = generateTiles(height * width, bombs);
  return _.chunk(tiles, width);
};

/**
 *
 * @param {number} height - Number of tiles high.
 * @param {number} width - Number of tiles wide.
 * @param {number} bombs - Number of bombs to include.
 */
const startGame = (height, width, bombs) => {
  const board = createBoard(height, width, bombs);
  board.map((row, y) =>
    row.map((tile, x) => (tile.nearbyBombs = countNearbyBombs(board, [x, y])))
  );
  return board;
};

/**
 * Return the row and column position of a target tile.
 * @param {array} state - Two-dimensional array of objects.
 * @param {number} id - Id of target tile.
 */
const tileCoordsSelector = (state, id) => {
  const y = _.findIndex(state, (row) => row.find((tile) => tile.id === id));
  const x = _.findIndex(state[y], (tile) => tile.id === id);
  return [x, y];
};

/**
 * Return the number of bombs in adjacent tiles.
 * @param {array} state - Two-dimensional array of objects.
 * @param {array} coords - Starting X and Y coordinates.
 */
const countNearbyBombs = (state, [x, y]) => {
  const adjacentTiles = [];
  if (y > 0 && y < state.length - 1) {
    adjacentTiles.push(state[y - 1][x]);
    adjacentTiles.push(state[y + 1][x]);
  }
  if (x > 0 && x < state[0].length - 1) {
    adjacentTiles.push(state[y][x - 1]);
    adjacentTiles.push(state[y][x + 1]);
  }
  if (y > 0 && x > 0) {
    adjacentTiles.push(state[y - 1][x - 1]);
  }
  if (y < state.length - 1 && x < state[0].length - 1) {
    adjacentTiles.push(state[y + 1][x + 1]);
  }
  if (y > 0 && x < state[0].length - 1) {
    adjacentTiles.push(state[y - 1][x + 1]);
  }
  if (x > 0 && y < state.length - 1) {
    adjacentTiles.push(state[y + 1][x - 1]);
  }
  return adjacentTiles.reduce((sum, tile) => (tile.hasBomb ? sum + 1 : sum), 0);
};

/**
 * Set tile to isRevealed.
 * @param {array} state - Two-dimensional array of objects.
 * @param {object} tile - Target tile.
 */
const revealTile = (state, tile) => {
  return state.map((row) => [
    ...row.map((t) =>
      t.id === tile.id && !tile.isFlagged ? { ...t, isRevealed: true } : t
    ),
  ]);
};

/**
 * Set a tile to isRevealed, as well as adjacent tiles.
 * @param {array} state - Two-dimensional array of objects.
 * @param {array} coords - Coordinates of target tile.
 */
const cascadeReveal = (state, [x, y]) => {
  if (x < 0 || x >= state.length || y < 0 || y >= state[0].length) {
    return state;
  }
  const tile = state[y][x];
  if (tile.isRevealed) {
    return state;
  }

  state = revealTile(state, tile);
  if (tile.nearbyBombs === 0) {
    // TODO: Convert into an array of tiles.
    state = cascadeReveal(state, [x - 1, y]);
    state = cascadeReveal(state, [x + 1, y]);
    state = cascadeReveal(state, [x, y - 1]);
    state = cascadeReveal(state, [x, y + 1]);
    state = cascadeReveal(state, [x - 1, y - 1]);
    state = cascadeReveal(state, [x + 1, y + 1]);
    state = cascadeReveal(state, [x - 1, y + 1]);
    state = cascadeReveal(state, [x + 1, y - 1]);
  }

  return state;
};

/**
 * Create the slice reducer.
 */
const boardSlice = createSlice({
  name: "board",
  initialState: startGame(16, 16, 40),
  reducers: {
    // Set the state of a tile to clicked
    setRevealed: (state, action) => {
      const { id } = action.payload;
      const [x, y] = tileCoordsSelector(state, id);
      return cascadeReveal(state, [x, y]);
    },
    // Toggle the state of a tile between flagged and not flagged
    setFlagged: (state, action) => {
      const { id, isFlagged } = action.payload;
      return state.map((row) => [
        ...row.map((tile) =>
          tile.id === id && !tile.isRevealed ? { ...tile, isFlagged } : tile
        ),
      ]);
    },
    // Reveal all bombs on grid.
    showBombs: (state) => {
      return state.map((row) => [
        ...row.map((tile) =>
          tile.hasBomb ? { ...tile, isRevealed: true } : tile
        ),
      ]);
    },
    // Reset the game board
    resetBoard: (state, action) => {
      const { height, width, bombs } = action.payload;
      return startGame(height, width, bombs);
    },
  },
});

const allTilesSelector = (state) => _.flatten(state.board);

const allBombsSelector = createSelector(allTilesSelector, (tiles) =>
  tiles.filter((tile) => tile.hasBomb)
);

const allSafeTilesSelector = createSelector(allTilesSelector, (tiles) =>
  tiles.filter((tile) => !tile.hasBomb)
);

export const hasWonSelector = createSelector(
  allBombsSelector,
  allSafeTilesSelector,
  (allBombs, allSafeTiles) =>
    allBombs.every((bomb) => bomb.isFlagged) ||
    allSafeTiles.every((tile) => tile.isRevealed)
);

export const hasLostSelector = createSelector(allBombsSelector, (allBombs) =>
  allBombs.some((bomb) => bomb.isRevealed)
);

export const {
  setRevealed,
  setFlagged,
  showBombs,
  resetBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
