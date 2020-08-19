import _ from "lodash";
import board, { newBoard, setClicked, toggleFlagged } from "./boardSlice";

describe("boardSlice", () => {
  describe("newBoard", () => {
    it("should add tiles to state", () => {
      const result = board(
        {},
        {
          type: newBoard.type,
          payload: {
            height: 16,
            width: 16,
            bombs: 40,
          },
        }
      );

      expect(
        result.rows.reduce((tiles, row) => [...tiles, ...row.tiles], []).length
      ).toEqual(256);
    });

    it("should add bombs to some tiles", () => {
      const result = board(
        {},
        {
          type: newBoard.type,
          payload: {
            height: 16,
            width: 16,
            bombs: 40,
          },
        }
      );

      expect(
        result.rows
          .reduce((tiles, row) => [...tiles, ...row.tiles], [])
          .filter((tile) => tile.hasBomb === true).length
      ).toEqual(40);
    });

    it("should initially set clicked to false for all tiles", () => {
      const result = board(
        {},
        {
          type: newBoard.type,
          payload: {
            height: 16,
            width: 16,
            bombs: 40,
          },
        }
      );

      expect(
        result.rows
          .reduce((tiles, row) => [...tiles, ...row.tiles], [])
          .filter((tile) => tile.clicked === true).length
      ).toEqual(0);
    });

    it("should set flagged to false for all tiles", () => {
      const result = board(
        {},
        {
          type: newBoard.type,
          payload: {
            height: 16,
            width: 16,
            bombs: 40,
          },
        }
      );

      expect(
        result.rows
          .reduce((tiles, row) => [...tiles, ...row.tiles], [])
          .filter((tile) => tile.flagged === true).length
      ).toEqual(0);
    });

    it("should be the provided dimensions", () => {
      const result = board(
        {},
        {
          type: newBoard.type,
          payload: {
            height: 16,
            width: 16,
            bombs: 40,
          },
        }
      );

      expect(result.rows.length).toEqual(16);
      expect(result.rows.every((row) => row.tiles.length === 16)).toBe(true);
    });
  });

  describe("setClicked", () => {
    it("should set a tile to clicked", () => {
      const testBoard = {
        rows: [
          {
            id: 0,
            tiles: [
              {
                id: 0,
                hasBomb: false,
                clicked: false,
                flagged: false,
              },
              {
                id: 2,
                hasBomb: false,
                clicked: false,
                flagged: false,
              },
              {
                id: 1,
                hasBomb: false,
                clicked: false,
                flagged: false,
              },
            ],
          },
        ],
      };

      const result = board(testBoard, {
        type: setClicked.type,
        payload: {
          id: 1,
        },
      });

      expect(
        result.rows
          .reduce((tiles, row) => [...tiles, ...row.tiles], [])
          .find((tile) => tile.id === 1).clicked
      ).toEqual(true);
    });
  });

  describe("toggleFlagged", () => {
    it("should set a tile to flagged", () => {
      const testBoard = {
        rows: [
          {
            id: 0,
            tiles: [
              {
                id: 0,
                hasBomb: false,
                clicked: false,
                flagged: false,
              },
              {
                id: 2,
                hasBomb: false,
                clicked: false,
                flagged: false,
              },
              {
                id: 1,
                hasBomb: false,
                clicked: false,
                flagged: false,
              },
            ],
          },
        ],
      };

      const result = board(testBoard, {
        type: toggleFlagged.type,
        payload: {
          id: 1,
        },
      });

      expect(
        result.rows
          .reduce((tiles, row) => [...tiles, ...row.tiles], [])
          .find((tile) => tile.id === 1).flagged
      ).toEqual(true);
    });
  });
});
