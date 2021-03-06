import { test } from "mocha";
import { Graph } from "../lib";
var expect = require("chai").expect;

describe("Graph", function () {
  describe("Graph initialization", function () {
    it("Should initialize", function () {
      const testVertice = [];
      for (let i = 0; i < 8; i++) {
        testVertice.push([i, Math.floor(Math.random() * 100)]);
      }

      const eTable = [
        [1, 5, 6],
        [0, 2, 5],
        [1, 3, 4],
        [2, 4],
        [2, 3, 5],
        [0, 1, 4, 6, 7],
        [0, 5],
        [5],
      ];
      const g = new Graph(testVertice, eTable);

      expect(g.split().length).to.equal(1);

      const subG = g.subG([0, 1, 5]);
      //expect(subG.getNeiByV(5)).to.eql(new Set([0, 1]));

      //expect(g.getCutVids()).to.eql(new Set([5]));
    });
    it("Should compress", function () {
      let anotherList = [];
      anotherList.push([0, 10]);
      anotherList.push([1, 8]);
      anotherList.push([2, 7]);
      anotherList.push([3, 7]);
      anotherList.push([4, 6]);
      anotherList.push([5, 1]);
      anotherList.push([6, 12]);
      anotherList.push([7, 13]);
      anotherList.push([8, 13]);
      anotherList.push([9, 13]);
      anotherList.push([10, 1]);
      anotherList.push([11, 1]);
      anotherList.push([12, 10]);
      anotherList.push([13, 9]);
      anotherList.push([14, 8]);
      anotherList.push([15, 7]);
      anotherList.push([16, 6]);

      const anotherTable = [
        [2, 3, 4],
        [2, 3, 4, 6, 7],
        [0, 1, 5],
        [0, 1, 5, 6, 7, 9],
        [0, 1, 5],
        [2, 3, 4, 9],
        [1, 3, 7, 11, 13, 14],
        [1, 3, 6, 13, 14],
        [9],
        [3, 5, 8],
        [11, 12, 13],
        [6, 10],
        [10, 13, 15, 16],
        [6, 7, 10, 12, 14],
        [6, 7, 13, 15, 16],
        [12, 14],
        [12, 14],
      ];

      const g = new Graph(anotherList, anotherTable);
      console.log(g.split());
      console.log(g.compress().getCutVids());
    });
  });
});
