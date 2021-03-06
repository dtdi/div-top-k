import { test } from "mocha";
import { div_astar, Graph } from "../lib";
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
        [],
        [3, 5],
        [11, 12, 13],
        [6, 10],
        [10, 13, 15, 16],
        [6, 7, 10, 12, 14],
        [6, 7, 13, 15, 16],
        [12, 14],
        [12, 14],
      ];

      //const g3 = new Graph(anotherList, anotherTable);
      //console.log(g3.toString());
      //console.log(div_astar(g3, 4).toString());

      let anotherList2 = [];
      anotherList2.push([0, 16.5676467546534]);
      anotherList2.push([1, 15]);
      anotherList2.push([2, 14]);
      anotherList2.push([3, 13]);
      anotherList2.push([4, 12]);
      anotherList2.push([5, 11]);
      anotherList2.push([6, 10]);
      anotherList2.push([7, 9]);
      anotherList2.push([8, 8]);
      anotherList2.push([9, 7]);
      anotherList2.push([10, 6]);
      anotherList2.push([11, 5]);
      anotherList2.push([12, 4]);
      anotherList2.push([13, 3]);
      anotherList2.push([14, 2]);
      anotherList2.push([15, 1]);
      anotherList2.push([16, 0]);
      anotherList2 = anotherList2.sort((a, b) => b[1] - a[1]);
      const anotherTable2 = [
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
        [],
        [],
        [],
      ];

      const g3 = new Graph(anotherList2, anotherTable2);
      console.log(g3.toString());
      console.log(div_astar(g3, 7).toString());
    });
  });
});
