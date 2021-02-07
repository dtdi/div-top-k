import { test } from "mocha";
import { div_cut, Graph, div_dp } from "../lib";
var expect = require("chai").expect;

describe("Div Cut", function () {
  describe("Div Cut", function () {
    it("Perform", function () {
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

      anotherList = [];
      anotherList.push([0, 16]);
      anotherList.push([1, 15]);
      anotherList.push([2, 14]);
      anotherList.push([3, 13]);
      anotherList.push([4, 12]);
      anotherList.push([5, 11]);
      anotherList.push([6, 10]);
      anotherList.push([7, 9]);
      anotherList.push([8, 8]);
      anotherList.push([9, 7]);
      anotherList.push([10, 6]);
      anotherList.push([11, 5]);
      anotherList.push([12, 4]);
      anotherList.push([13, 3]);
      anotherList.push([14, 2]);
      anotherList.push([15, 1]);
      anotherList.push([16, 0]);

      let anotherTable = [
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

      let anotherTable2 = [
        [1, 2],
        [0],
        [0],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
      ];

      const g = new Graph(anotherList, anotherTable);
      console.log(div_dp(g, 4).toString());
    });
  });
});
