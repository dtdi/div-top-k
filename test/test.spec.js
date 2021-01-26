import { DivRstSet } from "../lib";
var expect = require("chai").expect;

describe("DivRstSet", function () {
  describe("DivRstSet initialization", function () {
    it("Should do a top k assertion", function () {
      let testDict = {
        1: [[1, 3]],
        2: [
          [1, 3],
          [4, 4],
        ],
        3: [
          [1, 3],
          [4, 4],
          [5, 1],
        ],
      };
      let test = new DivRstSet(testDict);

      expect(test.getScr(1)).to.equal(3);
      expect(test.getScr(2)).to.equal(7);
      expect(test.getScr(3)).to.equal(8);
      expect(test.hasK(5)).to.be.false;

      expect(test.maxScr(1, 3)).to.equal(8);
      expect(test.maxScrAll()).to.equal(8);

      expect(test.upbound(10, 1)).to.equal(15);
    });
  });

  describe("new operator", function () {
    it("should initialize", function () {
      let testDict = {
        1: [[1, 3]],
        2: [
          [1, 3],
          [4, 4],
        ],
        3: [
          [1, 3],
          [4, 4],
          [5, 1],
        ],
      };
      const test = DivRstSet.new(testDict);
      test.setSet([
        [2, 42],
        [1, 3],
        [4, 4],
        [5, 1],
      ]);
      test.rm(4);
      expect(test.hasK(5)).to.be.false;

      expect(test.getScr(1)).to.equal(3);
      expect(test.getScr(2)).to.equal(7);
      expect(test.getScr(3)).to.equal(8);

      expect(test.maxScr(1, 3)).to.equal(8);
      expect(test.maxScrAll()).to.equal(8);
      expect(test.upbound(10, 1)).to.equal(15);
      test.setSet([[3, 2]]);
      const testTuples1 = [
        [1, 3],
        [2, 4],
        [3, 53],
      ];
      const test1 = DivRstSet.new(testDict, testTuples1);
      expect(test1.getScr(3)).to.equal(60);
      expect(test1.getKList()).to.deep.equal([1, 2, 3]);
    });
  });

  describe("union", function () {
    it("should union", function () {
      let testDict = {
        1: [[1, 3]],
        2: [
          [1, 3],
          [4, 4],
        ],
        3: [
          [1, 3],
          [4, 4],
          [5, 1],
        ],
      };
      const testTuples = [
        [1, 3],
        [2, 4],
        [3, 53],
      ];
      const t1 = DivRstSet.new(testDict);
      const t2 = DivRstSet.new(testTuples);
      t1.union(t2, 3);
    });
  });

  describe("compete", function () {
    it("should compete", function () {
      let d1 = {
        1: [[1, 10]],
        2: [
          [1, 10],
          [2, 8],
        ],
        3: [
          [3, 7],
          [4, 7],
          [5, 6],
        ],
      };

      let d2 = {
        1: [[11, 10]],
        2: [
          [11, 10],
          [13, 8],
        ],
        3: [
          [12, 9],
          [14, 7],
          [15, 6],
        ],
      };

      const s1 = DivRstSet.new(d1);
      const s2 = DivRstSet.new(d2);
      const compete = s1.compete(s2, 5);
      //expect(compete).to.deep.equal([1, 2, 3]);

      const c2 = DivRstSet.new().compete(s2, 5);
      expect(c2.get(3)).to.deep.equal([
        [12, 9],
        [14, 7],
        [15, 6],
      ]);
    });
  });
});
