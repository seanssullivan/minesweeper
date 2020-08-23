import _ from "lodash";
import board, { setRevealed, toggleFlagged, resetBoard } from "./boardSlice";

describe("boardSlice", () => {
  describe("createBoard", () => {
    it("should add tiles to state", () => {
      const result = board([], {
        type: resetBoard.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result.reduce((tiles, row) => [...tiles, ...row], []).length
      ).toEqual(256);
    });

    it("should add bombs to some tiles", () => {
      const result = board([], {
        type: resetBoard.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result
          .reduce((tiles, row) => [...tiles, ...row], [])
          .filter((tile) => tile.hasBomb === true).length
      ).toEqual(40);
    });

    it("should initially set clicked to false for all tiles", () => {
      const result = board([], {
        type: resetBoard.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result
          .reduce((tiles, row) => [...tiles, ...row], [])
          .filter((tile) => tile.isRevealed === true).length
      ).toEqual(0);
    });

    it("should set isFlagged to false for all tiles", () => {
      const result = board([], {
        type: resetBoard.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result
          .reduce((tiles, row) => [...tiles, ...row], [])
          .filter((tile) => tile.isFlagged === true).length
      ).toEqual(0);
    });

    it("should be the provided dimensions", () => {
      const result = board([], {
        type: resetBoard.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(result.length).toEqual(16);
      expect(result.every((row) => row.length === 16)).toBe(true);
    });
  });

  describe("setRevealed", () => {
    it("should set a tile to isRevealed", () => {
      const testBoard = [
        [
          {
            id: 0,
            hasBomb: false,
            isRevealed: false,
            isFlagged: false,
          },
          {
            id: 2,
            hasBomb: false,
            isRevealed: false,
            isFlagged: false,
          },
          {
            id: 1,
            hasBomb: false,
            isRevealed: false,
            isFlagged: false,
          },
        ],
      ];

      const result = board(testBoard, {
        type: setRevealed.type,
        payload: {
          id: 1,
        },
      });

      expect(
        result
          .reduce((tiles, row) => [...tiles, ...row], [])
          .find((tile) => tile.id === 1).isRevealed
      ).toEqual(true);
    });
  });

  describe("setFlagged", () => {
    it("should set a tile to flagged", () => {
      const testBoard = [
        [
          {
            id: 0,
            hasBomb: false,
            isRevealed: false,
            isFlagged: false,
          },
          {
            id: 2,
            hasBomb: false,
            isRevealed: false,
            isFlagged: false,
          },
          {
            id: 1,
            hasBomb: false,
            isRevealed: false,
            isFlagged: false,
          },
        ],
      ];

      const result = board(testBoard, {
        type: toggleFlagged.type,
        payload: {
          id: 1,
          isFlagged: true,
        },
      });

      expect(
        result
          .reduce((tiles, row) => [...tiles, ...row], [])
          .find((tile) => tile.id === 1).isFlagged
      ).toEqual(true);
    });
  });
});
