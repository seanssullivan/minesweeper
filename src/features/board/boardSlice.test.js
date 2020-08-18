import board, { setClicked, setFlagged, restart } from "../tiles/tilesSlice";

describe("boardSlice", () => {
  describe("initialize", () => {
    it("should add tiles to state", () => {
      const result = board([], {
        type: restart.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result.reduce((acc, cur) => {
          return acc + cur.length;
        }, 0)
      ).toEqual(256);
    });

    it("should add bombs to some tiles", () => {
      const result = board([], {
        type: restart.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result
          .reduce((acc, cur) => acc.concat(cur))
          .filter((tile) => tile.hasBomb === true).length
      ).toEqual(40);
    });

    it("should set clicked to false for all tiles", () => {
      const result = board([], {
        type: restart.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result
          .reduce((acc, cur) => acc.concat(cur))
          .filter((tile) => tile.clicked === true).length
      ).toEqual(0);
    });

    it("should set flagged to false for all tiles", () => {
      const result = board([], {
        type: restart.type,
        payload: {
          height: 16,
          width: 16,
          bombs: 40,
        },
      });

      expect(
        result
          .reduce((acc, cur) => acc.concat(cur))
          .filter((tile) => tile.flagged === true).length
      ).toEqual(0);
    });
  });

  describe("setClicked", () => {
    it("should set a tile to clicked", () => {
      const testBoard = [
        [
          {
            hasBomb: false,
            clicked: false,
            flagged: false,
          },
          {
            hasBomb: false,
            clicked: false,
            flagged: false,
          },
        ],
      ];

      const result = board(testBoard, {
        type: setClicked.type,
        payload: {
          x: 1,
          y: 0,
        },
      });

      expect(result[0][1].clicked).toEqual(true);
    });
  });

  describe("setFlagged", () => {
    it("should set a tile to flagged", () => {
      const testBoard = [
        [
          {
            hasBomb: false,
            clicked: false,
            flagged: false,
          },
          {
            hasBomb: false,
            clicked: false,
            flagged: false,
          },
        ],
      ];

      const result = board(testBoard, {
        type: setFlagged.type,
        payload: {
          x: 1,
          y: 0,
        },
      });

      expect(result[0][1].flagged).toEqual(true);
    });
  });
});
