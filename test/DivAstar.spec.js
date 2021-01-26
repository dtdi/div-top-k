import { test } from "mocha";
import { div_astar } from "../lib/div_astar";
import { Graph } from "../lib/tool/Graph";
var expect = require("chai").expect;

describe("DivAStar", function () {
  describe(" initialization", function () {
    it(" initialize", function () {
      const testVertice = [];
      testVertice.push([0, 10]);
      testVertice.push([1, 8]);
      testVertice.push([2, 7]);
      testVertice.push([3, 7]);
      testVertice.push([4, 6]);
      testVertice.push([5, 1]);
      const eTable = [
        [2, 3, 4],
        [2, 3, 4],
        [0, 1, 5],
        [0, 1, 5],
        [0, 1, 5],
        [2, 3, 4],
      ];
      const g = new Graph(testVertice, eTable);
      console.log(div_astar(g, 5).toString());

      const testVertice2 = [];
      testVertice2.push([0, 10]);
      testVertice2.push([1, 9]);
      testVertice2.push([2, 8]);
      testVertice2.push([3, 7]);
      testVertice2.push([4, 6]);
      const eTable2 = [
        [1, 3, 4],
        [0, 2],
        [1, 3, 4],
        [0, 2],
        [0, 2],
      ];
      const g2 = new Graph(testVertice2, eTable2);
      console.log(div_astar(g2, 5).toString());
      //print div_astar(g2.compress(), 3)

      const anotherList = [];
      anotherList.push([0, 10]);
      anotherList.push([1, 8]);
      anotherList.push([2, 7]);
      anotherList.push([3, 7]);
      anotherList.push([4, 6]);
      anotherList.push([5, 1]);
      anotherList.push([6, 12]);
      anotherList.push([7, 13]);
      anotherList.push([8, 1]);
      anotherList.push([9, 1]);
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

      const g3 = new Graph(anotherList, anotherTable);
      console.log(g3.toString());
      console.log(div_astar(g3, 4).toString());
    });
  });
});
